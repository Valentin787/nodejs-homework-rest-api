const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/auth');

const { ctrlWrapper } = require('../../helpers');
const { authenticate,upload } = require('../../middlewares');



router.post("/signup", ctrlWrapper(ctrl.signup));

router.post("/login", ctrlWrapper(ctrl.login));

router.get("/current",authenticate, ctrlWrapper(ctrl.getCurrentUser));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logOut));

router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;