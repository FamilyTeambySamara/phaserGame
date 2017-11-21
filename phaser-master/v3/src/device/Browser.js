var OS = require('./OS');

var Browser = {

    //  @property {boolean} arora - Set to true if running in Arora.
    arora: false,

    //  @property {boolean} chrome - Set to true if running in Chrome.
    chrome: false,

    //  @property {number} chromeVersion - If running in Chrome this will contain the major version number.
    chromeVersion: 0,

    //  @property {boolean} epiphany - Set to true if running in Epiphany.
    epiphany: false,

    //  @property {boolean} firefox - Set to true if running in Firefox.
    firefox: false,

    //  @property {number} firefoxVersion - If running in Firefox this will contain the major version number.
    firefoxVersion: 0,

    //  @property {boolean} mobileSafari - Set to true if running in Mobile Safari.
    mobileSafari: false,

    //  @property {boolean} ie - Set to true if running in Internet Explorer.
    ie: false,

    //  @property {number} ieVersion - If running in Internet Explorer this will contain the major version number. Beyond IE10 you should use Device.trident and Device.tridentVersion.
    ieVersion: 0,

    //  @property {boolean} midori - Set to true if running in Midori.
    midori: false,

    //  @property {boolean} opera - Set to true if running in Opera.
    opera: false,

    //  @property {boolean} safari - Set to true if running in Safari.
    safari: false,

    //  @property {number} safariVersion - If running in Safari this will contain the major version number.
    safariVersion: 0,

    //  @property {boolean} trident - Set to true if running a Trident version of Internet Explorer (IE11+)
    trident: false,

    //  @property {number} tridentVersion - If running in Internet Explorer 11 this will contain the major version number. See {@link http://msdn.microsoft.com/en-us/library/ie/ms537503(v=vs.85).aspx}
    tridentVersion: 0,

    //  @property {boolean} edge - Set to true if running in Microsoft Edge browser.
    edge: false,

    //  @property {boolean} silk - Set to true if running in the Silk browser (as used on the Amazon Kindle)
    silk: false

};

function init ()
{
    var ua = navigator.userAgent;

    if ((/Arora/).test(ua))
    {
        Browser.arora = true;
    }
    else if (/Edge\/\d+/.test(ua))
    {
        Browser.edge = true;
    }
    else if ((/Chrome\/(\d+)/).test(ua) && !OS.windowsPhone)
    {
        Browser.chrome = true;
        Browser.chromeVersion = parseInt(RegExp.$1, 10);
    }
    else if ((/Epiphany/).test(ua))
    {
        Browser.epiphany = true;
    }
    else if ((/Firefox\D+(\d+)/).test(ua))
    {
        Browser.firefox = true;
        Browser.firefoxVersion = parseInt(RegExp.$1, 10);
    }
    else if ((/AppleWebKit/).test(ua) && OS.iOS)
    {
        Browser.mobileSafari = true;
    }
    else if ((/MSIE (\d+\.\d+);/).test(ua))
    {
        Browser.ie = true;
        Browser.ieVersion = parseInt(RegExp.$1, 10);
    }
    else if ((/Midori/).test(ua))
    {
        Browser.midori = true;
    }
    else if ((/Opera/).test(ua))
    {
        Browser.opera = true;
    }
    else if ((/Safari/).test(ua) && !OS.windowsPhone)
    {
        Browser.safari = true;
    }
    else if ((/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/).test(ua))
    {
        Browser.ie = true;
        Browser.trident = true;
        Browser.tridentVersion = parseInt(RegExp.$1, 10);
        Browser.ieVersion = parseInt(RegExp.$3, 10);
    }

    //  Silk gets its own if clause because its ua also contains 'Safari'
    if ((/Silk/).test(ua))
    {
        Browser.silk = true;
    }

    return Browser;
}

module.exports = init();
