import multer from 'multer';
import UploadManager from './upload-helper';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `src/public`);
  },
  filename: (req, file, cb) => {
    cb(null, `data.xlsx`);
  },
});

export const configUpload = () => {
  UploadManager.upload = multer({ storage }).single('file');
};
