<template>
	<view>
		<view class="console">
			<view class="console_for" v-for="(d, i) in hold_data_acc" :key="i">
				<view class="console_view">{{ d.time }}</view>
				<view class="console_view">{{ d.x.toFixed(2) }}</view>
				<view class="console_view">{{ d.y.toFixed(2) }}</view>
				<view class="console_view">{{ d.z.toFixed(2) }}</view>
			</view>
		</view>
		<view class="console">
			<view class="console_for" v-for="(d, i) in hold_data_com" :key="i">
				<view class="console_view">{{ d.time }}</view>
				<view class="console_view">{{ d.direction }}</view>
			</view>
		</view>
		<view id="getHold">
			<video src="../../static/1.mp4" style="width: 100%;" @play="video_start" @pause="video_end" @ended="video_end">
			</video>
		</view>
		<view class="submit name" style="margin-top:0;">当前用户：{{ name }}</view>
		<view class="submit" @click="submit_hold()">点击提交训练数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "",
				hold_data_acc: [],
				hold_data_com: []
			}
		},
		onLoad() {
			this.name = uni.getStorageSync('name');
		},
		onBackPress() {
			this.stopHold();
		},
		methods: {
			video_start() {
				this.getHold();
			},
			video_end() {
				this.stopHold();
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
				
				this.submit_data('hold', all);
			}
		}
	}
</script>

<style>
	@import url("../all.css");

	#getHold {
		width: 720upx;
		height: 470upx;
		padding: 10upx;
		margin: 100upx 0;
		background-color: #cce6d4;
		border: #4CD964 5upx solid;
	}
</style>
