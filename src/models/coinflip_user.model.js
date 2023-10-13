const query = require('../db/db-connection')
const { multipleColumnSet } = require('../utils/common.utils');

class COINFLIPUSERModel{
	tableName = 'coinflip'

    find = async (params = {}) => { 
        try {
            let sql = `SELECT * FROM ${this.tableName}`;
            if (!Object.keys(params).length) {
                return await query(sql);
            }
            const { columnSet, values } = multipleColumnSet(params)
            sql += ` WHERE ${columnSet}`;
            return await query(sql, [...values]);
        } catch(error) {
            return {error:error.sqlMessage}
        }
    }

    findOne = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)            
            const sql = `SELECT * FROM ${this.tableName}
            WHERE ${columnSet}`;
            const result = await query(sql, [...values]);
            return result[0];
        } catch(error) {
            return {error:error.sqlMessage}
        }
    }

    findRecent = async (num) => {
        try{
           let sql = `SELECT * FROM ${this.tableName} ORDER BY last_time LIMIT ${num}`
           return await query(sql) 
        }catch(error){
            return {error:error.sqlMessage}
        }
    }

    findWinstreak = async (num) => {
        try{
           let sql = `SELECT * FROM ${this.tableName} where max_winstreak > 0 ORDER BY max_winstreak LIMIT ${num}`
           return await query(sql) 
        }catch(error){
            return {error:error.sqlMessage}
        }
    }

    findTop = async (num) => {
        try{
            let sqlSol = `SELECT * FROM ${this.tableName} where sol_total > 0 ORDER BY sol_total LIMIT ${num}`
            let sqlIV = `SELECT * FROM ${this.tableName} where iv_total >= 1 ORDER BY iv_total LIMIT ${num}`
            let sol = await query(sqlSol)
            let iv = await query(sqlIV)
            
           return {sol : sol, iv : iv}
        }catch(error){
            return {error:error.sqlMessage}
        }
    }

	create = async(wallet) => {
		try{
			const sql = `insert into ${this.tableName}
				(wallet) VALUES (?)`;
			const result = await query(sql, [wallet]);
			// const affectedRows = result ? result.affectedRows : 0;
			console.log(result)
            return result
		} catch(err) {
			return {error:err.sqlMessage}
		}
	}

	update = async (params, wallet) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)

            const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE wallet = ?`;

            const result = await query(sql, [...values, wallet]);

            return result;
        } catch(error) {
            return {error:error.sqlMessage}
        }
    }

    delete = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `DELETE FROM ${this.tableName}
            WHERE ${columnSet}`;
            const result = await query(sql, [...values]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            return {error:error.sqlMessage}
        }
    }
}

module.exports = new COINFLIPUSERModel