import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import incidentRoutes from "./routes/incident.routes";
const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan("dev"));

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({
    status: "OK",
    message: "Incident Management API",
  });
});

app.use("/api/incidents", incidentRoutes);

export default app;