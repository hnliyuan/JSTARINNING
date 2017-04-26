function getPostData(a) {
    var b = [];
    for (k in a) k.length > 0 && b.push(k + "=" + encodeURIComponent(a[k]));
    return b.join("&")
}
"remove" in Element.prototype || (Element.prototype.remove = function() {
    this.parentNode.removeChild(this)
});
var JSBridge = function() {
    window.bridge_callback = {}
};
JSBridge.prototype.toNative = function(a) {
    window.location = a
},
JSBridge.prototype.postUrl = function(a, b, c, d, e) {
    var g, f = (new Date).getTime();
    b = b ? b: "",
    c = c ? c: "",
    g = "jsbridge://postUrl?callback_id=" + f + "&url=" + encodeURIComponent(a) + "&referer=" + encodeURIComponent(b) + "&userAgent=" + encodeURIComponent(c) + "&data=" + encodeURIComponent(d),
    window.bridge_callback[f] = function(a) {
        e && e(a),
        delete window.bridge_callback[f]
    },
    this.toNative(g)
},
JSBridge.prototype.openUrl = function(a, b, c, d) {
    var f, e = (new Date).getTime();
    b = b ? b: "",
    c = c ? c: "",
    f = "jsbridge://openUrl?callback_id=" + e + "&url=" + encodeURIComponent(a) + "&referer=" + encodeURIComponent(b) + "&userAgent=" + encodeURIComponent(c),
    window.bridge_callback[e] = function(a) {
        d && d(a),
        delete window.bridge_callback[e]
    },
    this.toNative(f)
},
JSBridge.prototype.playUrl = function(a) {
    var b = "jsbridge://playUrl?url=" + encodeURIComponent(a);
    this.toNative(b)
},
window.bridge = new JSBridge;
window.WebViewJavascriptBridge = {
    callHandler: function(a, b, c) {
        "OpenUrl" == a ? this._open_url(b,
        function(a) {
            c && c({
                data: a
            })
        }) : "DownloadUrl" == a ? this._download_url(b,
        function(a) {
            c && c({
                data: a
            })
        }) : "ParseFail" == a && this._error(b, c)
    },
    _open_url: function(a, b) {
        var e, c = a.headers ? a.headers["User-Agent"] : "",
        d = a.headers ? a.headers["Referer"] : "";
        d = void 0 != d && d.length > 0 ? d: null,
        e = a.url ? a.url: "",
        "get" == a.method ? window.bridge.openUrl(e, d, c, b) : window.bridge.postUrl(e, d, c, b)
    },
    _download_url: function(a) {
        var c = a.url ? a.url: "";
        window.bridge.playUrl(c)
    },
    _error: function() {
        window.bridge.playUrl("error")
    }
},
window.WebViewCommon = {
    _parse_faile: function(a, b) {
        var c = {
            id: a,
            message: b
        };
        window.WebViewJavascriptBridge.callHandler("ParseFail", c,
        function() {})
    }
}; !
function(e) {
    function i(i) {
        if (e.WebViewJavascriptBridge) return i(WebViewJavascriptBridge);
        if (e.WVJBCallbacks) return e.WVJBCallbacks.push(i);
        e.WVJBCallbacks = [i];
        var t = document.createElement("iframe");
        t.style.display = "none",
        t.src = "wvjbscheme://__BRIDGE_LOADED__",
        document.documentElement.appendChild(t),
        setTimeout(function() {
            document.documentElement.removeChild(t)
        },
        0)
    }
    i(function(e) {}),
    e.WebViewCommon = {
        _parse_faile: function(i, t) {
            var a = {
                id: i,
                message: t
            };
            e.WebViewJavascriptBridge.callHandler("ParseFail", a,
            function(e) {})
        }
    }
} (window);
var Letv = function() {
    Letv.prototype.play = function(e, i) {
        this.userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.11",
        this.key = 185025305,
        this.play_id = e,
        this.pageUrl = i,
        this.device_id = this._deviceId(),
        this._parseVid(),
        this.vid || window.WebViewCommon._parse_faile(this.play_id, "获取视频失败，请稍后重试"),
        this._videoInfo()
    },
    this._deviceId = function() {
        for (var e = "",
        i = 0; i < 32; i++) {
            var t = Math.floor(16 * Math.random()).toString(16);
            e += t.toLocaleUpperCase()
        }
        return e
    },
    this._parseVid = function() {
        var e = this.pageUrl.match(/^\d+$/);
        if (e) return void(this.vid = this.pageUrl);
        var e = this.pageUrl.match(/http\:\/\/www\.le\.com\/ptv\/vplay\/(\d+).html/);
        return e && 2 == e.length ? void(this.vid = e[1]) : (e = this.pageUrl.match(/http\:\/\/www\.letv\.com\/ptv\/vplay\/(\d+).html/), e && 2 == e.length ? void(this.vid = e[1]) : void 0)
    },
    this._calcKey = function(e, i) {
        for (var t, a = 0; i > a; a++) t = 1 & e,
        e >>= 1,
        t <<= 31,
        e += t;
        return e
    },
    this._mmsKey = function(e) {
        var i = this.key,
        t = this.key % 17,
        a = e;
        return a = this._calcKey(a, t),
        a ^ i
    },
    this._videoInfo = function() {
        var e = this,
        i = (new Date).getTime() / 1e3,
        t = "http://api.le.com/mms/out/video/playJsonH5?id=" + this.vid + "&platid=3&splatid=301&tss=no&detect=0&dvtype=1000&accessyx=1&tkey=" + this._mmsKey(i) + "&domain=m.letv.com&devid=" + this.device_id;
        console.log(t);
        var a = {
            id: this.play_id,
            url: t,
            method: "get",
            headers: {
                "User-Agent": this.userAgent
            }
        };
        window.WebViewJavascriptBridge.callHandler("OpenUrl", a,
        function(i) {
            var t = i.data,
            a = JSON.parse(t);
            try {
                if (1001 != a.statuscode) return console.log("letv interface error " + a.statuscode),
                void window.WebViewCommon._parse_faile(e.play_id, "获取视频失败，请稍后重试");
                var o = "",
                r = a.playurl.dispatch;
                if (r["720p"]) o = "720p";
                else if (r[1e3]) o = "1000";
                else if (r[350]) o = "350";
                else if (r["1080p"]) o = "1080p";
                else if (r[1300]) o = "1300";
                else for (var n in r) {
                    o = n;
                    break
                }
                var l = a.playurl.domain[0] + a.playurl.dispatch[o][0],
                s = a.playurl.dispatch[o][1].split(".");
                s[s.length - 1];
                l += "&ctv=pc&m3v=1&termid=1&format=1&hwtype=un&ostype=Linux&tag=letv&sign=letv&expect=3&tn=" + Math.random() + "&pay=0&iscpn=f9051&rateid=" + o,
                e._get_m3u8(l)
            } catch(i) {
                console.log(i.message),
                window.WebViewCommon._parse_faile(e.play_id, "获取视频失败，请稍后重试")
            }
        })
    },
    this._get_m3u8 = function(e) {
        console.log("get m3u8");
        var i = this,
        t = {
            id: this.play_id,
            url: e,
            method: "get",
            headers: {
                "User-Agent": this.userAgent
            }
        };
        window.WebViewJavascriptBridge.callHandler("OpenUrl", t,
        function(e) {
            var t = e.data,
            a = JSON.parse(t);
            try {
                if (200 != a.status) return console.log("letv get m3u8 error " + a.status),
                void window.WebViewCommon._parse_faile(i.play_id, "获取视频失败，请稍后重试");
                a.location ? i._do_download(i.play_id, a.location) : window.WebViewCommon._parse_faile(i.play_id, "获取视频失败，请稍后重试")
            } catch(e) {
                console.log(e.message),
                i._error()
            }
        })
    },
    this._real_m3u8 = function(e) {
        console.log("_real_m3u8"),
        console.log(e);
        var i = {
            id: this.play_id,
            url: e,
            method: "get",
            headers: {
                "User-Agent": this.userAgent
            }
        };
        window.WebViewJavascriptBridge.callHandler("OpenUrl", i,
        function(e) {
            var i = NSString.alloc().initWithData_encoding(responseObject, 1),
            t = i.toJS(),
            a = t.substr(0, 5);
            if ("vc_01" == a.toLocaleLowerCase()) {
                for (var o = t.substr(5, t.length), r = o.length, n = 2 * r, l = new Array(n), s = 0; s < r; s++) l[2 * s] = o[s].charCodeAt() >> 4,
                l[2 * s + 1] = 15 & o[s].charCodeAt();
                var d = l.slice(n - 11, n);
                d = d.concat(l.slice(0, n - 11));
                for (var c = new Array(r), s = 0; s < r; s++) c[s] = (d[2 * s] << 4) + d[2 * s + 1];
                for (var h = "",
                s = 0; s < r; s++) h += String.fromCharCode(c[s]);
                thiz._do_download(thiz.play_id, h)
            } else window.WebViewCommon._parse_faile(thiz.play_id, "获取视频失败，请稍后重试")
        })
    },
    this._do_download = function(e, i) {
        var t = {
            id: e,
            url: i
        };
        window.WebViewJavascriptBridge.callHandler("DownloadUrl", t,
        function(e) {})
    }
};
new Letv().play(0, 'http://www.letv.com/ptv/vplay/28596135.html');