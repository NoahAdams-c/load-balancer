/**
 * @Description: configure
 * @Author: chenchen
 * @Date: 2020-03-27 12:45:44
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-27 16:17:57
 */

module.exports = {
	port: "11111",
	redis: {
		host: "127.0.0.1",
		port: "6379",
		password: "960904"
	},
	// 客户端主键字段（客户端请求中用以唯一标识这个客户端的字段）
	clientKeyField: "callerid",
	// 服务器列表
	serverHosts: [
		"192.168.1.219:10010",
		"192.168.1.110:10010",
		"192.168.1.191:10010"
	]
}
