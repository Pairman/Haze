from sys import argv as _argv
from importlib.metadata import version as _version
from flask import Flask as _Flask, render_template as _render_template, \
	make_response as _make_response, request as _request
from requests_cache import CachedSession as _CachedSession
from waitress import serve as _serve

def create_server():
	"""创建前端服务器
	:return: Flask应用.
	"""
	# 创建Flask应用
	# @Flask().route("<path_to_url>")可将一个函数挂载至对应URL
	server = _Flask(__name__)
	# 创建请求缓存会话
	# 支持expire_after参数，可在时效内缓存响应内容，减少下一次请求耗时
	server.config["requests-session"] = _CachedSession(backend = "memory")

	# 主页
	@server.route("/")
	@server.route("/index.html")
	def index_html():
		return _render_template("index.html")

	# 获取版本号
	@server.route("/haze/get_version")
	def haze_get_version():
		res = _make_response(_version("Haze"))
		res.status_code = 200
		return res

	# 获取当前天气信息 (网页直接请求后端受CORS限制)
	@server.route("/weather/now")
	def weather_now():
		params = _request.args
		_res = server.config["requests-session"].get(
			f"{params['host']}/weather/realtime", params,
			expire_after = 600
		)
		res = _make_response(_res.text)
		res.status_code = _res.status_code
		return res

	# 获取15日天气信息 (网页直接请求后端受CORS限制)
	@server.route("/weather/daily")
	def weather_daily():
		params = _request.args
		_res = server.config["requests-session"].get(
			f"{params['host']}/weather/day", params,
			expire_after = 600
		)
		res = _make_response(_res.text)
		res.status_code = _res.status_code
		return res

	# 获取24时天气信息 (网页直接请求后端受CORS限制)
	@server.route("/weather/hourly")
	def weather_hourly():
		params = _request.args
		_res = server.config["requests-session"].get(
			f"{params['host']}/weather/hour", params,
			expire_after = 600
		)
		res = _make_response(_res.text)
		res.status_code = _res.status_code
		return res

	# 获取当前地址信息 (网页直接请求后端受CORS限制)
	@server.route("/location/address")
	def location_address():
		params = _request.args
		_res = server.config["requests-session"].get(
			f"{params['host']}/location/getAddress", params,
			expire_after = 2592000
		)
		res = _make_response(_res.text)
		res.status_code = _res.status_code
		return res

	# 获取当前地址信息 (网页直接请求后端受CORS限制)
	@server.route("/location/location")
	def location_location():
		params = _request.args
		_res = server.config["requests-session"].get(
			f"{params['host']}/location/getLocation", params,
			expire_after = 2592000
		)
		res = _make_response(_res.text)
		res.status_code = _res.status_code
		return res
	return server

def start_server(host: str = "127.0.0.1", port: int = 5001):
	"""运行前端服务器.
	:param host: IP.
	:param port: 端口.
	"""
	_serve(app = create_server(), host = host, port = port)

def main():
	# 检查命令行参数是否合法
	if not len(_argv) in (1, 3):
		print(f"Haze - Haze Analytics Front-end. {_version('Haze')}")
		print(f"Usage: {_argv[0]} <ip> <port>")
		print(f"  or:  {_argv[0]}")
		exit(1)
	ip, port = "0.0.0.0", 5003
	if len(_argv) == 3:
		from socket import inet_aton
		try:
			ip = _argv[1]
			inet_aton(ip)
		except Exception:
			print(f"Invalid IP address {ip}")
			exit(1)
		try:
			port = int(_argv[2])
			assert 0 < port < 65536
		except Exception:
			print(f"Invalid port number {port}")
			exit(1)
	# 启动前端服务器
	print(f"Hosting front-end at {ip}:{port}")
	start_server(host = ip, port = port)