<template>
	<view class="content">
		<!-- <view class="tui-picker-content">
			<view class="tui-picker-name">时间选择器（选择时分）</view>
			<picker mode="time" value="{{time}}" start="09:00" end="17:30" bindchange="changeTime">
				<view class="tui-picker-detail">
					午饭时间: {{time}}
				</view>
			</picker>
		</view>

		<view class="tui-picker-content">
			<view class="tui-picker-name">日期选择器（选择年月日）</view>
			<picker mode="date" value="{{date}}" start="2017-10-01" end="2017-10-08" bindchange="changeDate">
				<view class="tui-picker-detail">
					国庆出游: {{date}}
				</view>
			</picker>
		</view>

		<view class="tui-picker-content">
			<view class="tui-picker-name">日期时间选择器（精确到秒）</view>
			<picker mode="multiSelector" value="{{dateTime}}" bindchange="changeDateTime" bindcolumnchange="changeDateTimeColumn"
			 range="{{dateTimeArray}}">
				<view class="tui-picker-detail">
					选择日期时间: {{dateTimeArray[0][dateTime[0]]}}-{{dateTimeArray[1][dateTime[1]]}}-{{dateTimeArray[2][dateTime[2]]}}
					{{dateTimeArray[3][dateTime[3]]}}:{{dateTimeArray[4][dateTime[4]]}}:{{dateTimeArray[5][dateTime[5]]}}
				</view>
			</picker>
		</view> -->
		<view class="tui-picker-content">
			<!-- <view class="tui-picker-name">日期时间选择器（精确到分）</view> -->
			<picker mode="multiSelector" :value="dateTime1" @change="changeDateTime1" @columnchange="changeDateTimeColumn1"
			 range="dateTimeArray1">
				<view class="tui-picker-detail">
					{{dateTimeArray1[0][dateTime1[0]]}}-{{dateTimeArray1[1][dateTime1[1]]}}-{{dateTimeArray1[2][dateTime1[2]]}}
					{{dateTimeArray1[3][dateTime1[3]]}}:{{dateTimeArray1[4][dateTime1[4]]}}
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	var dateTimePicker = require('../src/utils/date.js')
	export default {
		data() {
			return {
				dateTimeArray1: null,
				dateTime1: null,
				startYear: 2000,
				endYear: 2040
			}
		},
		onLoad() {
			// 获取完整的年月日 时分秒，以及默认显示的数组
			var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
			// 精确到分的处理，将数组的秒去掉
			var lastArray = obj1.dateTimeArray.pop();
			var lastTime = obj1.dateTime.pop();
			this.dateTime = obj.dateTime
			this.dateTimeArray = obj.dateTimeArray
			this.dateTimeArray1 = obj1.dateTimeArray
			this.dateTime1 = obj1.dateTime
		},
		methods: {
			changeDateTime1(e) {
				this.dateTime1 = e.detail.value
			},
			changeDateTimeColumn1(e) {
				var arr = this.data.dateTime1
				dateArr = this.data.dateTimeArray1;
				arr[e.detail.column] = e.detail.value;
				dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
				this.dateTimeArray1 = dateArr
				this.dateTime1 = arr
			}
		}
	}
</script>

<style>
</style>
