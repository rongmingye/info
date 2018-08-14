function Router () {

	this.cache = {};

	/**
	 * 监听路由及其改变时的回调函数
	 * @param  {String}   glob     匹配模式
	 * @param  {Function} callback 回调函数
	 */
	this.on = function(glob, callback) {
		this.cache[glob] = callback;
	};

	this.trigger = function(hashString) {
		var _this = this;
		for(var glob in _this.cache) {
			var reg = _this.initRegexps(glob);

			//hashData[0]: 提取hash值的uri
			//hashData[1]: 提取hash值的参数部分
			var hashData = hashString.slice(1).split("?");
			//匹配路由,并执行相应的回调
			if(reg.test(hashData[0])) {
				var callback = _this.cache[glob];
				if($.type(callback) === "function") {
					callback.call(_this, hashData[1]);
				}
			}
		}
	};

	//初始化 添加监听浏览器hashchange 以及dom loaded函数
	this.init = function () {
		var _this = this;
		$(window).on("load hashchange", function(ev) {
			// if(window.top !== window) {
			// 	ev.preventDefault();
			// }
			_this.trigger(location.hash);
		});
	};

	/**
	 * 将cache内的key 做正则处理,并返回
	 * 第一个正则 匹配诸如/,.+-?$#{}[]] 关键字 并在关键字前面加转译字符\
	 * 第二个正则 匹配() 标示()内部内容可有可无
	 * 第三个正则 匹配: 在/后面可以由接受任意字符,直到遇到下一个/
	 * 第四个正则 匹配* 在*后面可以由接受任意字符
	 */
	this.initRegexps = function (route) {
		route = route.replace(/[/,.+\-?$#{}\[\]]/g, '\\$&')
			.replace(/\((.*?)\)/g, '(?:$1)?')
			.replace(/(\/\w?:\w+)+/g, '\/([^/]+)')
			.replace(/\*\w*/g, '([^?]*?)');

		return new RegExp('^' + route + '$');
	};
}