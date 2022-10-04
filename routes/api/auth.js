const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/auth');

const { ctrlWrapper } = require('../../helpers');
const { authenticate } = require('../../middlewares');



router.post("/signup", ctrlWrapper(ctrl.signup));

router.post("/login", ctrlWrapper(ctrl.login));

router.get("/current",authenticate, ctrlWrapper(ctrl.getCurrentUser));

router.get("/logout",authenticate, ctrlWrapper(ctrl.logOut));

module.exports = router;