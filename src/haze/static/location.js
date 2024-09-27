/**
 * location.js - 位置相关函数
 */

/**
 * 获取设备定位
 * @returns 成功时返回JSON形式坐标
 */
async function get_location() {
	try {
		let res = await new Promise((resolve, reject) =>
			navigator.geolocation.getCurrentPosition(resolve,
								 reject)
		);
		return {
			longitude: res.coords.longitude,
			latitude: res.coords.latitude
		};
	}
	catch (e) {
		return null;
	}
}

/**
 * 获取坐标对应地址
 * @param address 地址
 * @returns 成功时返回JSON形式坐标
 */
async function to_location(address = "Xianyang") {
	try {
		let res = await get(`location/location`, {
			address: address,
			host: g_host
		});
		assert(res.status_code == 200);
		let data = res.json().data;
		assert(data && Object.keys(data).length);
		return data.location;
	}
	catch (e) {
		return null;
	};
}

/**
 * 获取坐标对应地址
 * @param longitude 经度
 * @param latitude 纬度
 * @returns 成功时返回JSON形式的城市名和地址
 */
async function to_address(longitude = 108.68, latitude = 34.33) {
	try {
		let res = await get(`location/address`, {
			longitude: longitude,
			latitude: latitude,
			host: g_host
		});
		assert(res.status_code == 200);
		let data = res.json().data;
		assert(data && Object.keys(data).length);
		return {
			city: data.addressComponent.district ||
			      data.addressComponent.city,
			address: data.formattedAddress
		};
	}
	catch (e) {
		return null;
	};
}