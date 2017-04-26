 var iframeSrc = "28582873_le";
    var iframeReferer = "http://m.b8yy.com/v/24558.html";

    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function () {
            this.parentNode.removeChild(this);
        };
    }

    var JSBridge = function () {
        window.bridge_callback = {}
    };

    JSBridge.prototype.toNative = function (custom_url) {
        window.location = custom_url;
    };

    // Post请求
    JSBridge.prototype.postUrl = function(url, referer, userAgent, post_data, callback) {
        var t = (new Date()).getTime();
        referer = referer?referer:'';
        userAgent = userAgent?userAgent:'';
        var custom_url = 'jsbridge://postUrl?callback_id=' + t + '&url=' + encodeURIComponent(url) + '&referer=' + encodeURIComponent(referer) + '&userAgent=' + encodeURIComponent(userAgent) + '&data=' + encodeURIComponent(post_data);
        window.bridge_callback[t] = function (response) {
            if (callback) {
                callback(response);
            }
            delete window.bridge_callback[t];
        };
        this.toNative(custom_url);
    }

    //打开地址
    JSBridge.prototype.openUrl = function (url, referer, userAgent, callback) {
        var t = (new Date()).getTime();
        referer = referer ? referer : '';
        userAgent = userAgent ? userAgent : '';
        var custom_url = 'jsbridge://openUrl?callback_id=' + t + '&url=' + encodeURIComponent(url) + '&referer=' + encodeURIComponent(referer) + '&userAgent=' + encodeURIComponent(userAgent);

        window.bridge_callback[t] = function (response) {
            if (callback) {
                callback(response);
            }
            delete window.bridge_callback[t];
        };
        this.toNative(custom_url);
    };

    //播放
    JSBridge.prototype.playUrl = function (url) {
        var custom_url = 'jsbridge://playUrl?url=' + encodeURIComponent(url);
        this.toNative(custom_url);
    }

    function getPostData(params) {
        var post_ary = []
        for (k in params) {
            if (k.length > 0) {
                post_ary.push(k+'='+encodeURIComponent(params[k]));
            }
        }
        return post_ary.join('&')
    }

    window.bridge = new JSBridge();

    function getContentByTag(content, start, end) {
        var pos1 = content.indexOf(start);
//            document.body.innerHTML += "pos1 = " + pos1;
        if (pos1 > 0) {
            var pos2 = content.indexOf(end, pos1 + start.length);
//                document.body.innerHTML += "pos2 = " + pos2;
            if (pos2 > 0) {
                var start_sub = pos1 + start.length
//                    document.body.innerHTML += content.substring(start_sub, pos2);
                return content.substring(start_sub, pos2);
            }
        }
        return ''
    }

    window.bridge.openUrl('http://m.b8yy.com/js/player/guhuo.php', iframeReferer, 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4', function(response) {
        var r = response.match(/video src="([^"]+)"/)

        if (r && r.length > 1) {
            if (r[1].indexOf('parent.now') > 0) {
                var u = r[1].replace("'+parent.now+'", iframeSrc)
                window.bridge.playUrl(u)
            } else if (r[1].indexOf('+a1+') > 0) {
                var t = iframeSrc.replace('_mmsid', '')
                t = '5415324' + t + '4787457'
                var u = r[1].replace("'+a1+'", t)
                window.bridge.playUrl(u)
            }
        }
    });