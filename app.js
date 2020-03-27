/**
 * @Description:app init
 * @Author: chenchen
 * @Date: 2020-03-27 12:45:27
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-27 15:54:57
 */

const app = require("express")()
const body_parser = require("body-parser")
const { port, redis, clientKeyField } = require("./config")
const redisInstance = require("node-redis")(...redis)
const dic = require("./dictionary")(redisInstance)

module.exports = {
	/**
	 * init server
	 */
	getInstance: () => {
		// josn parser
		app.use(body_parser.json())
		// dictionay handle
		app.use("/ivr", async (req, resp, next) => {
			let serverHost = await dic.getServer(req[clientKeyField])
			if (!serverHost) {
				const freeServer = await dic.getFreeServer()
				await dic.bufferConnection(freeServer, req[clientKeyField])
				serverHost = freeServer
			}
			app.set("host", serverHost)
			await next()
		})

		// create server listen
		const server = app.listen(port, function() {
			console.log("Listening on port %d\n", server.address().port)
		})
		return app
	}
}
