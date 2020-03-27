/**
 * @Description: entry
 * @Author: chenchen
 * @Date: 2020-03-27 12:41:40
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-27 15:22:52
 */
const { baseAjax } = require("cc-vue-util")
const app = require("./app").getInstance()

app.post("/ivr", async (req, resp) => {
	const host = app.get("host")
	const $ajax = baseAjax(`http://${host}`)
	res = await $ajax.doPost("/ivr", req)
	resp.send(res)
})
