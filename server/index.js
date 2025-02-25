import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {} from "dotenv/config";
import earth911Router from "./src/routes/earth911routes.js";
import userRouter from "./src/routes/userRoutes.js";
import habitRouter from "./src/routes/habitRoutes.js";
import answerRouter from "./src/routes/answerRoutes.js";

const PORT = process.env.PORT || 3001;
const app = express();

const corsOptions = {
  origin: ["http://www.ecohabit.com", "http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Ok!");
});

app.use("/", earth911Router);
app.use("/user", userRouter);
app.use("/habit", habitRouter);
app.use("/answer", answerRouter);

const runServer = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);

    app.listen(PORT, () => {
      console.log(`EcoHabit is running, server listening to ${PORT}`);
    });
  } catch (err) {
    console.log("Error message: ", err);
  }
};

runServer();
