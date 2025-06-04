import { RequestHandler } from "express"

const UploadManager: { upload: RequestHandler | null } = {
  upload: null
}

export default UploadManager