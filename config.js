/**
 * @Description: configure
 * @Author: chenchen
 * @Date: 2020-03-27 12:45:44
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-27 14:51:39
 */

module.exports = {
	port: "10010",
	redis: {
		host: "127.0.0.1",
		port: "6379",
		auth: "960904"
	},
	// 客户端主键字段（客户端请求中用以唯一标识这个客户端的字段）
	clientKeyField: "callerid",
	// 服务器列表
	serverHosts: [
		"192.168.1.219:12345",
		"192.168.1.110:12345",
		"192.168.1.191:12345"
	]
}
