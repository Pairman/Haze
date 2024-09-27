/**
 * chart-precipitation.js - 湿度图表相关
 */

// 湿度图表配置
g_chart_precipitation_option = {
	grid: {
		height: "80%",
		top: "3%",
		bottom: "0%"
	},
	xAxis: {
		type: "category",
		data: g_precipitation_data_x_daily,
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
		data: g_precipitation_data_y_daily,
		// 折线区域颜色浅蓝色
		areaStyle: {
			color: "#cce"
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
 * 重新加载湿度图表
 * @param data_x X轴数据
 * @param data_y Y轴数据
 */
async function chart_precipitation_reload(data_x, data_y) {
	// 若图表已存在则销毁
	if (g_chart_precipitation)
		g_chart_precipitation.dispose();
	// 初始化图表
	g_chart_precipitation = echarts.init(document.getElementById(
						    "chart-precipitation-div"));
	// 设置数据
	g_chart_precipitation_option.xAxis.data = data_x;
	g_chart_precipitation_option.series.data = data_y;
	// 应用图表配置
	g_chart_precipitation.setOption(g_chart_precipitation_option);
	// 注册自动缩放事件
	window.addEventListener("resize", g_chart_precipitation.resize);
}