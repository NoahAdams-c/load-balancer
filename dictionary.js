/**
 * @Description:
 * @Author: chenchen
 * @Date: 2020-03-27 13:25:11
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-27 17:31:42
 */
const { promisify } = require("util")
const { serverHosts } = require("./config")
const { logger } = require("cc-vue-util/common")
const readline = require("readline")

class dictionary {
	constructor(redis) {
		this.redis = redis
	}
	/**
	 * 获得相对空闲的服务器
	 */
	async getFreeServer() {
		let log = ""
		const scard = promisify(this.redis.scard).bind(this.redis)
		let minConn = await scard(serverHosts[0])
		log += `${serverHosts[0]}: ${minConn}\n`
		let freeServer = serverHosts[0]
		// 选出连接最少的服务器
		for (let index = 1; index < serverHosts.length; index++) {
			let connNum = await scard(serverHosts[index])
			log += `${serverHosts[index]}: ${connNum}\n`
			if (connNum < minConn) {
				minConn = connNum
				freeServer = serverHosts[index]
			}
		}
		logger("负载情况", "\n" + log)
		return freeServer
	}

	/**
	 * 记录连接信息到字典
	 *
	 * @param {String} serverHost 服务器地址
	 * @param {String} clientKey 客户端主键（用来唯一标志一个客户端的某个字符串）
	 */
	async bufferConnection(serverHost, clientKey) {
		const sadd = promisify(this.redis.sadd).bind(this.redis)
		const result = await sadd(serverHost, clientKey)
		return !!result
	}

	/**
	 * 获取当前连接所属服务器
	 *
	 * @param {String} clientKey 客户端主键（用来唯一标志一个客户端的某个字符串）
	 */
	async getServer(clientKey) {
		const sismember = promisify(this.redis.sismember).bind(this.redis)
		let server = null
		for (let host of serverHosts) {
			let ismem = await sismember(host, clientKey)
			if (ismem) {
				server = host
				break
			}
		}
		return server
	}
}

module.exports = dictionary
