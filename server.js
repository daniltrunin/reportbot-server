const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT ?? 3000;
const ORIGIN = process.env.ORIGIN;
const app = express();
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const reportRoutes = require("./routes/report");
require("dotenv").config();

app.use(
    cors({
        origin: `${ORIGIN}`, // Разрешить запросы только с этого домена
        methods: ["GET", "POST", "PUT", "DELETE"], // Разрешенные HTTP-методы
        allowedHeaders: ["Content-Type", "Authorization"], // Разрешенные заголовки
    })
);

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to mongodb"))
    .catch((e) => console.error(`Error connecting: ${e}`))
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// Роуты для авторизации
app.use("/auth", authRoutes);

// Роуты для api
app.use("/api", apiRoutes);

// Роуты для api
app.use("/report", reportRoutes);