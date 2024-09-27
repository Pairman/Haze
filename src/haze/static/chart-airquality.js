/**
 * chart-airquality.js - AQI图表相关
 */

// AQI图表配置
g_chart_airquality_option = {
	grid: {
		height: "80%",
		top: "3%",
		bottom: "0%"
	},
	visualMap: {
		show: false,
		// 不同污染程度对应不同颜色
		pieces: [
			{min: 0, max: 50, color: "#006400"},
			{min: 51, max: 100, color: "#cccc00"},
			{min: 101, max: 150, color: "#ff8c00"},
			{min: 151, max: 200, color: "#b22222"},
			{min: 201, max: 300, color: "#4b0082"},
			{min: 300, max: Infinity, color: "#8b0000"}
		]
	},
	xAxis: {
		type: "category",
		data: g_airquality_data_x_daily,
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
	series: {
		type: "line",
		data: g_airquality_data_y_daily,
		// 折线区域颜色浅灰色
		areaStyle: {
			color: "#ccc"
		},
		label: {
			show: true,
			// 数值显示在顶部内侧
			position: "insideTop",
			textStyle: {
				fontFamily: "Courier New, Courier, monospace",
				fontSize: 12,
				color: "#333"
			}
		}
	}
};

/**
 * 重新加载AQI图表
 * @param data_x X轴数据
 * @param data_y Y轴数据
 */
async function chart_airquality_reload(data_x, data_y) {
	// 若图表已存在则销毁
	if (g_chart_airquality)
		g_chart_airquality.dispose();
	// 初始化图表
	g_chart_airquality = echarts.init(document.getElementById(
						       "chart-airquality-div"));
	// 设置数据
	g_chart_airquality_option.xAxis.data = data_x;
	g_chart_airquality_option.series.data = data_y;
	// 应用图表配置
	g_chart_airquality.setOption(g_chart_airquality_option);
	// 注册自动缩放事件
	window.addEventListener("resize", g_chart_airquality.resize);
}