(function (root, $) {
	if ($ === undefined) {
		window.console && console.error('jQuery libarary is not found');
		return;
	}

	//如果路由生效并且hash为空情况下, 则J_iframe加载的默认页
	var J_iframeDefaultPage = "news.html";

	/**
	 * AJAX全局配置
	 */
	$.ajaxSetup({
		// processData: false,
		xhrFields: {withCredentials: true},
		timeout: 10000,
		async: true,
		beforeSend: function (xhr) {
			if (window.Account && window.Account.token) {
				// console.log("token:",window.Account.token)
				xhr.setRequestHeader('authentication', window.Account.token);
			}
		},
		// complete: function() {
		// 	console.group("")
		// 	console.log("api:", this.url.slice(this.url.indexOf("171")+8, this.url.indexOf("?")))
		// 	console.log("token:", window.Account && window.Account.token ? window.Account.token : "")
		// 	console.groupEnd()
		// }
	});

	/**
	 * 设置路由, 并加载J_iframe中的页面
	 */
	$(function() {
		var loadDefaultPage = function() {
			if(window.top.location.hash === "") {
				window.top.location.hash = "#/" + J_iframeDefaultPage;
			}
		};
		if($.type(window.Router) === "function") {

			var router = new Router();

			router.on("/*", function(param) {
				if(window.top === window) {
					if(location.hash !== "" && location.hash !== "#") {
						var subpageHash = location.hash,
							subpage = subpageHash.slice(1),
							localPath = location.pathname.split("/").slice(0, -1).join("/"),
							iframeSrc = localPath + subpage;
						$("#J_iframe").attr("src", iframeSrc);
					} else {
						loadDefaultPage();
					}
				} else {
					var hash;
					if(location.hash === "") {
						hash = "#/" + location.pathname.split("/").pop();
					} else {
						hash = location.hash;
					}

					console.log("++", window.top.location.hash, window.location.hash)
					window.top.location.hash = hash;
				}
			});

			router.init();

			//加载默认页或路由指向的页面
			if(window.top === window) {
				loadDefaultPage();
			}

		}
	});

	/**
	 * 错误处理
	 */
	root.Error = function () {
	};
	root.Error.prototype = {
		constructor: Error,
		unknownType: false, //遇到未定义的错误类型时则变为true

		/**
		 * 新增错误类型以及处理方法
		 * @param {Object} handle {"errorType": callback}
		 */
		newHandle: function (handle) {
			if(Object.prototype.toString.call(handle) !== "[object Object]") {
				return;
			}
			for(var key in handle) {
				if(key !== "" && handle.hasOwnProperty(key)) {
					this[key] = handle[key];
				}
			}
			return this;
		},

		/**
		 * 错误处理
		 * 用法: e.listen(type,args1,args2...)
		 * @param {String} t 错误类型
		 */
		listen: function (t) {
			// console.log("%cError.code[" + t + "]:", "color:#0a14ce;font-size:14px;font-weight:bolder;");
			if(typeof this[t] === "function") {
				this[t].apply(this, Array.prototype.slice.call(arguments, 1));
				this[t]();
				this.unknownType = false;
				return this;
			}
			this.unknownType = true;
			return this;
		},

		/**
		 * 错误类型未被定义时执行回调函数
		 */
		not: function (cb) {
			if(this.unknownType && typeof cb === "function") {
				cb();
			}
			this.unknownType = false;
			return this;
		},

		"0": function () {
			var title= $.trim(arguments[0]);
			var text = $.trim(arguments[1]);
			if(window.swal && (title !== "" || text !== "")) {
				window.swal({
					title: title,
					text: text,
					icon: "warning"
				});
			}
		},

		"-1": function () {
			window.swal && window.swal({
				title: "服务器繁忙，请稍后重试！",
				icon: "warning", //兼容新版本的弹窗
				type: "warning"
			});
		},
		//没有访问权限
		"502": function () {
			var tip = "没有访问权限!";
			try {
				window.top.swal(
					{
						title: tip,
						type: "warning"
					},
					logout
				);
			} catch(e) {
				alert(tip);
			}
		},
		//token是空的
		"503": function () {
			var tip = "Token无效, 请重新登录!";
			try {
				window.top.swal(
					{
						title: tip,
						type: "warning"
					},
					logout
				);
			} catch(e) {
				alert(tip);
				logout();
			}
		},
		//无效的token(其他pc端登录同一个账号或token过期)
		"504": function () {
			var tip = "你的账号在其它地方登陆,如果不是本人操作,请及时修改密码!";
			try {
				window.top.swal(
					{
						title: "下线提醒",
						text: tip,
						type: "warning"
					},
					logout
				);
			} catch(e) {
				alert(tip);
				logout();
			}
		}
	};

	//退出登录
	function logout () {
		window.top.Account = window.Account = null;
		window.top.sessionStorage.clear();
		window.top.location.reload();
	};

	/**
	 * 获取子前页面的标题, 并将其传递到父页面
	 */
	if (window.parent != window.self && typeof window.parent.setNavText === "function") {
		var el = document.getElementsByTagName("title");
		if (typeof el[0].innerHTML) {
			window.parent.setNavText(el[0].innerHTML);
		} else if (typeof el[0].textContent) {
			window.parent.setNavText(el[0].textContent);
		} else {
			window.parent.setNavText("");
		}
	}

})(this, this.jQuery);