import admin from "firebase-admin";
import chalk from "chalk";
import Debug from "debug";

const debug = Debug("collector:firebase");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "collector-784d2.appspot.com",
});

const firebase = async (req, res, next) => {
  const bucket = admin.storage().bucket();
  try {
    req.images = [];
    const getImages = req.files.map(async (image) => {
      await bucket.upload(image.path);
      await bucket.file(image.filename).makePublic();
      return bucket.file(image.filename).publicUrl();
    });
    debug(chalk.green("Loaded files"));
    const images = await Promise.all(getImages);
    req.images = images;
    next();
  } catch (error) {
    error.code = 400;
    error.message = "Something went wrong while uploading to Firebase";
    next(error);
  }
};

export default firebase;
