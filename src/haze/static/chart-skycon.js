/**
 * chart-skycon.js - 天气状况图表相关
 */

// 湿度图表配置
g_chart_skycon_option = {
	grid: {
		height: "80%",
		top: "3%",
		bottom: "0%"
	},
	xAxis: {
		type: "category",
		data: g_skycon_data_x_daily,
		axisLabel: {
			// interval: 0,
			textStyle: {
				fontFamily: "Courier New, Courier, monospace"
			}
		},
		splitArea: {
			show: true,
			areaStyle: {
				color: ["#eef", "#ffd"]
			}
		}
	},
	yAxis: {
		show: false,
		data: [""]
	},
	visualMap: {
		show: false
	},
	series: {
		type: "heatmap",
		data: Array.from(g_skycon_data_x_daily,
				 (v, i) => [v, 0, 0, g_skycon_data_y_daily[i]]),
		// 折线区域颜色浅蓝色
		areaStyle: {
			color: "#cce"
		},
		label: {
			show: true,
			textStyle: {
				fontFamily: "Courier New, Courier, monospace",
				fontSize: 12,
				color: "#333"

			},
			formatter: p => Array.from(p.value[3]
						    .replace(" (", "⌢")
						    .replace(") ", "⌣"))
					     .join("\n")
		}
	}
};

/**
 * 重新加载湿度图表
 * @param data_x X轴数据
 * @param data_y Y轴数据
 */
async function chart_skycon_reload(data_x, data_y) {
	// 若图表已存在则销毁
	if (g_chart_skycon)
		g_chart_skycon.dispose();
	// 初始化图表
	g_chart_skycon = echarts.init(document.getElementById(
						    "chart-skycon-div"));
	// 设置数据
	g_chart_skycon_option.xAxis.data = data_x;
	g_chart_skycon_option.series.data =
			     Array.from(data_x, (v, i) => [v, 0, 0, data_y[i]]);
	// 应用图表配置
	g_chart_skycon.setOption(g_chart_skycon_option);
	// 注册自动缩放事件
	window.addEventListener("resize", g_chart_skycon.resize);
}