/**
 * global.js - 全局变量声明
 */

// 后端服务器地址，方便切换后端
var g_host = "http://162.14.77.208:5002";

// 位置信息
var g_location = {
	city: "秦都区",
	address: "陕西省咸阳市秦都区迎宾路",
	longitude: 108.68,
	latitude: 34.33,
	force: false
}

// 天气状况，图表、图表配置、图表X/Y轴数据
var g_chart_skycon = undefined;
var g_chart_skycon_option = {};
var g_skycon_data_x_daily = [];
var g_skycon_data_y_daily = [];
var g_skycon_data_x_hourly = [];
var g_skycon_data_y_hourly = [];

// 温度，图表、图表配置、图表X/Y轴数据
var g_chart_temperature = undefined;
var g_chart_temperature_option = {};
var g_temperature_data_x_daily = []
var g_temperature_data_y_min_daily = [];
var g_temperature_data_y_max_daily = [];
var g_temperature_data_x_hourly = [];
var g_temperature_data_y_hourly = [];

// 湿度，图表、图表配置、图表X/Y轴数据
var g_chart_humidity = undefined;
var g_chart_humidity_option = {};
var g_humidity_data_x_daily = [];
var g_humidity_data_y_daily = [];
var g_humidity_data_x_hourly = [];
var g_humidity_data_y_hourly = [];

// 降水概率，图表、图表配置、图表X/Y轴数据
var g_chart_precipitation = undefined;
var g_chart_precipitation_option = {};
var g_precipitation_data_x_daily = [];
var g_precipitation_data_y_daily = [];
var g_precipitation_data_x_hourly = [];
var g_precipitation_data_y_hourly = [];

// AQI，图表、图表配置、图表X/Y轴数据
var g_chart_airquality = undefined;
var g_chart_airquality_option = {};
var g_airquality_data_x_daily = [];
var g_airquality_data_y_daily = [];
var g_airquality_data_x_hourly = [];
var g_airquality_data_y_hourly = [];

// AQI组分，图表、图表配置、图表X/Y轴数据
var g_chart_aqicomponents = undefined;
var g_chart_aqicomponents_option = {};
var g_aqicomponents_data_x_daily = [];
var g_aqicomponents_data_y_pm25_daily = [];
var g_aqicomponents_data_x_hourly = [];
var g_aqicomponents_data_y_pm25_hourly = [];