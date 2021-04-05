<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			let id = Math.random() > 0.5 ? Date.now() : undefined;
			this.$http
				.post(
					'/api/user/update', {
						id: id
					}, {
						custom: {
							auth: true
						},
						params: {
							username: 'luch',
							email: Date.now() + '-------webwork.s@qq.com',
							address: Date.now() + '-------https://quanzhan.co'
						},
						header: {
							custom: 66
						},
						getTask: (task, options) => {
							setTimeout(() => {
								task.abort();
							}, 1000);
							console.log(task);
							console.log(options);
						}
					}
				)
				.then(res => {
					console.log('全局http 更新用户信息 post success----期望custom 含有custom: 66');
					console.log(res);
				})
				.catch(err => {
					console.log('全局http 更新用户信息 post fail----');
					console.log(err);
				});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import '@/common/css/weui.css'

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
</style>
