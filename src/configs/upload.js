import multer from 'multer'
import crypto from 'crypto'
import path from 'path'
import Path from '../utils/Path.js'

export const TMP_FOLDER = path.resolve(Path.dirname(import.meta.url), '..', '..', 'tmp')
export const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, '..', '..', 'uploads')

export const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename: (req, file, cb) => {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`
      return cb(null, fileName)
    }
  })
}