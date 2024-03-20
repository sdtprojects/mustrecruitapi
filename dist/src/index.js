"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// Import express and initialise a new express app
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
// Import mongoose, morgan, cors, helmet, dotenv, ... and initialise them
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
const aws_sdk_1 = require("aws-sdk");
const usersRoute_1 = __importDefault(require("./routes/usersRoute"));
const jobListingRoutes_1 = __importDefault(require("./routes/jobListingRoutes"));
const applicationRoutes_1 = __importDefault(require("./routes/applicationRoutes"));
const notificationRoute_1 = __importDefault(require("./routes/notificationRoute"));
app.use(express_1.default.json());
dotenv_1.default.config();
app.use((0, cors_1.default)({ origin: ["*"] }));
app.use((0, morgan_1.default)("common"));
app.use((0, helmet_1.default)());
// MONGDB DATABASE CONNECTION
// Incase the env variable MONGO_URI is not set, return error :(
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
}
// If the DB connection url is available in .env file, use mongoose
// to connect to mongodb
mongoose_1.default
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
const s3 = new client_s3_1.S3Client(awsS3ClientConfiguration);
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3,
        bucket: process.env.S3_BUCKET_NAME,
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: "TESTING_METADATA" });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        },
    }),
});
// instatiate a new s3 client to use for getting bucket objects
const awsBucket = new aws_sdk_1.S3(awsS3ClientConfiguration);
app.post("/api/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        console.log("No file uploaded");
    }
    else {
        try {
            return res
                .status(200)
                .json({ message: "File uploaded successfully", file: req.file });
        }
        catch (error) {
            return console.error(error);
        }
    }
});
// Retrieve image from the s3 bucket
async function getImage(bucket, key) {
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
app.use("/api/v1/users/", usersRoute_1.default);
app.use("/api/v1/listings/", jobListingRoutes_1.default);
app.use("/api/v1/applications/", applicationRoutes_1.default);
app.use("/api/v1/notifications/", notificationRoute_1.default);
// Start express server
const PORT = process.env.PORT || 8200;
app.listen(PORT, () => {
    console.log(`Backend server is running at port ${PORT}`);
});
//# sourceMappingURL=index.js.map