/**
 * weather.js - 天气相关函数
 */

/**
 * 获取当前天气信息
 * @param longitude 经度
 * @param latitude 纬度
 * @returns 天气信息JSON
 */
async function get_weather(longitude = 108.68, latitude = 34.33) {
	try {
		let res = await get(`weather/now`, {
			longitude: longitude,
			latitude: latitude,
			host: g_host
		});
		assert(res.status_code == 200);
		let data = res.json().data;
		assert(data && Object.keys(data).length);
		return data.realtimeData;
	}
	catch (e) {
		return null;
	};

}

/**
 * 获取15日天气信息
 * @param longitude 经度
 * @param latitude 纬度
 * @returns 天气信息JSON
 */
async function get_weather_daily(longitude = 108.68, latitude = 34.33) {
	try {
		let res = await get(`weather/daily`, {
			longitude: longitude,
			latitude: latitude,
			host: g_host
		});
		assert(res.status_code == 200);
		let data = res.json().data;
		assert(data && Object.keys(data).length);
		return data.daily;
	}
	catch (e) {
		return null;
	};

}

/**
 * 获取24时天气信息
 * @param longitude 经度
 * @param latitude 纬度
 * @returns 天气信息JSON
 */
async function get_weather_hourly(longitude = 108.68, latitude = 34.33) {
	try {
		let res = await get(`weather/hourly`, {
			longitude: longitude,
			latitude: latitude,
			host: g_host
		});
		assert(res.status_code == 200);
		let data = res.json().data;
		assert(data && Object.keys(data).length);
		return data.hourly;
	}
	catch (e) {
		return null;
	};

}

/**
 * 天气状态码转中文
 * @param code 状态码
 * @returns 对应中文
 */
function to_skycon(code = "") {
	return {
		"CLEAR_DAY": "晴 (白天) ",
		"CLEAR_NIGHT": "晴 (夜间) ",
		"PARTLY_CLOUDY_DAY": "多云 (白天) ",
		"PARTLY_CLOUDY_NIGHT": "多云 (夜间) ",
		"CLOUDY": "阴",
		"LIGHT_HAZE": "轻度雾霾",
		"MODERATE_HAZE": "中度雾霾",
		"HEAVY_HAZE": "重度雾霾",
		"LIGHT_RAIN": "小雨",
		"MODERATE_RAIN": "中雨",
		"HEAVY_RAIN": "大雨",
		"STORM_RAIN": "暴雨",
		"FOG": "雾",
		"LIGHT_SNOW": "小雪",
		"MODERATE_SNOW": "中雪",
		"HEAVY_SNOW": "大雪",
		"STORM_SNOW": "暴雪",
		"DUST": "浮尘",
		"SAND": "沙尘",
		"WIND":"大风"
	}[code];
}