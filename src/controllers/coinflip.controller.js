const COINFLIPService = require("../services/coinflip.service")


class COINFLIPController {
	play = async (req, res, next) => {
		try{
			const result = await COINFLIPService.play(req.body)
			res.send(result)
		} catch(err) {
			next(err)
		}
	}

	getRecent = async (req, res, next) => {
		try{
			const result = await COINFLIPService.getRecent()
			res.send(result)
		} catch(err) {
			next(err)
		}
	}

	getWinstreak = async (req, res, next) => {
		try{
			const result = await COINFLIPService.getWinstreak()
			res.send(result)
		} catch(err) {
			next(err)
		}
	}

	getTop = async (req, res, next) => {
		try {
			const result = await COINFLIPService.getTop()
			res.send(result)
		} catch(err) {
			next(err)
		}
	}

	getMessageForSign = async (req, res, next) =>{
		try{
			const result = COINFLIPService.getMessageForSign()
			res.send(result)
		} catch(err) {
			next(err)
		}
	}
}

module.exports = new COINFLIPController