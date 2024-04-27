// Import express and initialise a new express app
import express from "express";
const app = express();

// Import mongoose, morgan, cors, helmet, dotenv, ... and initialise them
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { S3 } from "aws-sdk";
import usersRoute from "./routes/usersRoute";
import listingRoute from "./routes/jobListingRoutes";
import applicationsRoute from "./routes/applicationRoutes";
import notificationsRoute from "./routes/notificationRoute";

app.use(express.json());
dotenv.config();
app.use(cors({ origin: ["*"] }));
app.use(morgan("common"));
app.use(helmet());

// MONGDB DATABASE CONNECTION
// Incase the env variable MONGO_URI is not set, return error :(
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined");
}

// If the DB connection url is available in .env file, use mongoose
// to connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected to the backend successfully");
  })
  .catch((err) => console.log(err));

// Upload image to s3 bucket
const awsS3ClientConfiguration = {
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_ACCESS_SECRET,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
};

const s3 = new S3Client(awsS3ClientConfiguration);

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

// instatiate a new s3 client to use for getting bucket objects
const awsBucket = new S3(awsS3ClientConfiguration);

app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    console.log("No file uploaded");
  } else {
    try {
      return res
        .status(200)
        .json({ message: "File uploaded successfully", file: req.file });
    } catch (error) {
      return console.error(error);
    }
  }
});

// Retrieve image from the s3 bucket
async function getImage(bucket: any, key: any) {
  const params = {
    Bucket: bucket,
    Key: key,
  };

  const data = await awsBucket.getObject(params).promise();
  return data.Body;
}

app.use("/image/:key", async (req, res) => {
  const image = await getImage(process.env.S3_BUCKET_NAME, req.params.key);
  res.status(200).json(image);
});

// other app routes
app.use("/api/v1/users/", usersRoute);
app.use("/api/v1/listings/", listingRoute);
app.use("/api/v1/applications/", applicationsRoute);
app.use("/api/v1/notifications/", notificationsRoute);

// Start express server
const PORT = process.env.PORT || 8900;
app.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}`);
});

// Export instance of express app for use in other areas like unit test files
export { app };
