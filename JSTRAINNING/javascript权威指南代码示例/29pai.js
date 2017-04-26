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
window.bridge.playUrl('http://v.29pai.com:10030/vip?url=MTI4Mzc5MTYw&type=mmsid&t=1492745232&sign=e6d7887b9dfd47263d95cca61fe8b040');