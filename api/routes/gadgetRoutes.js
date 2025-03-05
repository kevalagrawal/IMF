const express = require('express');
const { getAllGadgets, addGadget, updateGadget, decommissionGadget, selfDestructGadget } = require('../controllers/gadgetController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, getAllGadgets);
router.post('/', authenticate, addGadget);
router.patch('/:id', authenticate, updateGadget);
router.delete('/:id', authenticate, decommissionGadget);
router.post('/:id/self-destruct', authenticate, selfDestructGadget);

module.exports = router;