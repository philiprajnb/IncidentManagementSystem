import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import incidentRoutes from "./routes/incident.routes";
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    methods: [
      "GET",
      "POST",
      "PATCH",
      "OPTIONS",
    ],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 204,
  })
);
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
