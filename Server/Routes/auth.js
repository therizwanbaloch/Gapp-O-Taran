const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { registerUser, loginUser, getUser } = require("../controllers/authControllers");
const protect = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddle");

const router = express.Router();

router.post("/register", registerUser )
router.post("/login", loginUser )
router.get("/userinfo", protect ,getUser)
router.post("upload-image", upload.single("image"), (req,res) => {
    if (!req.file) {
        res.json({message:"no file Uploaded"})
    }
    const imaageURL = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`

    res.status(200).json({message:"Uploaded successfully", imaageURL})
})

module.exports = router;
