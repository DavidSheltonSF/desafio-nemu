import { Request, Response } from 'express';
import { JourneyService } from '../services/JourneyService';
import UploadManager from '../config/upload-helper';
import multer from 'multer';

const service = new JourneyService();

export class JourneyController {
  async upload(req: Request, res: Response) {
    try {
      if (UploadManager.upload) {
        UploadManager.upload(req, res, (err: any) => {
          if (err instanceof multer.MulterError) {
            console.log(err);
            res.status(500).send({
              message: 'Internal Error',
            });
          }

          const filename = req.file?.filename;

          res.status(200).send({
            message: `The file ${filename} was uploaded successfuly`,
          });
        });
      } else {
        console.log('Upload was not configured');
        res.status(500).send({
          message: 'Internal Error',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: 'Internal Error',
      });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const result = await service.execute();
      res.status(200).send({
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: 'Internal Error',
      });
    }
  }
}
