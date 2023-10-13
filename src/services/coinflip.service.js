const COINFLIPUSERModel = require("../models/coinflip_user.model")
const {MESSAGE_FOR_SIGN} = require("../utils/constants")
const {validationResult} = require("express-validator")

class COINFLIPService{
	constructor(){
	}

	static async play(rawData){
		try{
			if(!rawData.wallet){
				return {response: false, message:"You should enter all fields.", data: null}
			}
			let result1 = await COINFLIPUSERModel.find({wallet : rawData.wallet})
			let userData;
			if(result1.error) throw new Error("Find Error")
			if(result1.length == 0){
				let result2 = await COINFLIPUSERModel.create(rawData.wallet)
				if(result2.error) throw new Error("Create Error")
				userData=await COINFLIPUSERModel.findOne({wallet : rawData.wallet})
			}else{
				userData = result1[0]
			}

			if(rawData.status == 1){
				userData.last_winstreak += 1;
				if(userData.last_winstreak > userData.max_winstreak){
					userData.max_winstreak = userData.last_winstreak
					userData.max_winstreak_time = new Date()
				}

				if(rawData.coin)
					userData.iv_total += rawData.amount
				else
					userData.sol_total += rawData.amount

			}else{
				userData.last_winstreak = 0

				if(rawData.coin)
					userData.iv_total -= rawData.amount
				else
					userData.sol_total -= rawData.amount
			}

			userData.last_amount = rawData.amount
			userData.last_coin = rawData.coin
			userData.last_status = rawData.status
			userData.last_time = new Date()

			await COINFLIPUSERModel.update(userData, rawData.wallet)
			// await COINFLIPLOGModel.create({...rawData})
			return {response : true, message : 'success', data : userData}
		}catch(error){
			return {response : false, message:error, data : null}
		}
	}

	static async getRecent(){
		try{
			let result = await COINFLIPUSERModel.findRecent(10)
			return {response : true, message : 'success', data : result}
		}catch(error){
			return {response : false, message:error, data : null}
		}
	}

	static async getWinstreak(){
		try{
			let result = await COINFLIPUSERModel.findWinstreak(10)
			return {response : true, message : 'success', data : result}
		}catch(error){
			return {response : false, message:error, data : null}
		}
	}

	static async getTop(){
		try{
			let result = await COINFLIPUSERModel.findTop(10)
			return {response : true, message : 'success', data : result}
		}catch(error){
			return {response : false, message:error, data : null}
		}
	}

	static getMessageForSign(){
		return {data : MESSAGE_FOR_SIGN}
	}			
}

module.exports = COINFLIPService