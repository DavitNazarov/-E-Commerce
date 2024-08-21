import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dfipvthcg",
  api_key: "276375644778936",
  api_secret: "9wTX3De_m2GAJn0-rkyWYxzg2xU",
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // Name of the folder in Cloudinary where images will be stored
    allowed_formats: ["jpeg", "png", "webp"],
    public_id: (req, file) => `${file.fieldname}-${Date.now()}`,
  },
});

// Set up Multer with Cloudinary storage
const upload = multer({ storage });

const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: req.file.path, // Cloudinary URL of the uploaded image
      });
    } else {
      res.status(400).send({ message: "Please provide an image file." });
    }
  });
});

export default router;
