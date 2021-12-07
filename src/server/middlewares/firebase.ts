import admin from "firebase-admin";

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
    req.body.images = fileURL;
    next();
  } catch (error) {
    error.code = 400;
    error.message = "Something failed uploading to firebase";
  }
};

export default firebase;
