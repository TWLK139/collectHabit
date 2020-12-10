<template>
	<view>
		<view class="console">
			<view class="console_for" v-for="(d, i) in input_data" :key="i">
				<view class="console_view">{{ d.time }}</view>
				<view class="console_view">{{ d.value }}</view>
			</view>
		</view>
		<view class="console">
			<view class="console_for">
				<view class="console_view">请参照下文输入：</view>
			</view>
			<view class="console_for">
				<view class="console_view">不忘初心，方得始终。中国共产党人的初心和使命，就是为中国人民谋幸福，为中华民族谋复兴。这个初心和使命是激励中国共产党人不断前进的根本动力。全党同志一定要永远与人民同呼吸、共命运、心连心，永远把人民对美好生活的向往作为奋斗目标，以永不懈怠的精神状态和一往无前的奋斗姿态，继续朝着实现中华民族伟大复兴的宏伟目标奋勇前进。</view>
			</view>
			<view class="console_for">
				<view class="console_view">同志们！改革开放之初，我们党发出了走自己的路、建设中国特色社会主义的伟大号召。从那时以来，我们党团结带领全国各族人民不懈奋斗，推动我国经济实力、科技实力、国防实力、综合国力进入世界前列，推动我国国际地位实现前所未有的提升，党的面貌、国家的面貌、人民的面貌、军队的面貌、中华民族的面貌发生了前所未有的变化，中华民族正以崭新姿态屹立于世界的东方。</view>
			</view>
		</view>
		<textarea id="getInput" placeholder="请在这里输入文字" @input="getInput"></textarea>
		<view class="submit name">当前用户：{{ name }}</view>
		<view class="submit" @click="submit">点击提交训练数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeOut: null,
				name: "",
				input_data: [],
				hold_data_acc: [],
				hold_data_com: []
			}
		},
		onLoad() {
			this.name = uni.getStorageSync('name');
			setTimeout(() => {
				this.getHold();
			}, 2000)
			this.timeOut = setTimeout(() => {
				this.stopHold();
			}, 300000);
		},
		onBackPress() {
			this.stopHold();
		},
		methods: {
			getInput(e) {
				let tem = {};
				tem.time = (new Date()).valueOf();
				tem.value = e.detail.value;
				tem.cursor = e.detail.cursor;
				tem.value = tem.value.replace(/\n/g, '@')

				if (this.input_data.length > 0 && tem.cursor == this.input_data[this.input_data.length - 1].cursor) {
					this.input_data.pop();
				}
				if (this.input_data.length > 0) {
					if (tem.cursor > this.input_data[this.input_data.length - 1].cursor) {
						tem.value = tem.value.substr(this.input_data[this.input_data.length - 1].cursor);
					} else if (tem.cursor == this.input_data[this.input_data.length - 1].cursor) {
						tem.value = null;
					} else if (tem.cursor < this.input_data[this.input_data.length - 1].cursor) {
						tem.value = '\r';
					}
				}
				this.input_data.push(tem);
			},
			submit() {
				this.stopHold();
				this.submit_data('input', this.input_data, this.submit_hold());
				// this.submit_hold();
			},
			getHold() {
				uni.onAccelerometerChange((res) => {
					let tem = {};
					tem.time = (new Date()).valueOf();
					tem.x = res.x;
					tem.y = res.y;
					tem.z = res.z;

					this.hold_data_acc.push(tem);
				});
				uni.onCompassChange((res) => {
					let tem = {};
					tem.time = (new Date()).valueOf();
					tem.direction = res.direction;

					this.hold_data_com.push(tem);
				});
			},
			stopHold() {
				clearTimeout(this.timeOut);
				uni.stopAccelerometer();
				uni.stopCompass();
			},
			submit_hold() {
				let all = [];
				for (let i = 0; i < this.hold_data_acc.length && this.hold_data_com.length; i++) {
					let tem = {}
					tem.time1 = this.hold_data_acc[i].time;
					tem.x = this.hold_data_acc[i].x;
					tem.y = this.hold_data_acc[i].y;
					tem.z = this.hold_data_acc[i].z;
					tem.time2 = this.hold_data_com[i].time;
					tem.direction = this.hold_data_com[i].direction;

					all.push(tem);
				}
				this.submit_data('hold_input', all);
			}
		}
	}
</script>

<style>
	@import url("../all.css");

	#getInput {
		width: 720upx;
		height: 400upx;
		padding: 10upx;
		margin: 100upx 0;
		background-color: #cce6d4;
		border: #4CD964 5upx solid;
	}
</style>
