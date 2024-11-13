import nodemailer from 'nodemailer'


export const nodemailerService = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.MAIL,
        pass : process.env.APP_PASS
    }
})