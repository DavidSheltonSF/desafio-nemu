import express, {NextFunction, Request, Response} from "express";
import multer from "multer"
import { ExcelHandler } from "./helpers/ExcelHandler";
import { JourneyService } from "./services/JourneyService";

const app = express();
const port = 3000;

app.post('/app', (req: Request, res: Response) => {

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/public`);
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
});

app.get("/app/data", async (req: Request, res: Response) => {
  const excelHandler = new ExcelHandler("src/public/data.xlsx");
  const result = await excelHandler.readLines();
  res.status(200).send(result);
})

app.get("/app/journeys/", async (req: Request, res: Response) => {
  const service = new JourneyService();
  const result = await service.execute();
  console.log(result);
  res.status(200).send(result[1])
})

app.listen(port, () => {
  console.log(`Server is listenign on port ${port}`);
})