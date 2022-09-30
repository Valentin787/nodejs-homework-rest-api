const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');

router.get('/',ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

router.post('/', ctrlWrapper(ctrl.addContact));

router.put('/:contactId', ctrlWrapper(ctrl.updateContact));
router.patch('/:contactId/favorite', ctrlWrapper(ctrl.updateStatusContact));

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

module.exports = router