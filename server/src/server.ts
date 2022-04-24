import express from "express";
const app = express();
import bodyParser from "body-parser";
require("dotenv").config();
const cors = require("cors");
import { connectElasticsearch } from "./services/elasticsearchActions";
connectElasticsearch();

import BlogRoute from "./routes/blogs";

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use("/api/blogs", BlogRoute);


app.listen(process.env.PORT);

export default app;