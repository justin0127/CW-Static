//tp:1、货主版 2、司机版
//tp2:1、android 2、ios  (如果根据设备识别可不传)
var Download = function (tp, tp2) {
    var systp = tp2 || 0;
    var ua = navigator.userAgent.toLowerCase();

    //基本配置
    /*货主版*/
    var config1 = {
        /*scheme:必须*/
        scheme_IOS: 'hdchuozhu://',
        scheme_Adr: 'hdchuozhu://android',
        download_iosurl: "https://itunes.apple.com/cn/app/chen-wu/id1078870344",
        download_adrurl: "http://www.top-cw.com/download/chenwu_portal_signed_1.0.apk",
        timeout: 600
    };
    /*司机版*/
    var config2 = {
        /*scheme:必须*/
        scheme_IOS: 'hdcdriver://',
        scheme_Adr: 'hdcdriver://android',
        download_iosurl: "https://itunes.apple.com/cn/app/chen-wu/id1078870344",
        download_adrurl: "http://www.top-cw.com/download/chenwu_portal_signed_1.0.apk",
        timeout: 600
    };

    //下载
    function goDownload(tp) {
        var config = tp == 1 ? config1 : config2;
        var scheme;
        var url;
        if (systp == 0) {
            if (is_ios()) {
                scheme = config.scheme_IOS;
                url = config.download_iosurl;
            } else {
                scheme = config.scheme_Adr;
                url = config.download_adrurl;
            }
        } else {
            if (systp == 1) {
                scheme = config.scheme_Adr;
                url = config.download_adrurl;
            } else {
                scheme = config.scheme_IOS;
                url = config.download_iosurl;
            }
        }

        if (is_pc()) {
            window.location.href = url;
        } else {
            if (!is_weixn()) {
                var startTime = Date.now();
                var ifr = document.createElement('iframe');
                ifr.src = scheme;
                ifr.style.display = 'none';
                document.body.appendChild(ifr);
                var t = setTimeout(function () {
                    var endTime = Date.now();

                    if (!startTime || endTime - startTime < config.timeout + 100) {
                        window.location.href = url;
                    } else {

                    }
                }, config.timeout);

                window.onblur = function () {
                    clearTimeout(t);
                };
            } else {
                document.getElementById("downloadTip").style.display = "block";
                //window.location.href = url;
            }
        }
    }

    //判断是否是微信
    function is_weixn() {
        //var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    //判断是否为ios设备
    function is_ios() {
        if (ua.indexOf('os') > 0) {
            return true;
        } else {
            return false;
        }
    }

    //判断是否为电脑
    function is_pc() {
        var Agents = new Array("android", "iphone", "symbianos", "windows phone", "ipad", "ipod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (ua.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    goDownload(tp);
};

//微信提示关闭
function closePan() {
    document.getElementById('downloadTip').style.display = 'none';
    return false;
}

//点击下载并回调
function DownloadBack(tp, callback) {
    if (callback) {
        callback();
    }

    Download(tp);
}