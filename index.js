import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import routes from "./controller/index.js"
import firebaseAdmin from 'firebase-admin';
import bodyParser from 'body-parser';
import multer from "multer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        // no larger than 10mb.
        fileSize: 10 * 1024 * 1024,
    },
})
app.use(multerMid.single('file'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(cors());
app.use(routes);

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert("./serviceAccountKey.json"),
    storageBucket: "<BUCKET_NAME_HERE>"
})

app.listen(PORT, () => {
    console.log(`API is up & running on port ${PORT}`);
});