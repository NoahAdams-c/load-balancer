/**
 * @Description: entry
 * @Author: chenchen
 * @Date: 2020-03-27 12:41:40
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-27 17:52:54
 */
const { promisify } = require("util")
const request = promisify(require("request"))
const app = require("./app").getInstance()

app.post("/ivr", async (req, resp) => {
	const host = app.get("host")
	res = await request({
		url: `http://${host}/ivr`,
		method: "POST",
		body: req.body,
		json: true
	})
	resp.send(res.body)
})
