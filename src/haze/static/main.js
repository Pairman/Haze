/**
 * main.js - 主要逻辑
 */

/**
 * 用于切换15日/24时视图
 */
async function switch_view() {
	if (switch_view.view == "daily") {
		switch_view.view = "hourly";
		document.getElementById("switch-view-div").innerText = "[24H]";
		// 由于温度图表15日有2组数据（低温、高温），24时只有平均温度
		// 受echarts限制，必须每次删除无关数据，否则图表无法正常显示
		if (g_chart_temperature_option.series.length == 2)
			switch_view.temp_max =
					g_chart_temperature_option.series.pop();
		chart_skycon_reload(g_skycon_data_x_hourly,
				    g_skycon_data_y_hourly);
		chart_temperature_reload(g_temperature_data_x_hourly,
					 g_temperature_data_y_hourly);
		chart_humidity_reload(g_humidity_data_x_hourly,
				      g_humidity_data_y_hourly);
		chart_precipitation_reload(g_precipitation_data_x_hourly,
					   g_precipitation_data_y_hourly);
		chart_airquality_reload(g_airquality_data_x_hourly,
					g_airquality_data_y_hourly);
		chart_aqicomponents_reload(g_aqicomponents_data_x_hourly,
					   g_aqicomponents_data_y_pm25_hourly);
	}
	else {
		switch_view.view = "daily";
		document.getElementById("switch-view-div").innerText = "[15D]";
		// 同上
		// 切换回15日数据时恢复最大值这组数据
		if (g_chart_temperature_option.series.length == 1)
				g_chart_temperature_option.series.push(
							  switch_view.temp_max);
		chart_skycon_reload(g_skycon_data_x_daily,
				    g_skycon_data_y_daily);
		chart_temperature_reload(g_temperature_data_x_daily,
					 g_temperature_data_y_min_daily,
					 g_temperature_data_y_max_daily);
		chart_humidity_reload(g_humidity_data_x_daily,
				      g_humidity_data_y_daily);
		chart_precipitation_reload(g_precipitation_data_x_daily,
					   g_precipitation_data_y_daily);
		chart_airquality_reload(g_airquality_data_x_daily,
					g_airquality_data_y_daily);
		chart_aqicomponents_reload(g_aqicomponents_data_x_daily,
					   g_aqicomponents_data_y_pm25_daily);
	}
}

/**
 * 获取设备定位
 */
async function locate_city() {
	let loc = await get_location();
	// 若未成功获取位置信息，则弹窗，使用之前的位置信息
	if (!loc)
		return alert("位置信息获取失败。\n请您检查权限设置，或手动切换城市。");
	// 获取地址信息并显示
	let addr = await to_address(loc.longitude, loc.latitude);
	if (!addr)
		return alert("地址信息获取失败。\n请手动切换城市。");
	// 设置位置信息
	Object.assign(g_location, loc);
	Object.assign(g_location, addr);
	g_location.force = false;
}

/**
 * 切换城市
 */
async function switch_city() {
	// 弹窗询问定位方式
	let force = confirm("“确认”以使用定位，“取消”以查找城市。");
	if (force)
		await locate_city();
	else {
		// 若输入为空或未成功获取位置信息，则弹窗返回
		let city = prompt("请输入城市名");
		if (!city)
			return;
		let loc = await to_location(city);
		if (!loc)
			return alert("位置信息获取失败。\n请检查您的输入。");
		let addr = await to_address(loc.longitude, loc.latitude);
		if (!addr)
			return alert("地址信息获取失败。\n请检查您的输入。");
		// 设置位置信息
		Object.assign(g_location, loc);
		Object.assign(g_location, addr);
		// 表示是否为手动设置的位置，避免下次使用时被定位覆盖。
		g_location.force = true;
	}
	// 重新加载数据和图表
	switch_view.view = undefined;
	init_view();
}

/**
 * 数据及图表初始化
 */
async function init_view() {
	// 保存位置信息、显示城市名
	localStorage.setItem("location", JSON.stringify(g_location));
	document.getElementById("city-div").innerText = g_location.city;
	// 隐藏切换15日/24时的按钮
	document.getElementById("switch-view-div").style.display = "none";
	// 获取当前天气数据
	get_weather(g_location.longitude, g_location.latitude).then(ret => {
		// 若失败，弹窗返回
		if (!ret)
			return alert("当前天气信息获取失败。");
		// 显示当前天气信息
		document.getElementById("skycon-div").innerText =
							  to_skycon(ret.skycon);
		document.getElementById("temperature-div").innerText =
					`温度 ${Math.round(ret.temperature)}°C`;
		document.getElementById("humidity-div").innerText =
					`湿度 ${parseInt(ret.humidity * 100)}%`;
		document.getElementById("airquality-div").innerText =
					    `AQI ${ret.airQuality.aqi.china} ` +
					    `${ret.airQuality.description.chn}`;
		document.getElementById("time-updated-div").innerText =
					      `更新时间 ${Date().slice(16, 21)}`;
	});
	// 获取15日天气数据
	get_weather_daily(g_location.longitude,
			  g_location.latitude).then(ret => {
		// 若失败，弹窗返回
		if (!ret)
			return alert("15日天气信息获取失败。");
		// 初始化15日对应的X/Y轴数据
		ret.skycon.forEach((v, i) => {
			g_skycon_data_x_daily[i] = v.date.slice(5, 10);
			g_skycon_data_y_daily[i] = to_skycon(v.value);
		});
		ret.temperature.forEach((v, i) => {
			g_temperature_data_x_daily[i] = v.date.slice(5, 10);
			g_temperature_data_y_min_daily[i] = v.min;
			g_temperature_data_y_max_daily[i] = v.max;
		});
		ret.humidity.forEach((v, i) => {
			g_humidity_data_x_daily[i] = v.date.slice(5, 10);
			g_humidity_data_y_daily[i] = parseInt(v.avg * 100);
		});
		ret.precipitation.forEach((v, i) => {
			g_precipitation_data_x_daily[i] = v.date.slice(5, 10);
			g_precipitation_data_y_daily[i] = v.probability;
		});
		ret.air_quality.aqi.forEach((v, i) => {
			g_airquality_data_x_daily[i] = v.date.slice(5, 10);
			g_airquality_data_y_daily[i] = v.avg.chn;
		});
		ret.air_quality.pm25.forEach((v, i) => {
			g_aqicomponents_data_x_daily[i] = v.date.slice(5, 10);
			g_aqicomponents_data_y_pm25_daily[i] = v.avg;
		});
		// 显示图表的同时将各图表标题设为可见
		Array.from(document.getElementsByClassName("div-heading"))
				       .forEach(v => v.style.display = "block");
		// 默认展示15日数据
		switch_view();
	});
	// 获取24时天气数据
	get_weather_hourly(g_location.longitude,
			   g_location.latitude).then(ret => {
		// 若失败，弹窗返回
		if (!ret)
			return alert("24时天气信息获取失败。");
		// 显示当前天气描述
		document.getElementById("description-div").innerText =
								ret.description;
		// 初始化24时对应的X/Y轴数据
		ret.skycon.forEach((v, i) => {
			g_skycon_data_x_hourly[i] = v.datetime.slice(11, 16);
			g_skycon_data_y_hourly[i] = to_skycon(v.value);
		});
		ret.temperature.forEach((v, i) => {
			g_temperature_data_x_hourly[i] =
						       v.datetime.slice(11, 16);
			g_temperature_data_y_hourly[i] = v.value;
		});
		ret.humidity.forEach((v, i) => {
			g_humidity_data_x_hourly[i] = v.datetime.slice(11, 16);
			g_humidity_data_y_hourly[i] = parseInt(v.value * 100);
		});
		ret.precipitation.forEach((v, i) => {
			g_precipitation_data_x_hourly[i] =
						       v.datetime.slice(11, 16);
			g_precipitation_data_y_hourly[i] = v.probability;
		});
		ret.airQuality.aqi.forEach((v, i) => {
			g_airquality_data_x_hourly[i] =
						       v.datetime.slice(11, 16);
			g_airquality_data_y_hourly[i] = v.value.chn;
		});
		ret.airQuality.pm25.forEach((v, i) => {
			g_aqicomponents_data_x_hourly[i] =
						       v.datetime.slice(11, 16);
			g_aqicomponents_data_y_pm25_hourly[i] = v.value;
		});
		// 将切换15日/24时的按钮设为可见
		document.getElementById("switch-view-div").style.display =
									"block";
		// 切换城市按钮在第一次加载后显示，但之后不再隐藏
		document.getElementById("switch-city-div").style.display =
									"block";
	});
}

// 获取版本信息并显示在底栏
get("haze/get_version").then(ret => {
	document.getElementById("footer-link-a").innerText =
						   `Haze Analytics ${ret.text}`;
});

Object.assign(g_location, JSON.parse(localStorage.getItem("location") || "{}"));
// 若上次的位置非手动设置，则获取定位
if (!g_location.force)
	locate_city().then(init_view);
else
	init_view();