import express from "express";
import { configUpload } from "./config/upload";
import journeyRoutes from "./routes/journey"


configUpload();

const app = express();

app.use(express.json());

const port = 3000;

app.use(journeyRoutes);


app.listen(port, () => {
  console.log(`Server is listenign on port ${port}`);
})