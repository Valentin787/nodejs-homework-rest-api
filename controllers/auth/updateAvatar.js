const fs = require('fs/promises');
const Jimp = require('jimp');
const path = require('path');
const { User } = require('../../models/user');
const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const file = await Jimp.read(tempUpload);
    const extention = originalname.split(".").pop();
    const filename = `${_id}.${extention}`;

    const resultUpload = path.join(avatarDir, filename);
    await file.resize(250, 250).writeAsync(filename);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", originalname);
    await User.findByIdAndUpdate(_id, { avatarURL })
    
    res.json({ avatarURL });

  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
}

module.exports = updateAvatar;
