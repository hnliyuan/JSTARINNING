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
var Youku = function(a) {
    this.vid = a,
    this.userAgent = "Youku HD;4.6.5;Android;4.4.4;MI PAD",
    this._url = function() {
        var a = (new Date).getTime() / 1e3,
        b = md5(this._guid()),
        c = md5("GET:/common/v3/play:" + a + ":631l1i1x3fv5vs2dxlj5v8x81jqfs2om"),
        d = "http://a.play.api.3g.youku.com/common/v3/play?_t_=" + a + "&e=md5&_s_=" + c + "&point=1&id=" + this.vid + "&local_time=&local_vid=&format=1,5,6,7,8&did=" + b + "&ctype=20&language=default&audiolang=1&local_point=&pid=5ea9ec16c1d0dff6&guid=7b14ad0d9b1c44c4a6d685229702f88f&mac=64:09:80:ea:75:d5&imei=&ver=4.6.5&network=WIFI",
        e = this;
        window.bridge.openUrl(d, this.userAgent, "http://www.youku.com",
        function(c) {
            var f, g, h, i, j, k, l, m, n, o, p, q, r, d = JSON.parse(c);
            if (!d || !d.data) return e._error(),
            void 0;
            for (f = Base64.decode(d.data), g = [], h = 0; h < f.length; h++) g.push(f.charCodeAt(h));
            i = aesjs.util.convertStringToBytes("qwer3as2jin4fdsa"),
            j = aesjs.newEcbInstance(i),
            k = j.decrypt(g),
            l = aesjs.util.convertBytesToString(k),
            m = JSON.parse(l),
            n = m.sid_data.token,
            o = m.sid_data.oip,
            p = m.sid_data.sid,
            q = e._get_ep(p, e.vid, n),
            r = "http://pl.youku.com/playlist/m3u8?ts=" + a + "&keyframe=1&ykss=1b6b2456ff7623c92736e80e&vid=" + e.vid + "&sid=" + p + "&token=" + n + "&oip=" + o + "&type=mp4&did=" + b + "&ctype=20&ev=1&ep=" + q,
            window.bridge.playUrl(r)
        })
    },
    this._get_ep = function(a, b, c) {
        var h, i, j, d = aesjs.util.convertStringToBytes("9e3633aadde6bfec"),
        e = a + "_" + b + "_" + c,
        f = aesjs.util.convertStringToBytes(e),
        g = f.length % 16;
        if (g > 0) for (h = 0; 16 - g > h; h++) f.push(0);
        return i = aesjs.newEcbInstance(d),
        j = i.encrypt(f),
        encodeURIComponent(this._L(aesjs.util.convertBytesToString(j, "raw")))
    },
    this._guid = function() {
        function a() {
            return (0 | 65536 * (1 + Math.random())).toString(16).substring(1)
        }
        return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
    },
    this._L = function(a) {
        if (!a) return "";
        var b, c, d, e, f, g, a = a.toString();
        for (d = a.length, c = 0, b = ""; d > c;) {
            if (e = 255 & a.charCodeAt(c++), c == d) {
                b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 2),
                b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((3 & e) << 4),
                b += "==";
                break
            }
            if (f = a.charCodeAt(c++), c == d) {
                b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 2),
                b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((3 & e) << 4 | (240 & f) >> 4),
                b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((15 & f) << 2),
                b += "=";
                break
            }
            g = a.charCodeAt(c++),
            b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 2),
            b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((3 & e) << 4 | (240 & f) >> 4),
            b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((15 & f) << 2 | (192 & g) >> 6),
            b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(63 & g)
        }
        return b
    }
};
Youku.prototype.play = function() {
    this._url()
};
var v = new Youku('XNTQwMTgxMTE2') v.play()