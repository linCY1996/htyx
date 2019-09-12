<template>
	<view class='refreshBox' :style="isTranform">
		<view class='refresh' :class="isEnd==2?'animationSmall':''">
			<view class='refreshCirle' :style="isRotate" v-if="isEnd == 0"></view>
			<view class='refreshCirle animation' v-if="isEnd == 1"></view>
			<image class='iconYes' src='/static/icon-yes.png' v-if="isEnd==2"></image>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		name: 'refresh',
		props: {
			  isRequest: {
				type: Function,
				default: null
			  },
			  cid: String
		},
		data() {
			return {
				isTranf: 0,
				touchStart: '',
				touchMove: '',
				isEnd: 0
			};
		},
		methods: {
			refreshStart(e) {
				if (this.isEnd == 0) {
					this.touchStart = e.changedTouches[0].pageY
				}
			},
			refreshMove(e){
				if (this.isEnd == 0) {
					var touchStart = this.touchStart,
						oldMove = this.touchMove,
						newMove = e.changedTouches[0].pageY
					if (touchStart <= newMove) {
						var isTranf = touchStart > newMove ? 0 : newMove - touchStart
						this.isTranf = isTranf
						this.touchMove = e.changedTouches[0].pageY
					}
				}
			},
			refreshEnd(e) {
				if (this.isEnd == 0) {
					if (this.isTranf >= 90) {
						this.isTranf = 100
						this.isEnd = 1
						this.isRequest().then((res) => {
							this.isEnd = 2
							setTimeout(() => {
								this.isTranf = 0
								this.isEnd = 0
								this.$parent.refresh();
							}, 600)
						})
					} else {
						this.isTranf = 0
					}
				}
			},
			endAfter(){
				this.isEnd = 2
				setTimeout(() => {
					this.isTranf = 0
					this.isEnd = 0
				}, 600)
			}
		},
		computed: {
			isTranform() {
				var isTranf = this.isTranf > 150 ? 150 : this.isTranf
				return `transform: translateY(${isTranf-100}px);`
			},
			isRotate() {
				var rotate = 360 / 100 * this.isTranf
				return `transform: rotate(${rotate}deg);`
			}
		}

	}
</script>

<style lang="scss">
	.refreshBox {
		width: 100%;
		height: 100upx;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		max-height: 300upx;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		transform: translateY(-100upx);
	}

	.animationSmall {
		animation: small 1.1s both;
	}

	@keyframes small {
		0% {
			transform: scale(1)
		}
		20%{
			transform: scale(1.4)
		}
		100% {
			transform: scale(0)
		}
	}

	.refresh {
		width: 50upx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50upx;
		background: #FFFFFF;
		box-shadow: 0 0 16upx 0 rgba(0, 0, 0, 0.10);
		border-radius: 100%;
	}

	.refreshCirle {
		width: 26upx;
		height: 26upx;
		border-radius: 50%;
		display: inline-block;
		position: relative;
		border: 6upx solid black;
		border-bottom-color: transparent;
		border-top-color: transparent;
	}

	.animation {
		animation: rotate 1.1s infinite;
		animation-timing-function: cubic-bezier(0.3, 1.65, 0.7, -0.65);
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.true {
		color: black;
	}

	.iconYes {
		width: 34upx;
		height: 34upx;
	}
</style>
