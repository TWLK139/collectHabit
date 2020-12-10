import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.serverUrl = "http://123.57.21.237:8090/savedata";

Vue.prototype.getDataStr = function(data) {
	let str = '';
	let name = uni.getStorageSync('name');

	for (let i = 0; i < data.length; i++) {
		Object.keys(data[i]).forEach(function(key) {
			str = str + data[i][key] + ',';
		});
		str = str + name + '\n';
	}
	
	return str;
}

Vue.prototype.submit_data = function(type, data, other) {
	uni.showLoading({
		title:'提交中……'
	})
	uni.request({
		url: this.serverUrl,
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: {
			type: type,
			data: this.getDataStr(data)
		},
		success: (res) => {
			uni.hideLoading();
			if (res.data == 0) {
				uni.showToast({
					title: '提交成功！'
				})
			} else {
				uni.showToast({
					title: '失败！'
				})
			}
		},
		fail: (res) => {
			uni.hideLoading();
			uni.showToast({
				title: '失败！'
			})
		},
		complete: (res) => {
			if(typeof other === "function") {
				other();
			}
		}
	})
}

const app = new Vue({
	...App
})
app.$mount()
