//REVIEW
var REG_IMAGE_TYPE = new RegExp('^image/png|image/jpg|image/jpeg$');
var BROWSER_FIREFOX = /firefox/.test(navigator.userAgent.toLowerCase());
var BROWSER_SAFARI = /safari/.test(navigator.userAgent.toLowerCase());
var BROWSER_IE = /mozilla/.test(navigator.userAgent.toLowerCase()) && !BROWSER_FIREFOX;
var BROWSER_CHROME = /chrome/.test(navigator.userAgent.toLowerCase()) && !BROWSER_FIREFOX;
var IPAD = /ipad/.test(navigator.userAgent.toLowerCase()) && !BROWSER_FIREFOX;
var iphone = /iphone/.test(navigator.userAgent.toLowerCase()) && !BROWSER_FIREFOX;

var KEYCODE_ENTER = 13;
var KEYCODE_ESC = 27;

var base_url = $('meta[name="url"]').attr('content');
var viewer_url = $('meta[name="viewer_url"]').attr('content');
var app_url = $('meta[name="app_url"]').attr('content');
var stats_url = $('meta[name="stats_url"]').attr('content');
var user_url = $('meta[name="user_url"]').attr('content');
var INDEX_CHILD = 2;
var INDEX_PARENT = 1;
var project_key = (typeof ($('meta[name="key"]').attr('content')) == "undefined") ? 'app' : $('meta[name="key"]').attr('content');
var request = base_url + project_key + '/';// dt/

var STATUS_SUCCESS = 1;
var STATUS_FAIL = -1;

var YES = 2;
var NO = 1;
var code_cn = {
    'STATUS_SUCCESS': '1',
    'STATUS_FAIL': '-1',
    'STATUS_LOGINED': '11',
    'STATUS_UNLOGINED': '10',
    'STATUS_SETED': '12',
    'STATUS_UNSETED': '13',
    'PASSWORD_INPUT_NULL': '1099',
    'PASSWORD_INPUT_INVALID': '1100',
    'PASSWORD_CONTINUITY_ERROR': '1150',
    'PASSWORD_DIFF_ERROR': '1151',
    'ACCOUNT_INPUT_NULL': '1101',
    'ACCOUNT_NOT_EXCIST': '1103',
    'ACCOUNT_EXCIST': '1104',
    'VERIFICATION_CODE_INCORRECT': '1105',
    'VERIFICATION_CODE_NULL': '1107',
    'ACCOUNT_INPUT_INVALID': '1110',
    'VERIFICATION_PASSWORD_ACCOUNT': '1110',
    'VERIFICATION_VERIFY': '1111',
    'AGREEMENT_UNCHECKED': '1112',
    'sv_m_001': '请填写您的{0}！',
    'sv_m_002': '请输入有效的手机号码！ ',
    'sv_m_003': '报名成功! ',
    'sv_m_004': '已经报过名了 ',
    'sv_m_005': '活动已下线 ',
    'sv_m_006': '报名人数已满 ',
    'sv_m_007': '活动已结束 ',
    'sv_m_008': '报名未开始 ',
    'sv_m_009': '报名已结束 '
};

(function ($) {
    var methods = {
        display: function (a) {
            if (typeof a == 'undefined') return this.css('display');
            this.css('display', a);
        },
        visible: function (bool) {
            this.css('visibility', bool ? 'visible' : 'hidden');
        },
        //set or get img property src
        src: function (src) {
            if (typeof src === 'undefined') return this.attr('src');
            this.attr('src', src);
        },
        //find the property of the node which specified by prefix 'data-'
        key: function (key, val) {
            if (typeof val === 'undefined') {
                return this.attr('data-' + key);
            } else {
                this.attr('data-' + key, val);
            }
        },
        disabled: function (b) {
            if (b) {
                this.attr('disabled', true);
                this.addClass('disabled');
            } else {
                this.removeAttr('disabled');
                this.removeClass('disabled');
            }

            return this;
        },
        error: function () {
            this.addClass('error-input');

            return this;
        }
    };
    $.fn.extend(methods);
})(jQuery);

var browser = {
    versions: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        var sUserAgent = navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1,
            presto: u.indexOf('Presto') > -1,
            isChrome: u.indexOf("chrome") > -1,
            isSafari: !u.indexOf("chrome") > -1 && (/webkit|khtml/).test(u),
            isSafari3: !u.indexOf("chrome") > -1 && (/webkit|khtml/).test(u) && u.indexOf('webkit/5') != -1,
            webKit: u.indexOf('AppleWebKit') > -1,
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            iPhone: u.indexOf('iPhone') > -1,
            iPad: u.indexOf('iPad') > -1,
            iWinPhone: u.indexOf('Windows Phone') > -1
        };
    }()
}

//js如何判断用户是否是用微信浏览器
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

//js如何判断用户是否是小程序
function isMinProgram() {
    var ua = window.navigator.userAgent.toLowerCase();
    console.log(ua);
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {//说明不在微信中
        wx.miniProgram.getEnv(function (res) {
            if (res.miniprogram) {
                // 走在小程序的逻辑
                console.log('小程序');
            } else {
                // 走不在小程序的逻辑
                console.log('不走小程序');
            }
        })
    } else {
        // 走不在小程序的逻辑
        console.log('不在微信中');
    }
}

//判断是是否是移动设备上的浏览器
function isPhone() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return 1;
    } else {
        return 0;
    }
}

function empty(v) {
    if (v == '' || v == undefined || v == 'undefined' || !v) return true;
    else
        return false;
}

//半路径参数
function locate(address, type) {

    if (empty(address)) return;

    //定制开发，制定导航页
    if ("undefined" != typeof _defaultSelect && !empty(_defaultSelect)) {
        select = _defaultSelect
    }

    if (!empty(select)) {
        var reg = /s=(\d{1})/;
        if (!reg.test(address)) {
            if (address.indexOf("?") != -1) {
                address = address + "&s=" + select;
            } else {
                address = address + "?s=" + select;
            }
        }
    }

    //课程
    if ("undefined" != typeof course_id && !empty(course_id)) {
        var reg = /course=(\w)/;
        if (!reg.test(course_id)) {
            if (address.indexOf("?") != -1) {
                address = address + "&course=" + course_id;
            } else {
                address = address + "?course=" + course_id;
            }
        }
    }
    //微库
    if ("undefined" != typeof lib_id && !empty(lib_id)) {
        var reg = /lib=(\w)/;
        if (!reg.test(address)) {
            if ("undefined" != typeof _pageId && !empty(_pageId) && address.indexOf("page=") == -1) {
                address = address + "&page=" + _pageId;
            }
            if (address.indexOf("?") != -1) {
                address = address + "&lib=" + lib_id;
            } else {
                address = address + "?lib=" + lib_id;
            }
            if ("undefined" != typeof _subLibId && !empty(_subLibId)) {
                address = address + "&subId=" + _subLibId;
            }
        }
    }

    if (address.indexOf("{entprs_id}") > 0) {
        var selEnterprise;
        try {
            selEnterprise = jsonDecode(getLocalData(getLocalStorageMyEpSelEpKey()));
        } catch (e) {

        }
        entprs_id = 0;
        if (!empty(selEnterprise)) {
            entprs_id = selEnterprise['org_id']
        }
        address = address.replace("{entprs_id}", "&e_id=" + entprs_id);
    }

    var open_url = '';
    if (address.indexOf("{1}") > 0) {
        if (empty(app_id)) return;
        open_url = request + address.replace("{1}", app_id);
    } else {
        open_url = request + address;
    }

    if (open_url.indexOf("{nv}") > 0 && !empty(nv)) {
        open_url = open_url.replace("{nv}", nv);
    }

    if (empty(type)) {
        window.location = open_url;
    } else if (type == '_blank') {
        window.open(open_url);
    }
}

function isLocalWeb(address) {
    if (address.indexOf(base_url) != -1) {
        return true;
    } else {
        return false;
    }
}

//全路径参数
function locate_2(address, type) {
    if (empty(address)) return;

    if (isLocalWeb(address)) {
        if (!empty(select)) {
            var reg = /s=(\d{1})/;
            if (!reg.test(address)) {
                if (address.indexOf("?") != -1) {
                    address = address + "&s=" + select;
                } else {
                    address = address + "?s=" + select;
                }
            }
        }
    }
    locate_3_direct(address, type);
}

function locate_3_direct(address, type) {
    if (empty(app_id)) return;
    if (address.indexOf("{1}") > 0) {
        address = address.replace("{1}", app_id);
    }

    if (address.indexOf("{nv}") > 0 && !empty(nv)) {
        address = address.replace("{nv}", nv);
    }

    if (empty(type)) {
        window.location = address;
    } else if (type == '_blank') {
        window.open(address);
    }
}

/**
 * url 目标url
 * arg 需要替换的参数名称
 * arg_val 替换后的参数的值
 * return url 参数替换后的url
 */
function changeURLArg(url, arg, arg_val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
    return url + '\n' + arg + '\n' + arg_val;
}

function locate_3(address, target) {
    if (empty(app_id)) return;
    if (address.indexOf("{1}") > 0) {
        address = address.replace("{1}", app_id);
    }
    if (address.indexOf("{nv}") > 0 && !empty(nv)) {
        open_url = address.replace("{nv}", nv);
    }
    if (!empty(target)) {
        address = address.replace("&a=a&", "&target=_blank&");
    } else {
        window.location = address;
    }
}

function locate_3_open(address) {
    if (empty(app_id)) return;
    if (address.indexOf("{1}") > 0) {
        address = address.replace("{1}", app_id);
    }
    redirect_obj.location.href = address;
}

function locate_4(address, type) {
    if (empty(address)) return;
    if (address.startWith('http://') || address.startWith('https://')) {
        locate_3_direct(address, type);
    } else {
        locate(address, type);
    }
}

function joinByComma(array) {
    return array.join(',');
}

function jsonDecode(str) {
    var json_date = {};
    try {
        json_date = JSON.parse(str)
    } catch (e) {
    }
    return json_date;
}

function jsonEncode(str) {
    return JSON.stringify(str);
}

function getMessage(key) {
    return code_cn[key];
}

function HTMLEncode(html) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
}

function inArray(param, array) {
    if ($.inArray(param, array) !== -1) {
        return true;
    } else {
        return false;
    }
}

function checkLogin(is_logined, ismobile, loginTarget) {

    if (is_logined == '1') {
        //登录中
        locate(loginTarget);
    } else {
        //未登录
        if (typeof is_orgAutoLogin === 'undefined' || !is_orgAutoLogin) {//机构会员ip登录不自动弹登录窗口
            if (ismobile) {
                locate('cm/mlogin?s_id={1}');
            } else {
                login(0);
            }
        } else if (is_orgAutoLogin) {
            show_org_auto_login_pop();
        }

    }
}

function later(fn, delay) {
    if (typeof delay === 'undefined') delay = 1500;
    setTimeout(fn, delay);
}

//返回【兼容ios，android】
var goback = function (system, url) {
    if (!empty(system)) {
        if (system == '1') {
            window.webkit.messageHandlers.closeWebPage.postMessage(null); //ios
        } else if (system == '2') {
            window.CourseWebInterface.closeWebPage();  //android
        } else {
            if (!empty(url)) {
                locate_3(url);
            } else {
                window.history.back();
            }
        }
    } else {
        window.history.back();
    }
};

function htmlEscape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
};
String.prototype.endWith = function (str) {
    var reg = new RegExp(str + "$");
    return reg.test(this);
};

function arrToJSON(arr) {
    var json = {};
    for (var i in arr) {
        var vo = arr[i];
        if (typeof arr[i] == "object") {
            json[i] = {};
            json[i] = arrToJSON(vo);
        } else {
            json[i] = vo;
        }
    }
    return JSON.stringify(json);
}

function getCookie(key) {
    var cook_val = $.cookie(key);
    if (empty(cook_val)) {
        return cook_val;
    } else {
        return jsonDecode(cook_val);
    }
}

function setCookie(key, val, time, path) {
    if (empty(path)) {
        path = '/';
    }
    var cook_val = jsonEncode(val);
    $.cookie(key, cook_val, {expires: time, path: path});
}


function HTMLDecode(text) {
    var temp = document.createElement("div");
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}

function time() {
    var timestamp = Date.parse(new Date());
    return timestamp / 1000;
}

//格式化时间戳
function formatDate(time, format) {
    if (empty(format)) {
        format = 'YY-MM-DD hh:mm'
    }
    var date = new Date(time * 1000);
    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
        return '0' + index;
    });////开个长度为10的数组 格式为 00 01 02 03
    var newTime = format.replace(/YY/g, year)
        .replace(/MM/g, preArr[month] || month)
        .replace(/DD/g, preArr[day] || day)
        .replace(/hh/g, preArr[hour] || hour)
        .replace(/mm/g, preArr[min] || min)
        .replace(/ss/g, preArr[sec] || sec);
    return newTime;
}

/**
 * 根据时间获取星期几的值
 */
function weekdayDate(time, type) {
    var date = new Date(time * 1000);
    var day = date.getDay();
    var weekday = [];
    if (type == 'e') {
        weekday[0] = "Sunday"
        weekday[1] = "Monday"
        weekday[2] = "Tuesday"
        weekday[3] = "Wednesday"
        weekday[4] = "Thursday"
        weekday[5] = "Friday"
        weekday[6] = "Saturday"
        return weekday[day]
    } else if (type == 'h') {
        weekday[0] = "日"
        weekday[1] = "一"
        weekday[2] = "二"
        weekday[3] = "三"
        weekday[4] = "四"
        weekday[5] = "五"
        weekday[6] = "六"
        return weekday[day]
    } else {
        return day;
    }
}

//获取地址url的参数
function getQueryString() {
    var qs = location.search.substr(1), // 获取url中"?"符后的字串
        args = {}, // 保存参数数据的对象
        items = qs.length ? qs.split("&") : [], // 取得每一个参数项,
        item = null,
        len = items.length;

    for (var i = 0; i < len; i++) {
        item = items[i].split("=");
        var name = decodeURIComponent(item[0]),
            value = decodeURIComponent(item[1]);
        if (name) {
            args[name] = value;
        }
    }
    return args;
}

var allowedImage = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

function isImage(type) {
    for (var i = 0; i < allowedImage.length; i++) {
        if (allowedImage[i] == type) return true;
    }
    return false;
}

function fileUpload(params) {
    if (typeof params === 'undefined') params = {};
    var input = params['input'];
    var img = params['img'];
    var url = params['url'];
    var callback = params['callback'];
    var argus = params['params'];
    var formdata = new FormData();
    formdata.append('file', input.files[0]);
    for (var key in argus) {
        formdata.append(key, argus[key]);
    }
    if (img) picturePreview(img, input);
    var xhr = new XMLHttpRequest();
    if (typeof params['progress_fun'] != 'undefined') {
        xhr.upload.addEventListener("progress", params['progress_fun'], false);
    }

    xhr.open('post', url);
    formdata = params.formdata ? params.formdata : formdata;
    xhr.send(formdata);
    xhr.onreadystatechange = function (s) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = xhr.responseText.toString();
            callback(data);
        }
    };
}

//判断字符串 是否是json
function isJson(str) {
    if (empty(str)) {
        return false;
    }
    try {
        if (typeof JSON.parse(str) == "object") {
            return true;
        }
    } catch (e) {
    }
    return false;
}

// 数组相同元素过滤  Repeated filtering
function arrayFilter(arr) {
    if (Array.isArray(arr)) {
        var resultArr;
        //采用filter()方法过滤掉数组中重复的元素,filter()方法中传入一个过滤函数作为参数.
        resultArr = arr.filter(function (item, index, self) {
            //indexOf返回的是arr中的第一个元素的索引值,所以下面语句过滤掉了arr中重复的元素.
            return self.indexOf(item) == index;

        });
        return resultArr; //1,2,3,4,5
    } else {
        return [];
    }
}

function array_remove(array, val) {
    var index = array.indexOf(val);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}

function saveLocalData(dataname, objstr) {
    if (window.localStorage) {
        localStorage.setItem(dataname, objstr);
    } else {
        Cookie.write(dataname, objstr);
    }
}

function getLocalData(dataname) {
    return window.localStorage ? localStorage.getItem(dataname) : Cookie.read(dataname);
}

function delLocalData(dataname) {
    return window.localStorage ? localStorage.removeItem(dataname) : Cookie.delete(dataname);
}

function addHistory(appid, key, words, default_length) {
    var array = jsonDecode(getLocalData(appid + '_' + key));
    if (!empty(array)) {
        array.unshift($.trim(words));
        array = uniqueArray(array);
        if (array.length >= default_length) {
            array.splice(4, array.length - 4);
        }

        saveLocalData(appid + '_' + key, jsonEncode(array));
    } else {
        array = new Array();
        array.push(words);
        saveLocalData(appid + '_' + key, jsonEncode(array));
    }
}

function getHistory(appid, key) {
    return jsonDecode(getLocalData(appid + '_' + key));
}

function uniqueArray(str) {
    var newArr = [],
        i = 0,
        len = str.length;

    for (; i < len; i++) {

        var a = str[i];

        if (newArr.indexOf(a) !== -1) {
            continue;
        } else {
            newArr[newArr.length] = a;
        }
    }
    return newArr;
};

function replaceAll(content, search, replace) {
    var str = content.replace(new RegExp(search, "gm"), replace);
    return str;
}

//删除css文件
function removeCssFile(filename, filetype) {
    //判断文件类型
    var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none";
    //判断文件名
    var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none";
    var allsuspects = document.getElementsByTagName(targetelement);
    //遍历元素， 并删除匹配的元素
    for (var i = allsuspects.length; i >= 0; i--) {
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
            allsuspects[i].parentNode.removeChild(allsuspects[i]);
    }
}

function locate_post(url, params) {
    if (empty(app_id)) return;
    if (url.indexOf("{1}") > 0) {
        url = url.replace("{1}", app_id);
    }

    var form = $("<form method='post'></form>");
    form.attr({"action": url});
    if (!empty(params['target'])) {
        form.attr({"target": "_blank"});
    }
    for (var key in params) {
        var input = $("<input type='hidden'>");
        input.attr({"name": key});
        input.val(params[key]);
        form.append(input);
    }

    $(document.body).append(form);
    form.submit().remove();
}

/*
* 轻应用服务
* 1.添加右上角个人中心
* 2.点击后的登陆、跳转事件
* */
function lAppService() {
    var dom_length = 0;
    try {
        dom_length = $('.light_application').length;
    } catch (e) {
    }
    if (dom_length > 0) {
        var str = '<div class="cx-detail-home check_login"><i class="icon-person"></i>个人中心</div>';
        $('.light_application').append(str);
        $('.check_login').click(function () {
            if (is_Logined == '1') {
                locate('dm/my/{1}?s=4');
            } else {
                if (is_mobile) {
                    location.href = NO_POPUP_BINDUP_GAMEN + '&a_uri=' + window.location.href;
                } else {
                    login(0);
                }
            }
        });

        //个人中心图标拖拽
        var touchStart_y, touchMove_y, boxStartY;
        $('.cx-detail-home').on('touchstart', function (e) {
            // touchStart_x = e.originalEvent.targetTouches[0].pageX;
            touchStart_y = e.originalEvent.targetTouches[0].pageY;
            boxStartY = $(this).position().top - $(window).scrollTop();
        }).on('touchmove', function (e) {
            //禁止微信下拉
            e.preventDefault();
            //禁止左右滑动
            stopBubbling(e);

            // touchMove_x = e.originalEvent.targetTouches[0].pageX - touchStart_x;
            touchMove_y = e.originalEvent.targetTouches[0].pageY - touchStart_y;

            if (boxStartY + touchMove_y < 0) {
                touchMove_y = -boxStartY
            }

            if (boxStartY + touchMove_y + $(this).height() > $(window).height()) {
                touchMove_y = $(window).height() - boxStartY - $(this).height()
            }

            $(this).css({
                // left: boxStartX + touchMove_x,
                top: boxStartY + touchMove_y
            })
        });

        //防止事件重叠
        function stopBubbling(e) {
            e = window.event || e;
            if (e.stopPropagation) {
                e.stopPropagation(); //阻止事件 冒泡传播
            } else {
                e.cancelBubble = true; //ie兼容
            }
        }
    }
}

/**
 * 触发页面关闭事件
 * @param callback
 * @returns {string}
 */
function triggerBeforeUnload(callback) {
    try {
        if (typeof callback === 'undefined' || callback === '') {
            return '';
        }
    } catch (e) {
        console.log('callback is false');
        return '';
    }

    var is_already_exe = 0;
    var eventName = 'unload';
    if (window.addEventListener) {
        window.addEventListener(eventName, function () {
            if (is_already_exe === 0) {
                is_already_exe = 1;
                callback();
            }
        });
    } else {
        //主要是为了兼容老的IE
        if (window.attachEvent) {
            window.attachEvent('on' + eventName, function () {
                if (is_already_exe === 0) {
                    is_already_exe = 1;
                    callback();
                }
            });
        }
    }

    window.onunload = function (ev) {
        if (is_already_exe === 0) {
            is_already_exe = 1;
            callback();
        }
    };
    //页面在触发pagehide
    window.addEventListener('pagehide', function (event) {
        if (is_already_exe === 0) {
            is_already_exe = 1;
            callback();
        }
    });
    window.onpagehide = function () {
        if (is_already_exe === 0) {
            is_already_exe = 1;
            callback();
        }
    };
    window.addEventListener("beforeunload", function (e) {
        if (is_already_exe === 0) {
            is_already_exe = 1;
            callback();
        }
    });

    window.onbeforeunload = function () {
        if (is_already_exe === 0) {
            is_already_exe = 1;
            callback();
        }
    };

    $(window).unload(function () {
        if (is_already_exe === 0) {
            is_already_exe = 1;
            callback();
        }
    });
}

/*
* 通过信标 navigator.sendBeacon 发送数据，如果不成功则使用ajax
*  url  string         地址
*  data json object    数据
* */
function sendNavigatorData(param) {
    var url = '';
    var send_data = {};
    var callback = '';
    try {
        if (typeof param['url'] === 'undefined' || param['url'] === '') {
            return '';
        } else {
            url = param['url'];
        }
        if (typeof param['data'] !== 'undefined' && Object.keys(param['data']).length > 0) {
            send_data = param['data'];
        }
        if (typeof param['success'] === 'function') {
            callback = param['success'];
        }
    } catch (e) {
    }
    var send_res = false;
    if (navigator.sendBeacon) {
        try {
            // 使用 sendBeacon 发送数据，不支持时使用 Ajax 同步发送
            var formData = new FormData();
            $.each(send_data, function (key, val) {
                if (typeof val !== 'undefined' && val !== '') {
                    if (typeof val === 'string') {
                        formData.append(key, val);
                    } else {
                        val = JSON.stringify(val);
                        formData.append(key, val);
                    }
                }
            });
            navigator.sendBeacon(url, formData);
        } catch (e) {
        }
    }
    if (send_res == false) {
        //如果同步请求失败则尝试异步请求
        function fail() {
            $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                data: send_data,
                success: function (reg, textStatus, xhr) {
                    if (textStatus === 'success' && !empty(callback)) {
                        callback(reg);
                    } else {
                        alert('error:page unload fail');
                    }
                }, complete: function (xhr, status) {
                    if (status === 'error') {
                        window.localStorage.setItem('sendNavigatorDataFail', 'status');
                    }
                }
            });
        }

        try {
            $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                data: send_data,
                async: false,
                success: function (reg, textStatus, xhr) {
                    if (textStatus === 'success' && !empty(callback)) {
                        callback(reg);
                    }
                },
                complete: function (xhr, status) {
                    if (status === 'error') {
                        fail();
                    }
                },
                error: function (xhr, status, error) {
                    console.log(xhr, status, error);
                }
            });
        } catch (e) {
            fail()
        }
    }
}

/*
* 监测web页面关闭动作，并发送请求
* param
*   url  string         地址
*   data json object    数据
* 无返回值
* example:
    beforeUnloadSendMsg({
       url:request + "dt/post_test/"+app_id,
       data:{
           name:'silence'
       }
    });
* 注：已做兼容评判。
* */
function beforeUnloadSendMsg(param) {
    try {
        if (typeof param['url'] === 'undefined' || param['url'] === '') {
            return '';
        }
    } catch (e) {
        console.log('param is false');
        return '';
    }

    triggerBeforeUnload(function () {
        var send_data = {};
        try {
            if (typeof param['data'] !== 'undefined' && Object.keys(param['data']).length > 0) {
                send_data = param['data'];
            }
        } catch (e) {
        }
        sendNavigatorData({
            url: param['url'],
            data: send_data
        });
    });
}

var UserAgentObj = {};

function getUserAgent() {
    $.getScript(base_url + 'assets/js/detect.js', function () {
        UserAgentObj = detect.parse(navigator.userAgent);
    });
}

//删除特殊符号
function rmSpecialSymbol(s) {
    if (s === '') {
        return s;
    }
    var pattern = new RegExp("[， 　 。、！!？?：:﹫；】“”【《》（）¡¿﹖…;,.(\")'‘’]");
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        var str = s.substr(i, 1).replace(pattern, '');
        rs = rs + str;
    }
    return rs;
}

/**
 * 双次base64解密
 * @param str
 * @return bool|string
 */
function dbEBase(str) {
    try {
        if (typeof str !== 'undefined' && str !== '' && typeof str !== 'object') {
            if (typeof str !== 'string') {
                str = str.toString();
            }
            return $.base64.btoa($.base64.btoa(str, true), true);
        } else {
            return '';
        }
    } catch (e) {
        return '';
    }
}

/**
 * 双次base64解密
 * @param str
 * @return bool|string
 */
function dbDBase(str) {
    try {
        if (typeof str !== 'undefined' && str !== '') {
            return $.base64.atob($.base64.atob(str, true), true);
        } else {
            return '';
        }
    } catch (e) {
        return '';
    }
}

/**
 * 单词base64加密
 * @param str
 * @return bool|string
 */
function Ebase(str) {
    try {
        if (typeof str !== 'undefined' && str !== '' && typeof str !== 'object') {
            if (typeof str !== 'string') {
                str = str.toString();
            }
            return $.base64.btoa(str, true);
        } else {
            return '';
        }
    } catch (e) {
        return '';
    }
}

/**
 * 单词base64解密
 * @param str
 * @return bool|string
 */
function DBase(str) {
    try {
        if (typeof str !== 'undefined' && str !== '') {
            return $.base64.atob(str, true);
        } else {
            return '';
        }
    } catch (e) {
        return '';
    }
}

/**
 * 检测是否登陆，如果没有登陆则跳转登陆
 * @returns {string|boolean}
 */
function checkLoginGoLogin() {
    if (typeof is_Logined === 'undefined') {
        return false;
    }
    if (empty(is_Logined) || is_Logined == '0') {
        var check_times = 0;
        var login_interval_id = setInterval(function () {
            check_times++
            if (typeof login === 'function' || check_times >= 20) {
                clearInterval(login_interval_id);
                if (is_mobile || check_times >= 20) {
                    //手机端登陆
                    var showUrl = window.location.href;
                    location.href = NO_POPUP_BINDUP_GAMEN + '&a_uri=' + encodeURIComponent(showUrl);
                } else {
                    login(0);
                }
            }
        }, 100);
        return false;
    } else {
        return true;
    }
}

/**
 * 转换回车换行为br标签
 * @param name
 * @returns {*}
 */
function wrapToBr(name) {
    var string = name;
    try {
        string = string.replace(/\r\n/g, "<br>")
        string = string.replace(/\n/g, "<br>");
        string = string.replace(/\r/g, "<br>");
    } catch (e) {
        console.log(e.message);
    }
    return string;
}

/**
 * 将秒数换成时分秒格式
 */
function formatSeconds(value) {
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    if (secondTime >= 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime >= 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    var result = "" + parseInt(secondTime) + "s";

    if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "m" + result;
    }
    if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "h" + result;
    }
    return result;
}

function comSubmit(params, callback) {
    request_url = params['request_url'];
    var enData = new Object();          // enData用来装载加密后的数据
    if (!empty(params['public_key'])) {
        var jsencrypt = new JSEncrypt();
        jsencrypt.setPublicKey(params['public_key']);
        for (var key in params) {
            if (key == 'request_url' || key == 'public_key') continue;
            enData[key] = jsencrypt.encrypt(params[key]);
        }
    } else {
        for (var key in params) {
            if (key == 'request_url' || key == 'public_key') continue;
            enData[key] = params[key];
        }
    }
    $.ajax({
        type: 'post',
        async: false,
        cache: false,
        url: request_url,
        data: enData,
        dataType: 'json',
        success: function (response) {
            callback(response);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('ajaxSubmit fail!')
            alert("系统繁忙稍后在试");
        }
    });
}

//获取--所选企业--key
function getLocalStorageMyEpSelEpKey(uidf) {
    var key = [];
    key.push(app_id);
    key.push(uidf);
    key = key.join('__');
    key = 'ep_' + Ebase(key); // enterprise 所选企业
    return key;
}

//获取--所选企业--key 当时不统一，废弃
function getLocalStorageHeadSelEpKey(uidf) {
    var key = [];
    key.push(app_id);
    key.push(uidf);
    key = key.join('__');
    key = 'ep_' + Ebase(key); // enterprise 所选企业
    return key;
}

/**
 * 将秒数换算成规则的时分秒
 * @param sec
 * @param isShowDays 是否展示年，天的信息，默认不展示
 * @returns {boolean|{hours: number, seconds: number, minutes: number, days: number, years: number}}
 */
function sec2RegularTime(sec) {
    //数字前面补充0
    function padding(num, length) {
        for (var len = (num + "").length; len < length; len = num.length) {
            num = "0" + num;
        }
        return num;
    }

    var isShowDays = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    if (typeof sec === 'undefined' || isNaN(sec) || parseInt(sec) <= 0) {
        return false;
    } else {
        sec = parseInt(sec);
        var value = {
            "years": 0,
            "days": 0,
            "hours": 0,
            "minutes": 0,
            "seconds": 0
        };
        if (isShowDays) {
            if (sec >= 31556926) {
                value["years"] = Math.floor(sec / 31556926);
                sec = (sec % 31556926);
            }
            if (sec >= 86400) {
                value["days"] = Math.floor(sec / 86400);
                sec = (sec % 86400);
            }
        }
        if (sec >= 3600) {
            value["hours"] = Math.floor(sec / 3600);
            sec = (sec % 3600);
        }
        if (sec >= 60) {
            value["minutes"] = Math.floor(sec / 60);
            sec = (sec % 60);
        } else {
            value["minutes"] = '00';
        }
        value["seconds"] = empty(sec) ? '00' : Math.floor(sec);

        for (var key in value) {
            if (key === 'years' && value[key] === 0 && isShowDays === false) {
                delete value[key];
            } else {
                value[key] = padding(value[key], 2);
            }
        }
    }
    return value;
}

function sec2minuteTime(sec) {
    //数字前面补充0
    function padding(num, length) {
        for (var len = (num + "").length; len < length; len = num.length) {
            num = "0" + num;
        }
        return num;
    }

    var minutes = 0;
    var seconds = 0;
    if (sec >= 60) {
        minutes = padding(Math.floor(sec / 60), 2);
        seconds = padding(sec % 60, 2)
    } else {
        minutes = '00';
        seconds = padding(sec, 2)
    }
    return {
        minutes: minutes,
        seconds: seconds
    };
}

/**
 * 检测当页面离开、当前页面失去焦点
 * @param callback
 *
 * 回调方法中返回是否离开了画面的参数
 * true：从当前画面离开了
 * false：返回了当前画面
 */
function listenForUserLeavesOrReturnsEvents(callback) {
    var hiddenPropName;
    var visibilityChangeEventName;
    if (typeof document.hidden !== "undefined") {
        hiddenPropName = "hidden";
        visibilityChangeEventName = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        hiddenPropName = "mozHidden";
        visibilityChangeEventName = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hiddenPropName = "msHidden";
        visibilityChangeEventName = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hiddenPropName = "webkitHidden";
        visibilityChangeEventName = "webkitvisibilitychange";
    }

    document.addEventListener(visibilityChangeEventName, function () {
        if (document[hiddenPropName]) {
            callback(true);
        } else {
            callback(false);
        }
    }, false);

    window.addEventListener('blur', function () {
        callback(true);
    });

    window.addEventListener('focus', function () {
        callback(false);
    });
}

/**
 * 数组乱序
 */
function arrShuffle(v) {
    for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x) ;
    return v;
}


if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target === null || target === undefined) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource !== null && nextSource !== undefined) {
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (valueToFind, fromIndex) {

            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(valueToFind, elementK) is true, return true.
                if (sameValueZero(o[k], valueToFind)) {
                    return true;
                }
                // c. Increase k by 1.
                k++;
            }

            // 8. Return false
            return false;
        }
    });
}

/**
 * 获取字母 ABC…… 通过 123……数字
 */
function getLettersByNum(i) {
    i = parseInt(i);
    return String.fromCharCode(i + 64);
}

/**
 * 当前运行环境是不是ios的webview
 * @returns {boolean}
 */
function isIosWebView() {
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (!isIOS) {
        return false;
    }
    var res = 0;
    try {
        if (typeof window.webkit === 'object' && typeof window.webkit.messageHandlers === 'object') {
            res++;
        }

        if (typeof window.webkit.messageHandlers.closeWebPage === 'undefined') {
            res++;
        }
    } catch (e) {

    }
    return res === 2;
}

/**
 * 当前运行环境是不是Android的webview
 * @returns {boolean}
 */
function isAndroidWebView() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    if (!isAndroid) {
        return false;
    }
    var res = 0;
    try {
        if (typeof window.CourseWebInterface === 'object') {
            res++;
        }

        if (typeof window.CourseWebInterface.closeWebPage === 'function') {
            res++;
        }
    } catch (e) {

    }
    return res === 2;
}

function checkPhone(phone) {
    if (empty(phone)) return false;
    if (!(/^1[0-9]{10}$/.test(phone))) {
        return false;
    }
    return true;
}

function checkMail(mail) {
    if (empty(mail)) return false;
    if (!(/^.+@.+$/i.test(mail))) {
        return false;
    }
    return true;
}


// 扩展数组求和
if (!Array.prototype.array_sum) {
    Object.defineProperty(Array.prototype, 'array_sum', {
        value: function () {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            var sum = 0;
            for (var i = 0; i < o.length; i++) {
                sum += o[i];
            }
            return sum;
        }
    });
}

/**
 * Checks if a variable is a Number
 * @param num {*} The variable to test
 * @return {Boolean}
 */
function isNumber(num) {
    return (!isNaN(parseFloat(num)) && isFinite(num));
}

/**
 * 得到一个两数之间的随机整数，包括两个数在内
 * @param min
 * @param max
 * @returns {number}
 */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}

/**
 * 数组去重
 * @returns {*}
 * @param parameters
 */
function array_deduplication(parameters) {
    var arr = parameters.arr;
    var status = parameters.status;
    return arr.filter(function (c, index) {
        if (status === 1) {
            return arr.indexOf(c) === index;
        } else {
            return arr.lastIndexOf(c) === index;
        }
    });
}