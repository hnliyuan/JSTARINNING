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
function(t) {
    function r(r) {
        if (t.WebViewJavascriptBridge) return r(WebViewJavascriptBridge);
        if (t.WVJBCallbacks) return t.WVJBCallbacks.push(r);
        t.WVJBCallbacks = [r];
        var n = document.createElement("iframe");
        n.style.display = "none",
        n.src = "wvjbscheme://__BRIDGE_LOADED__",
        document.documentElement.appendChild(n),
        setTimeout(function() {
            document.documentElement.removeChild(n)
        },
        0)
    }
    r(function(t) {}),
    t.WebViewCommon = {
        _parse_faile: function(r, n) {
            var e = {
                id: r,
                message: n
            };
            t.WebViewJavascriptBridge.callHandler("ParseFail", e,
            function(t) {})
        }
    }
} (window),
function(t) {
    var r, n = "2.1.9";
    if ("undefined" != typeof module && module.exports) try {
        r = require("buffer").Buffer
    } catch(t) {}
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    o = function(t) {
        for (var r = {},
        n = 0,
        e = t.length; n < e; n++) r[t.charAt(n)] = n;
        return r
    } (e),
    a = String.fromCharCode,
    i = function(t) {
        if (t.length < 2) {
            var r = t.charCodeAt(0);
            return r < 128 ? t: r < 2048 ? a(192 | r >>> 6) + a(128 | 63 & r) : a(224 | r >>> 12 & 15) + a(128 | r >>> 6 & 63) + a(128 | 63 & r)
        }
        var r = 65536 + 1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320);
        return a(240 | r >>> 18 & 7) + a(128 | r >>> 12 & 63) + a(128 | r >>> 6 & 63) + a(128 | 63 & r)
    },
    c = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
    u = function(t) {
        return t.replace(c, i)
    },
    d = function(t) {
        var r = [0, 2, 1][t.length % 3],
        n = t.charCodeAt(0) << 16 | (t.length > 1 ? t.charCodeAt(1) : 0) << 8 | (t.length > 2 ? t.charCodeAt(2) : 0),
        o = [e.charAt(n >>> 18), e.charAt(n >>> 12 & 63), r >= 2 ? "=": e.charAt(n >>> 6 & 63), r >= 1 ? "=": e.charAt(63 & n)];
        return o.join("")
    },
    f = window.btoa ?
    function(t) {
        return window.btoa(t)
    }: function(t) {
        return t.replace(/[\s\S]{1,3}/g, d)
    },
    h = r ?
    function(t) {
        return (t.constructor === r.constructor ? t: new r(t)).toString("base64")
    }: function(t) {
        return f(u(t))
    },
    l = function(t, r) {
        return r ? h(String(t)).replace(/[+\/]/g,
        function(t) {
            return "+" == t ? "-": "_"
        }).replace(/=/g, "") : h(String(t))
    },
    s = function(t) {
        return l(t, !0)
    },
    g = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"),
    m = function(t) {
        switch (t.length) {
        case 4:
            var r = (7 & t.charCodeAt(0)) << 18 | (63 & t.charCodeAt(1)) << 12 | (63 & t.charCodeAt(2)) << 6 | 63 & t.charCodeAt(3),
            n = r - 65536;
            return a((n >>> 10) + 55296) + a((1023 & n) + 56320);
        case 3:
            return a((15 & t.charCodeAt(0)) << 12 | (63 & t.charCodeAt(1)) << 6 | 63 & t.charCodeAt(2));
        default:
            return a((31 & t.charCodeAt(0)) << 6 | 63 & t.charCodeAt(1))
        }
    },
    p = function(t) {
        return t.replace(g, m)
    },
    v = function(t) {
        var r = t.length,
        n = r % 4,
        e = (r > 0 ? o[t.charAt(0)] << 18 : 0) | (r > 1 ? o[t.charAt(1)] << 12 : 0) | (r > 2 ? o[t.charAt(2)] << 6 : 0) | (r > 3 ? o[t.charAt(3)] : 0),
        i = [a(e >>> 16), a(e >>> 8 & 255), a(255 & e)];
        return i.length -= [0, 0, 2, 1][n],
        i.join("")
    },
    A = window.atob ?
    function(t) {
        return window.atob(t)
    }: function(t) {
        return t.replace(/[\s\S]{1,4}/g, v)
    },
    _ = r ?
    function(t) {
        return t.constructor === r.constructor ? t: new r(t, "base64")
    }: function(t) {
        return A(t)
    },
    b = function(t) {
        return _(String(t).replace(/[-_]/g,
        function(t) {
            return "-" == t ? "+": "/"
        }).replace(/[^A-Za-z0-9\+\/]/g, ""))
    };
    if (Base64 = {
        VERSION: n,
        atob: A,
        btoa: f,
        fromBase64: b,
        toBase64: l,
        utob: u,
        encode: l,
        encodeURI: s,
        btou: p,
        decode: b
    },
    "function" == typeof Object.defineProperty) {
        var w = function(t) {
            return {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        };
        Base64.extendString = function() {
            Object.defineProperty(String.prototype, "fromBase64", w(function() {
                return b(this)
            })),
            Object.defineProperty(String.prototype, "toBase64", w(function(t) {
                return l(this, t)
            })),
            Object.defineProperty(String.prototype, "toBase64URI", w(function() {
                return l(this, !0)
            }))
        }
    }
} (this),
md5 = function() {
    function t(t, r) {
        var i, u, d, f, h, l, s, g, m;
        for (t[r >> 5] |= 128 << r % 32, t[(r + 64 >>> 9 << 4) + 14] = r, i = 1732584193, u = -271733879, d = -1732584194, f = 271733878, h = 0; h < t.length; h += 16) l = i,
        s = u,
        g = d,
        m = f,
        i = n(i, u, d, f, t[h + 0], 7, -680876936),
        f = n(f, i, u, d, t[h + 1], 12, -389564586),
        d = n(d, f, i, u, t[h + 2], 17, 606105819),
        u = n(u, d, f, i, t[h + 3], 22, -1044525330),
        i = n(i, u, d, f, t[h + 4], 7, -176418897),
        f = n(f, i, u, d, t[h + 5], 12, 1200080426),
        d = n(d, f, i, u, t[h + 6], 17, -1473231341),
        u = n(u, d, f, i, t[h + 7], 22, -45705983),
        i = n(i, u, d, f, t[h + 8], 7, 1770035416),
        f = n(f, i, u, d, t[h + 9], 12, -1958414417),
        d = n(d, f, i, u, t[h + 10], 17, -42063),
        u = n(u, d, f, i, t[h + 11], 22, -1990404162),
        i = n(i, u, d, f, t[h + 12], 7, 1804603682),
        f = n(f, i, u, d, t[h + 13], 12, -40341101),
        d = n(d, f, i, u, t[h + 14], 17, -1502002290),
        u = n(u, d, f, i, t[h + 15], 22, 1236535329),
        i = e(i, u, d, f, t[h + 1], 5, -165796510),
        f = e(f, i, u, d, t[h + 6], 9, -1069501632),
        d = e(d, f, i, u, t[h + 11], 14, 643717713),
        u = e(u, d, f, i, t[h + 0], 20, -373897302),
        i = e(i, u, d, f, t[h + 5], 5, -701558691),
        f = e(f, i, u, d, t[h + 10], 9, 38016083),
        d = e(d, f, i, u, t[h + 15], 14, -660478335),
        u = e(u, d, f, i, t[h + 4], 20, -405537848),
        i = e(i, u, d, f, t[h + 9], 5, 568446438),
        f = e(f, i, u, d, t[h + 14], 9, -1019803690),
        d = e(d, f, i, u, t[h + 3], 14, -187363961),
        u = e(u, d, f, i, t[h + 8], 20, 1163531501),
        i = e(i, u, d, f, t[h + 13], 5, -1444681467),
        f = e(f, i, u, d, t[h + 2], 9, -51403784),
        d = e(d, f, i, u, t[h + 7], 14, 1735328473),
        u = e(u, d, f, i, t[h + 12], 20, -1926607734),
        i = o(i, u, d, f, t[h + 5], 4, -378558),
        f = o(f, i, u, d, t[h + 8], 11, -2022574463),
        d = o(d, f, i, u, t[h + 11], 16, 1839030562),
        u = o(u, d, f, i, t[h + 14], 23, -35309556),
        i = o(i, u, d, f, t[h + 1], 4, -1530992060),
        f = o(f, i, u, d, t[h + 4], 11, 1272893353),
        d = o(d, f, i, u, t[h + 7], 16, -155497632),
        u = o(u, d, f, i, t[h + 10], 23, -1094730640),
        i = o(i, u, d, f, t[h + 13], 4, 681279174),
        f = o(f, i, u, d, t[h + 0], 11, -358537222),
        d = o(d, f, i, u, t[h + 3], 16, -722521979),
        u = o(u, d, f, i, t[h + 6], 23, 76029189),
        i = o(i, u, d, f, t[h + 9], 4, -640364487),
        f = o(f, i, u, d, t[h + 12], 11, -421815835),
        d = o(d, f, i, u, t[h + 15], 16, 530742520),
        u = o(u, d, f, i, t[h + 2], 23, -995338651),
        i = a(i, u, d, f, t[h + 0], 6, -198630844),
        f = a(f, i, u, d, t[h + 7], 10, 1126891415),
        d = a(d, f, i, u, t[h + 14], 15, -1416354905),
        u = a(u, d, f, i, t[h + 5], 21, -57434055),
        i = a(i, u, d, f, t[h + 12], 6, 1700485571),
        f = a(f, i, u, d, t[h + 3], 10, -1894986606),
        d = a(d, f, i, u, t[h + 10], 15, -1051523),
        u = a(u, d, f, i, t[h + 1], 21, -2054922799),
        i = a(i, u, d, f, t[h + 8], 6, 1873313359),
        f = a(f, i, u, d, t[h + 15], 10, -30611744),
        d = a(d, f, i, u, t[h + 6], 15, -1560198380),
        u = a(u, d, f, i, t[h + 13], 21, 1309151649),
        i = a(i, u, d, f, t[h + 4], 6, -145523070),
        f = a(f, i, u, d, t[h + 11], 10, -1120210379),
        d = a(d, f, i, u, t[h + 2], 15, 718787259),
        u = a(u, d, f, i, t[h + 9], 21, -343485551),
        i = c(i, l),
        u = c(u, s),
        d = c(d, g),
        f = c(f, m);
        return Array(i, u, d, f)
    }
    function r(t, r, n, e, o, a) {
        return c(u(c(c(r, t), c(e, a)), o), n)
    }
    function n(t, n, e, o, a, i, c) {
        return r(n & e | ~n & o, t, n, a, i, c)
    }
    function e(t, n, e, o, a, i, c) {
        return r(n & o | e & ~o, t, n, a, i, c)
    }
    function o(t, n, e, o, a, i, c) {
        return r(n ^ e ^ o, t, n, a, i, c)
    }
    function a(t, n, e, o, a, i, c) {
        return r(e ^ (n | ~o), t, n, a, i, c)
    }
    function i(r, n) {
        var e, o, a, i, c = d(r);
        for (c.length > 16 && (c = t(c, r.length * m)), e = Array(16), o = Array(16), a = 0; 16 > a; a++) e[a] = 909522486 ^ c[a],
        o[a] = 1549556828 ^ c[a];
        return i = t(e.concat(d(n)), 512 + n.length * m),
        t(o.concat(i), 640)
    }
    function c(t, r) {
        var n = (65535 & t) + (65535 & r),
        e = (t >> 16) + (r >> 16) + (n >> 16);
        return e << 16 | 65535 & n
    }
    function u(t, r) {
        return t << r | t >>> 32 - r
    }
    function d(t) {
        var r, n = Array(),
        e = (1 << m) - 1;
        for (r = 0; r < t.length * m; r += m) n[r >> 5] |= (t.charCodeAt(r / m) & e) << r % 32;
        return n
    }
    function f(t) {
        var r, n = "",
        e = (1 << m) - 1;
        for (r = 0; r < 32 * t.length; r += m) n += String.fromCharCode(t[r >> 5] >>> r % 32 & e);
        return n
    }
    function h(t) {
        var r, n = s ? "0123456789ABCDEF": "0123456789abcdef",
        e = "";
        for (r = 0; r < 4 * t.length; r++) e += n.charAt(15 & t[r >> 2] >> 8 * (r % 4) + 4) + n.charAt(15 & t[r >> 2] >> 8 * (r % 4));
        return e
    }
    function l(t) {
        var r, n, e, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        a = "";
        for (r = 0; r < 4 * t.length; r += 3) for (n = (255 & t[r >> 2] >> 8 * (r % 4)) << 16 | (255 & t[r + 1 >> 2] >> 8 * ((r + 1) % 4)) << 8 | 255 & t[r + 2 >> 2] >> 8 * ((r + 2) % 4), e = 0; 4 > e; e++) a += 8 * r + 6 * e > 32 * t.length ? g: o.charAt(63 & n >> 6 * (3 - e));
        return a
    }
    var s = 0,
    g = "",
    m = 8;
    return hex_md5 = function(r) {
        return h(t(d(r), r.length * m))
    },
    b64_md5 = function(r) {
        return l(t(d(r), r.length * m))
    },
    str_md5 = function(r) {
        return f(t(d(r), r.length * m))
    },
    hex_hmac_md5 = function(t, r) {
        return h(i(t, r))
    },
    b64_hmac_md5 = function(t, r) {
        return l(i(t, r))
    },
    str_hmac_md5 = function(t, r) {
        return f(i(t, r))
    },
    hex_md5
} ();
var YoukuYun = function() {
    YoukuYun.prototype.play = function(t, r) {
        this.play_id = t,
        this.vid = r,
        this.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36",
        this.sidAndToken()
    },
    this.get_embsig = function(t) {
        var r = "1",
        n = parseInt((new Date).getTime() / 1e3),
        e = "a413bf8e1ac536a36203a01adbddd272",
        o = t + "_" + n + "_" + e;
        return r + "_" + n + "_" + md5(o)
    },
    this.sidAndToken = function() {
        var t = "http://aplay-vod.cn-beijing.aliyuncs.com/acfun/web?vid=" + this.vid + "&ct=85&ev=2&cid=908a519d032263f8&sign=" + this.get_embsig(this.vid),
        r = this,
        n = {
            id: this.play_id,
            url: t,
            method: "get",
            headers: {
                "User-Agent": this.userAgent
            }
        };
        window.WebViewJavascriptBridge.callHandler("OpenUrl", n,
        function(t) {
            try {
                for (var n = JSON.parse(t.data).data, e = r.rc4("2da3ca9e", Base64.decode(n)), o = JSON.parse(e), a = {
                    m3u8_hd: "hd2",
                    m3u8_mp4: "mp4",
                    m3u8_flv: "flv"
                },
                i = o.stream, c = {},
                u = 0; u < i.length; u++) {
                    var n = i[u];
                    c[n.stream_type] = n
                }
                for (var d in a) {
                    var n = c[d];
                    if (n && n.m3u8) return void r._do_download(r.play_id, n.m3u8)
                }
                window.WebViewCommon._parse_faile(r.play_id, "获取视频失败，请稍后重试")
            } catch(t) {
                window.WebViewCommon._parse_faile(r.play_id, "获取视频失败，请稍后重试")
            }
        })
    },
    this.rc4 = function(t, r) {
        for (var n, e = [], o = 0, a = "", i = 0; i < 256; i++) e[i] = i;
        for (i = 0; i < 256; i++) o = (o + e[i] + t.charCodeAt(i % t.length)) % 256,
        n = e[i],
        e[i] = e[o],
        e[o] = n;
        i = 0,
        o = 0;
        for (var c = 0; c < r.length; c++) i = (i + 1) % 256,
        o = (o + e[i]) % 256,
        n = e[i],
        e[i] = e[o],
        e[o] = n,
        a += String.fromCharCode(r.charCodeAt(c) ^ e[(e[i] + e[o]) % 256]);
        return a
    },
    this._do_download = function(t, r) {
        var n = {
            id: t,
            url: r
        };
        window.WebViewJavascriptBridge.callHandler("DownloadUrl", n,
        function(t) {})
    }
}; (new YoukuYun()).play(0, 'CMTE0MjI3MTI=')