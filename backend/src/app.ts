import express from "express";
import { configUpload } from "./config/upload";
import journeyRoutes from "./routes/journey"
import { config } from "dotenv";

config();
configUpload();

const app = express();

app.use(express.json());

const port = process.env.PORT;

app.use(journeyRoutes);


app.listen(port, () => {
  console.log(`Server is listenign on port ${port}`);
})