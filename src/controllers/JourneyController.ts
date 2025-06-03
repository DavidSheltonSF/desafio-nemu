import { Request, Response } from "express";
import { JourneyService } from "../services/JourneyService";
import multer from "multer";

const service = new JourneyService();

export class JourneyController {
  async upload(req: Request, res: Response){

    try {

      const storage = multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, `src/public`);
          },
          filename: (req, file, cb) => {
            cb(null, `data.xlsx`);
          }
        });
      
        const upload = multer({ storage }).single("file");
      
        upload(req, res, (err: any) => {
          if (err instanceof multer.MulterError ){
            res.status(500).send(err)
          }
      
          const filename = req.file?.filename;
      
          console.log(filename)
      
          res.status(200).send({
            message: `The file ${filename} was uploaded successfuly`
          })
        });
      
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}