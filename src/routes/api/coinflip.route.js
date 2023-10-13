const router = require('express').Router();
const COINFLIPController = require("../../controllers/coinflip.controller")
const awaitHandlerFactory = require('../../middleware/awaitHandlerFactory.middleware')

router.post('/play', awaitHandlerFactory(COINFLIPController.play))
router.get('/recent', awaitHandlerFactory(COINFLIPController.getRecent))
router.get('/winstreak', awaitHandlerFactory(COINFLIPController.getWinstreak))
router.get('/top', awaitHandlerFactory(COINFLIPController.getTop))
router.get('./messageforsign', awaitHandlerFactory(COINFLIPController.getMessageForSign))

module.exports = router