import "dotenv/config";
import express from "express";
import { ZodError } from "zod"; 
import { ErrorWithStatus } from "./src/utils/errorTypes.js";
import { DatabaseError } from "pg";
import cors from "cors";
import usersRouter from "./src/modules/users/users.routes.js";
import cuotasRouter from "./src/modules/cuotas/cuotas.routes.js";
import paymentRouter from "./src/modules/payment/payment.routes.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { authenticateUser } from "./src/modules/auth/auth.middlewares.js";
import authRouter from "./src/modules/auth/auth.routes.js";
import path from "path";
import { fileURLToPath } from "url"; 
import { handler as ssrHandler } from './dist/server/entry.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors({ credentials: true, origin: ["http://localhost:4321"] }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'dist', 'client')));

// 2. Rutas de la API
app.use("/api/cuotas", authenticateUser, cuotasRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/payment", authenticateUser, paymentRouter);

app.use(ssrHandler);

app.use((err, req, res, _next) => {
  console.log(err);

  if (err instanceof ZodError) {
    const messages = err.issues.map((zodError) => zodError.message);
    const message = messages.join(",\n");
    return res.status(400).json({ error: message });
  }

  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err instanceof DatabaseError) {
    if (err.code === "22P02") {
      return res
        .status(400)
        .json({ error: "Hubo un error. Contacte al administrador" });
    }
    if (err.code === "23505") {
      return res
        .status(400)
        .json({
          error: "El correo ya esta en uso. Por favor intente con otro.",
        });
    }
  }

  if (err instanceof jwt.TokenExpiredError) {
    return res.status(403).json({ error: "El token ha expirado" });
  }

  res.status(500).json({ error: "HUBO UN ERROR" });
});

export default app;
