/**
 * chart-aqicomponents.js - AQI组分图表相关
 */

// AQI组分图表配置
g_chart_aqicomponents_option = {
	grid: {
		height: "80%",
		top: "6%",
		bottom: "4%",
	},
	legend: {
		top: "3%",
		data: ["PM2.5", "PM10", "NO2 ", "SO2", "CO", "O3"],
		textStyle: {
			fontFamily: "Courier New, Courier, monospace"
		}
	},
	// 组分可以有多种，不适宜显示数据点数值，而是鼠标悬停时在浮窗中显示
	tooltip: {
		trigger: "axis",
		textStyle: {
			fontFamily: "Courier New, Courier, monospace"
		}
	},
	xAxis: {
		type: "category",
		data: g_aqicomponents_data_x_daily,
		axisLabel: {
			textStyle: {
				fontFamily: "Courier New, Courier, monospace"
			}
		}
	},
	yAxis: {
		type: "value",
		axisLabel: {
			textStyle: {
				fontFamily: "Courier New, Courier, monospace"
			}
		}
	},
	// 受彩云天气API限制，只能看PM2.5的
	series: [
		{
			name: "PM2.5",
			type: "line",
			stack: "total",
			// 允许多组分数据河流状堆叠显示，但无奈只能看PM2.5的
			areaStyle: {},
			data: g_aqicomponents_data_y_pm25_daily
		}
]
};

/**
 * 重新加载AQI组分图表
 * @param data_x X轴数据
 * @param data_y_pm25 Y轴PM2.5数据
 */
async function chart_aqicomponents_reload(data_x, data_y_pm25) {
	// 若图表已存在则销毁
	if (g_chart_aqicomponents)
		g_chart_aqicomponents.dispose();
	// 初始化图表
	g_chart_aqicomponents = echarts.init(document.getElementById(
						    "chart-aqicomponents-div"));
	// 设置数据
	g_chart_aqicomponents_option.xAxis.data = data_x;
	g_chart_aqicomponents_option.series[0].data = data_y_pm25;
	// 应用图表配置
	g_chart_aqicomponents.setOption(g_chart_aqicomponents_option);
	// 注册自动缩放事件
	window.addEventListener("resize", g_chart_aqicomponents.resize);
}