import express, {Request, Response} from "express";

const app = express();
const port = 3000;

app.get('/app', (req: Request, res: Response) => {
  res.send("Testing");
});


app.listen(port, () => {
  console.log(`Server is listenign on port ${port}`);
})