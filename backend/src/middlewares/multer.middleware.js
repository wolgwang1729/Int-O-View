import multer from 'multer'
import path from 'path'
import { v4 as uuid} from 'uuid'
import fs from 'fs'

const uploadDir = path.join(process.cwd(), 'public', 'temp')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },

    filename: function (req, file, cb) {

        const extension = path.extname(file.originalname)
        const baseName = path.basename(file.originalname,extension)
        const suffix = uuid()

        cb(null, `${baseName}${suffix}${extension}`)
    }

  })
  
export const upload = multer({
    storage
})