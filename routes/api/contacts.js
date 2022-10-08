const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper,isValidId } = require('../../helpers');

const { authenticate } = require('../../middlewares');



router.get('/',authenticate,ctrlWrapper(ctrl.listContacts));

router.get('/:contactId',authenticate,isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/', authenticate, ctrlWrapper(ctrl.addContact));

router.put('/:contactId', authenticate,isValidId, ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite',authenticate,isValidId, ctrlWrapper(ctrl.updateStatusContact));

router.delete('/:contactId',authenticate,isValidId, ctrlWrapper(ctrl.removeContact));

module.exports = router