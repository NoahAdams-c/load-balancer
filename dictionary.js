/**
 * @Description:
 * @Author: chenchen
 * @Date: 2020-03-27 13:25:11
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-27 14:47:50
 */
const {promisify} = require('util')
const {serverHosts} = require('./config')
const {logger} = require('cc-vue-util')

class dictionary {
	constructor(redis) {
		this.redis = redis
	}
	/**
	 * 获得相对空闲的服务器
	 */
	async getFreeServer() {
        const scard = promisify(this.redis.scard).bind(this.redis)
        let minConn = 0
        let freeServer = serverHosts[0]
        // 选出连接最少的服务器
        serverHosts.forEach((host,index) => {
            let connNum = await scard(host)
            if(index === 0) {
                minConn = connNum
            }
            if(connNum<minConn) {
                minConn = connNum
                freeServer = host
            }
        })
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
        const result = await sadd(serverHost,clientKey)
        logger('Buffer Connection Result',result)
    }

	/**
	 * 获取当前连接所属服务器
	 *
	 * @param {String} clientKey 客户端主键（用来唯一标志一个客户端的某个字符串）
	 */
	async getServer(clientKey) {
        const sismember = promisify(this.redis.sismember).bind(this.redis)
        let  server = null
        for(let host of serverHosts){
            let ismem = await sismember(host, clientKey)
            if(ismem) {
                server = host
                break
            }
        }
        return server
    }
}

module.exports = dictionary
