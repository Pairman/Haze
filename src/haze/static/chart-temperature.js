/**
 * chart-temperature.js - 温度图表相关
 */

// 温度图标配置
g_chart_temperature_option = {
	grid: {
		height: "80%",
		top: "3%",
		bottom: "0%"
	},
	visualMap: {
		show: false,
		max: 36,
		min: -4,
		inRange: {
			// 不同温度渐变色
			color: [
				"#006b99",
				"#009999",
				"#00a372",
				"#00a34c",
				"#00ad3a",
				"#a88c00",
				"#cc3600"
			]
		}
	},
	xAxis: {
		type: "category",
		data: g_temperature_data_x_daily,
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
	series: [
		{
			// 柱状图，下同
			type: "bar",
			// 同组紧凑显示
			barGap: 0,
			data: g_temperature_data_y_min_daily,
			label: {
				show: true,
				// 数值显示在顶部内侧
				position: "insideTop",
				textStyle: {
					fontFamily:
						"Courier New," +
						" Courier, " +
						"monospace",
					fontSize: 12,
					color: "#333"
				}
			}
		},
		{
			type: "bar",
			data: g_temperature_data_y_max_daily,
			label: {
				show: true,
				// 数值显示在顶部内侧
				position: "insideTop",
				textStyle: {
					fontFamily: "Courier New, Courier, " +
						    "monospace",
					fontSize: 12,
					color: "#333"
				}
			}
		}
	]
};

/**
 * 重新加载温度图表
 * @param data_x X轴数据
 * @param data_y_min Y轴低温数据
 * @param data_y_max Y轴高温数据
 */
async function chart_temperature_reload(data_x, data_y_min, data_y_max) {
	// 若图表已存在则销毁
	if (g_chart_temperature)
		g_chart_temperature.dispose();
	// 初始化图表
	g_chart_temperature = echarts.init(document.getElementById(
						      "chart-temperature-div"));
	// 设置数据
	// 若无高温数据（对应24时）则不加载之
	g_chart_temperature_option.xAxis.data = data_x;
	g_chart_temperature_option.series[0].data = data_y_min;
	if (data_y_max)
		g_chart_temperature_option.series[1].data = data_y_max;
	// 应用图表配置
	g_chart_temperature.setOption(g_chart_temperature_option);
	// 注册自动缩放事件
	window.addEventListener("resize", g_chart_temperature.resize);
}