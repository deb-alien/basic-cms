import { createServer } from "http";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { PORT } from "./config/app.config.js";
import { ConnectMongoDB } from "./config/app.config.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import teamRoutes from "./routes/team.routes.js"
import serviceRoutes from "./routes/service.routes.js"

const app = express();
const server = createServer(app);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v0/auth", authRoutes);
app.use("/api/v0/users", userRoutes);
app.use("/api/v0/projects", projectRoutes);
app.use('/api/v0/teams', teamRoutes)
app.use('/api/v0/services', serviceRoutes)

server.listen(PORT, () => {
	ConnectMongoDB();
	console.log("server is running");
});
