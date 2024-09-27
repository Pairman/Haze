/**
 * util.js - 基本函数
 */

/**
 * 断言
 * @param cond 条件
 * @param msg 错误信息
 */
function assert(cond, msg) {
	if (!cond)
		throw new Error(msg || "Assertion failed.");
}

/**
 * GET请求（Fetch API的包装）
 * @param url URL
 * @param params 参数
 * @returns 请求体
 */
async function get(url = "", params = {}) {
	if (Object.keys(params).length)
		url = `${url}?${new URLSearchParams(params).toString()}`;
	let status_code = 404, text = "";
	try {
		let res = await fetch(url);
		[status_code, text] = [res.status, await res.text()];
	} catch (err) {}
	return {
		status_code,
		text,
		json: () => {
			try {
				return JSON.parse(text);
			} catch (e) {
				return null;
			}
		}
	};
}

/**
 * 为元素设置点击冷却
 * @param e_id 元素ID
 * @param ms 冷却时间
 */
async function onclick_cooldown(e_id, ms = 1000) {
	let e = document.getElementById(e_id);
	e.style.pointerEvents = "none";
	setTimeout(() => e.style.pointerEvents = "auto", ms);
}