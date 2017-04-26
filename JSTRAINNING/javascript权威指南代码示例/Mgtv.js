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
var Mgtv = function() {
    Mgtv.prototype.play = function(a, b) {
        this.play_id = a,
        this.pageUrl = b,
        this.ua = "ImgoTV-iphone/4.7.4.160930 CFNetwork/808.0.2 Darwin/16.0.0",
        this._videoInfo()
    },
    this._parseVid = function() {
        if (0 != this.pageUrl.indexOf("http")) return this.vid = this.pageUrl,
        this.pageUrl = "http://www.mgtv.com/",
        void 0;
        var a = this.pageUrl.match(/http\:\/\/.+\/(\d+).html/);
        return a && 2 == a.length ? (this.vid = a[1], void 0) : void 0
    },
    this._videoInfo = function() {
        var b, a = this;
        return this._parseVid(),
        this.vid ? (b = "http://mobile.api.hunantv.com/v6/video/getSource?appVersion=4.7.4&device=iPhone&guid=790817412634382337&mac=38e2308660862408e09c50cbff532054980aab6e&osType=ios&osVersion=10.000000&seqId=4d7c0a5bd740fa0d7b7c4646b33ef696&ticket=&videoId=" + this.vid, window.bridge.openUrl(b, "", this.userAgent,
        function(b) {
            var c, d, e, f, g, h;
            try {
                if (c = b.match(/"code":(\d+)/), c && c.length > 1 && (d = c[1]), !d || "200" != d) return window.bridge.playUrl("error"),
                void 0;
                if (c = b.match(/"videoDomains":\["([^"]+)"/), c && c.length > 1 && (e = c[1]), c = b.match(/"videoSources":(\[[^\]]+\])/), c && c.length > 1 && (f = JSON.parse(c[1])), !e || !f) return window.bridge.playUrl("error"),
                void 0;
                g = "";
                for (h in f) {
                    if ("2" == f[h]["definition"]) {
                        g = f[h]["url"];
                        break
                    }
                    if ("1" == f[h]["definition"]) {
                        g = f[h]["url"];
                        break
                    }
                    if ("3" == f[h]["definition"]) {
                        g = f[h]["url"];
                        break
                    }
                    if ("0" == f[h]["definition"]) {
                        g = f[h]["url"];
                        break
                    }
                }
                if (!g) return window.bridge.playUrl("error"),
                void 0;
                a._video_url(e + g)
            } catch(i) {
                console.log(i.message),
                window.bridge.playUrl("error")
            }
        }), void 0) : (window.bridge.playUrl("error"), void 0)
    },
    this._video_url = function(a) {
        var b = this;
        window.bridge.openUrl(a, "", this.userAgent,
        function(a) {
            try {
                if (!a) return console.log("no response"),
                window.bridge.playUrl("error"),
                void 0;
                var c = JSON.parse(a);
                c["info"] ? b._do_download(b.play_id, c["info"]) : window.bridge.playUrl("error")
            } catch(d) {
                console.log(d.message),
                window.bridge.playUrl("error")
            }
        })
    },
    this._do_download = function(a, b) {
        window.bridge.playUrl(b)
    }
};
var v = new Mgtv() v.play(0, 'http://www.mgtv.com/b/314044/3888442.html')