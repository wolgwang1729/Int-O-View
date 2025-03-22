import { asyncHandler } from '../utils/asynchandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/Apiresponse.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { OtpVerification } from '../models/otpVerification.model.js';
import { nodemailerService } from '../utils/nodemailer.js';
import fs from 'fs';
import FormData from 'form-data';

const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(Math.random() * 9000 + 1000).toString();

  const user = await OtpVerification.findOne({ email });

  if (user) {
    throw new ApiError(400, 'user already exist');
  }

  const resFromDb = await OtpVerification.create({
    email,
    otp,
  });

  if (!resFromDb) {
    throw new ApiError(500, 'could not set set otp');
  }

  const options = {
    from: `Int-O-View <${process.env.MAIL}>`,
    to: email,
    subject: 'Email Verification',
    html: `
            <html>
                <body>
                    <h1>Email Verification</h1>
                    <p>Thank you for using our Int-O-View. Here is your OTP .Please do not share it with anyone.</p>
                    <h3><b>${otp}</b></h3>
                    <p>If you did not request this, please disregard this email.</p>
                </body>
            </html>

        `,
  };

  await nodemailerService.sendMail(options);

  res.json(new ApiResponse(200, {}, 'otp sent successfully'));
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;

  const user = await OtpVerification.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'email not found');
  }
  if (user.isVerified) {
    throw new ApiError(400, 'User already verified');
  }

  if (otp !== user.otp) {
    throw new ApiError(400, 'wrong otp sent');
  }

  user.isVerified = true;
  user.save();

  res.json(new ApiResponse(200, {}, 'user verified successfully'));
});

const uploadResume = asyncHandler(async (req, res) => {
  const resumeLocalPath = req.file.path;
  if (!fs.existsSync(resumeLocalPath)) {
    throw new ApiError(400, 'resume not sent');
  }
  // Create a form data object
  const formData = new FormData();
  formData.append('resume', fs.createReadStream(resumeLocalPath)); // Ensure the key is 'resume'
  try {
    const response = await axios.post(
      `${process.env.FLASK_URL}/upload`,
      formData,
      {
        headers: {
          ...formData.getHeaders(), // Get headers from form data
        },
      }
    );
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.response.data.message);
  }

  fs.unlinkSync(resumeLocalPath);

  res.json(new ApiResponse(200, {}, 'file uploaded successfully'));
});

const createUser = asyncHandler(async (req, res) => {
  const { fullName, email, phone, post } = req.body;

  if ([fullName, email, phone, post].some((field) => field === undefined)) {
    throw new ApiError(400, 'All fields are required');
  }

  const searchUser = await User.findOne({
    $and: [
      {
        email,
      },
      {
        phone,
      },
    ],
  });

  //checks for multiple access at a time
  if (searchUser) {
    throw new ApiError(400, 'User already Exist !');
  }

  if (searchUser && searchUser.status !== 'pending') {
    throw new ApiError(400, 'User already Interviewed !');
  }

  const userVerifiedByOtp = await OtpVerification.findOne({ email });

  if (!userVerifiedByOtp?.isVerified) {
    throw new ApiError(400, 'user not verified by otp');
  }

  const photoLocalPath = req.files?.photo[0]?.path;
  const resumeLocalPath = req.files?.resume[0]?.path;

  if (!photoLocalPath && !resumeLocalPath) {
    throw new ApiError(400, 'Both user photo and resume required !');
  }

  const photo = await uploadOnCloudinary(photoLocalPath);
  const resume = await uploadOnCloudinary(resumeLocalPath);

  const user = await User.create({
    fullName,
    email,
    phone: Number(phone),
    post,
    photo: photo?.url ?? '',
    resume: resume?.url ?? '',
  });

  if (!user) {
    throw new ApiError(500, 'server side error on creating user !');
  }

  const sessionToken = jwt.sign(
    {
      _id: user._id,
      email: user._email,
    },
    process.env.SESSION_TOKEN_KEY,
    {
      expiresIn: '45m',
    }
  );

  user.sessionToken = sessionToken;
  user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 60 * 60 * 1000,
  };

  res
    .status(201)
    .cookie('sessionToken', sessionToken, options)
    .json(new ApiResponse(201, user, 'user created successfully'));
});

//handling request to and from flask
const callModel = asyncHandler(async (req, res) => {
  const { query } = req.body;

  const response = await axios.post(
    `${process.env.FLASK_URL}/predict`,
    { query },
    {
      withCredentials: true,
    }
  );

  res.json({
    message: response.data.message,
  });
});

const setUser = asyncHandler(async (req, res) => {
  const post = req.body.post;

  await axios.post(
    'http://localhost:5000/setUser',
    { post },
    {
      withCredentials: true,
    }
  );

  res.json(new ApiResponse(200, {}, 'post set successfully'));
});

const getDashboardData = asyncHandler(async (req, res) => {

  const response = await axios.get(
    `${process.env.FLASK_URL}/dashboardData`,
  );

  console.log(response.data);

  res.json({
    message: response.data
  });
});

export { callModel, createUser, sendOtp, verifyOtp, uploadResume, setUser, getDashboardData };
