import admin from "firebase-admin";
import chalk from "chalk";
import Debug from "debug";

const debug = Debug("collector:firebase");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "collector-784d2.appspot.com",
});

const firebase = async (req, res, next) => {
  try {
    const bucket = admin.storage().bucket();
    await bucket.upload(req.file.path);
    await bucket.file(req.file.filename).makePublic();
    const fileURL = bucket.file(req.file.filename).publicUrl();
    debug(chalk.greenBright(fileURL));
    req.body.image = fileURL;
    req.body.imageLocal = req.file.path;
    next();
  } catch (error) {
    error.code = 400;
    error.message = "Something went wrong while uploading to firebase";
    next(error);
  }
};

export default firebase;
