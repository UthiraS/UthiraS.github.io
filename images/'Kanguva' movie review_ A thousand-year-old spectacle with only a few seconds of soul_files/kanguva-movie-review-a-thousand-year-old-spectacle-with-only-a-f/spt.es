(function (w) {
    /*tagconfig*/
    var adConfig = {}
    var config =

{"playerType":2,"playerDelay":0,"isSessionIdEnabled":false,"ad":{"display":{"overlay":{"disableWhenFloating":false},"linear":{"disableWhenFloating":false},"passback":{"disableWhenFloating":false}}},"posDfp1x1":true,"targetingDomain":"","showBigPrevNextOnPause":true,"readMoreButton":{"enable":true,"text":"Read More","showWhen":"ui-visible"},"scriptId":"AV672de2219735f98b5d00b477","playerVersion":8,"tracking":{"enabled":false},"autoContinue":true,"position":"aniplayer_AV672de2219735f98b5d00b477","templateId":"66839e7096a960f9e40a731a","checkTargeting":false,"volume":{"startValue":0.2,"muted":true,"unmuteOnInteract":true},"tagId":"672de2219735f98b5d00b477","showNextButton":true,"showSoundButton":true,"autoLoop":true,"showPauseButton":true,"floating":{"closeButton":true,"size":0.5,"bottom":5,"right":5,"resize":true,"position":"Bottom-Right","floatOnBottom":true},"showPrevButton":true,"logo":{"size":[18,18],"url":"https:\/\/static.vidgyor.com\/images\/vid-short-logo.png","position":"right","clickThrough":"https:\/\/www.vidgyor.com"},"showBigPrevNext":false,"showVolumeControl":true,"showFullScreen":true,"showDuration":false,"showPlaylist":false,"showPlaylistButton":true,"playlistPlacement":1,"syncVolume":true,"showPlaylistItemTitle":true,"adConfig":{"adsControlPositioning":"left","channelId":"672ddadb55b775f9af0d6777","publisherId":"672c69bdc107da19860a9f47","height":0,"errorLimit":30,"startAdOnView":true,"soundButton":true,"startAdOnViewPerc":20,"vitab":true,"timelineMode":"bottom","vastRetry":3,"pauseButton":true,"reqTabOnView":true,"logo":false,"width":100},"showReplay":true,"timelineMode":"bottom","showBigPlayOnPause":true,"adServerDomain":"go1.aniview.com","width":100,"height":0,"content":{"contents":[{"url":"https:\/\/vodcdn.vidgyor.com\/vod-origin\/promos\/openvideos\/free1.mp4","entry":{"duration":60,"name":"1"}},{"url":"https:\/\/vodcdn.vidgyor.com\/vod-origin\/promos\/openvideos\/free2.mp4","entry":{"duration":60,"name":"2"}}],"breakingAdsMode":"os","type":0,"order":0,"breakingAds":15},"maxWidth":640,"playbackMode":3,"closeButtonStyle":{"overlayMargin":10,"right":10,"position":"Top-Right","outside":true},"minHeight":360,"autoPlay":true,"mobile":{"showBigPlay":true,"showFullScreen":false,"showBigPlayOnPause":true,"showPauseButton":true,"showPrevButton":false,"showNextButton":false,"showBigPrevNext":true},"startMode":{"mode":"WaitForAd","playOnView":true,"showPlayer":true},"showBigPlay":true}
var b =
{}
var ab =
{}





    function merge(target, source) {
        if (typeof source !== 'object' || Array.isArray(source)) {
            return target;
        }
        for (var key in source) {
            var a = {};
            a[key] = {};
            if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
                if (!target[key]) {
                    Object.assign(target, a);
                }
                merge(target[key], source[key]);
            } else {
                a[key] = source[key];
                Object.assign(target, a);
            }
        }
    }

    function getApiInfo(apiName, win) {
        try {
            if (win[apiName]) {
                return { api: win[apiName], window: win };
            } else if(window[apiName]) {
                return { api: window[apiName], window: window };
            } else {
                return { api: top[apiName], window: top };
            }
        } catch (exp) {
            return { api: window[apiName], window: window };
        }
    }

    /*tagconfig*/
    var a = config;
    var st = {
        scriptErrorCounter: 0,
        target: function () {
            try {        if (this.sp) {
            return;
        }

        var ua = navigator.userAgent || navigator.vendor || window.opera;
        var uav = navigator.appVersion ? navigator.appVersion.toLowerCase() : "";
        var op = 2;
        var isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(ua);
        var isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4));

        if (isTablet && a.tabletAsDesktop) {
            //
        } else if (isMobile) {
            op = 1;
        } else if (/web0s|webos|tizen/i.test(uav)) {
            op = 4;
        }

        this.op = op;
    } catch (reason) {(console.error || console.log)(reason);}
        },
        getConfig: function () {
            try {        function addDefaults (r, defaults) {
			r.creativeDimensions = defaults.creativeDimensions;
			r.refresh = defaults.refresh;
			r.width = defaults.width;
			r.height = defaults.height;
		}
        function getRC(ab) {
            if (ab && ab.length) {
                var inc = 0;
                var rand = Math.floor(Math.random() * 100) + 1;

                for (i = 0; i < ab.length; i++) {
                    b1 = ab[i];
                    inc += b1.sp;

                    if (b1.a && inc >= rand) {
                        return b1.a;
                    }
                }
            }
        }

        var cfg = a;

        try {
            var i, b1, b1a;

            if (b && b.length > 0) {
                st.target();

                for (i = 0; i < b.length; i++) {
                    b1 = b[i];

                    if (b1.t && b1.t.p && b1.t.p == this.op && b1.a) {
                        b1a = b1.a;
                        break;
                    }
                }
            }
            st.target();

            if (typeof abDesktop !== "undefined") {
				ab = this.op == 2 ? abDesktop : abMobile;
			}
			if (typeof adDesktop !== "undefined") {
				ad = this.op == 2 ? adDesktop : adMobile;
			}

            var r1 = getRC(ab) || b1a || cfg;

            if (typeof ad !== "undefined" && ad.length > 0) {
                var r2 = getRC(ad);
                merge(r1, r2);
            }

            var defaults = config;
			if (st.op == 1 && b && b[0]) {
				defaults = b[0].a;
			}
			if (config.creativeType == 2) {
				addDefaults(r1, defaults);
			}
            return r1;
        } catch (e) {}

        return cfg;
    } catch (reason) {(console.error || console.log)(reason);}
        },
        track: function(e, m) {
            try {        if (!this.trackUrl) {
            var kvStr = "";
            var utmKeys = !adConfig.setUtm ? {} : {
                utm_source: "d86",
                utm_medium: "d87",
                utm_term: "d88",
                utm_content: "d89",
                utm_campaign: "d90",
            };

            for (var i = 1; i <= 20; i++) {
                utmKeys["AV_CDIM" + i] = "cd" + i;
            }

            var searchParams = (location.href.split("?")[1] || "") + "&" + (adConfig.ref1 || "");
            var urlParams = {};
            searchParams = searchParams.split("&");

            searchParams.forEach(function (param) {
                var kv = param.split("=");
                var index = kv[0];
                urlParams[index] = kv[1] || "";
            });

            Object.keys(utmKeys).forEach((key) => {
                if (urlParams[key]) {
                    kvStr += "&" + utmKeys[key] + "=" + urlParams[key];
                }
            });

            this.trackUrl =
                "https://"
                + (a.trackDomain || "track1.aniview.com")
                + "/track?pid="
                + a.adConfig.publisherId
                + "&cid="
                + a.adConfig.channelId
                + "&cb="
                + Date.now()
                + "&r="
                + location.host
                + "&stagid="
                + (a.tagId || "")
                + "&stplid="
                + (a.templateId || "")
                + "&d35="
                + (a.adConfig.sabTest || "")
                + "&d65="
                + (a.adConfig.nabTest || "")
                + "&d66="
                + (a.playerVersion || "")
                + "&d74="
                + (a.sessionID || "")
                + kvStr
                + "&e=";
        }

        m = m ? m : "";
        (new Image()).src = this.trackUrl + e + m;
    } catch (reason) {(console.error || console.log)(reason);}
        },
        playerLoadedTrackParams: function() {
            try {        var params = "";

        if (
            config.hasOwnProperty("content")
            && config.content.hasOwnProperty("cmsType")
            && config.content.hasOwnProperty("cmsId")
        ) {
            if (a.content.cmsType === "playlist") {
                params += "&cpid=" + a.content.cmsId;
            } else if (a.content.cmsType === "video") {
                params += "&cvid=" + a.content.cmsId;
            }
        }

        var playReason = "interaction";

        if (config.playOnView) {
            playReason = "viewable";
        } else if (config.autoPlay) {
            playReason = "autostart";
        }

        params += "&str=" + playReason;

        return params;
    } catch (reason) {(console.error || console.log)(reason);}
        },
        unique: function() {
            try {        if (!this.win.aniplayerPos) {
            this.win.aniplayerPos = {};
        }

        this.win.aniplayerPos[a.position] = true;

        return true;
    } catch (reason) {(console.error || console.log)(reason);}
        },
        findWin: function() {
           try {        try {
            try {
                var hasSelector = a.posSelector || a.posSelectors && a.posSelectors.length > 0;

                if ((!a.posDfp1x1 && !a.posClass && !hasSelector && !a.posId && !a.posTag) || (w === top) || !w.frameElement) {
                    this.doc = document;
                    this.win = w;
                } else if (a.posDfp1x1 && w.frameElement) {
                    this.win = parent;
                    this.doc = parent.document;
                } else {
                    this.win = top;
                    this.doc = top.document;
                }
            } catch (f) {
                this.doc = document;
                this.win = w;
            }
        } catch (reason) {
            (console.error || console.log)(reason);
        }
    } catch (reason) {(console.error || console.log)(reason);}
        },
        postCreate: function(el) {
            
        },
        retry: function() {
           try {        var that = this;
        var isFallback = false;

        if (this.retryCnt++ > this.timeout) {
            this.track("AV_M3", "&prbdres=nopos&sn=" + encodeURIComponent(location.href).slice(0, 400));

            return;
        }

        if (this.retryCnt == this.timeout && a.posFallbacks) {
            a.posSelectors = a.posFallbacks;
            isFallback = true;
            this.track("AV_M3", "&prbdres=fallbackpos&sn=" + encodeURIComponent(location.href).slice(0, 400));
        }

        setTimeout(function() {
            that.position(isFallback);
        }, 250);
    } catch (reason) {(console.error || console.log)(reason);}
        },
        create: function(p, n) {
            try {        var d1 = document.createElement("div");

        if (a.scriptId) {
            d1.className = a.scriptId;
        }

        d1.style.width = "100%";
        d1.style.margin = "0 auto";
        d1.style.maxWidth = "" + a.maxWidth + "px";
        var d2 = document.createElement("div");
        d2.id = "aniBox";
        var d3 = document.createElement("div");
        d3.id = a.position;

        if (p === this.doc || p === this.doc.head) {
            p = this.doc.body;
        }

        if (n) {
            p.insertBefore(d1, n);
        } else {
            p.appendChild(d1);
        }

        a.positionDiv = d3;
        a.refDiv = p;
        d1.appendChild(d2);
        d2.appendChild(d3);

        this.postCreate(d1);
    } catch (reason) {(console.error || console.log)(reason);}
        },
        position: function(isFallback) {
            try {        function validateElements(els) {
            var ret = [];

            if (els) {
                els.forEach(function(el) {
                    if (el && el.clientWidth > (a.minElWidth || 170)) {
                        ret.push(el);
                    }
                });
            }

            return ret;
        }

        function findSelectors(selectors) {
            if (selectors && selectors.length > 0 && selectors.forEach) {
                for (var i = 0; i < selectors.length; i++) {
                    var s = selectors[i];

                    try {
                        var q = st.doc.querySelectorAll(s.selector);

                        if (q.length > 0) {
                            return {
                                q: isFallback ? validateElements(q): q,
                                counter: s.counter,
                            };
                        }
                    } catch (ex) {}
                }
            }

            return { q: [] };
        }

        var p = this.doc;
        var isScp = false;
        var positionApiKey = "av_positionApi_" + a.scriptId;

        try {
            if (
                (!a.positionApi || typeof this.win[a.positionApi] !== "function")
                && typeof top[positionApiKey] === "function"
            ) {
                a.positionApi = positionApiKey;
            }
        } catch (ex) {}

        if (a.positionApi && typeof this.win[a.positionApi] === "function") {
            try {
                p = this.win[a.positionApi](a, st);
            } catch (ex) {}

            if (!p) {
                this.retry();

                return;
            }

            if (a.posType != "in") {
                n = p;
                p = p.parentNode;
            }
        }

        try {
            if (a.posSelector && a.validateSelector) {
                a.posSelector = a.posSelector.trim();
                if (a.posSelector[0] === "#" && (a.posSelector.indexOf(" ") > -1 || !isNaN(a.posSelector[1]) ) ) {
                    a.posSelectors = a.posSelectors || [];
                    a.posSelectors.push({
                        count: 0,
                        selector: "#" + CSS.escape(a.posSelector.substring(1))
                    });
                }
            }
        } catch(ex) {}

        if (a.posSelector || a.posSelectors) {
            try {
                var sel1 = a.posSelector
                    ? [{ selector: a.posSelector, counter: a.posCounter }]
                    : [];
                var sel = findSelectors(sel1.concat(a.posSelectors || []));
                var q = sel.q;
                var l = 0;

                if (sel.counter > 0) {
                    l = sel.counter - 1;
                }

                p = q[l] || q[q.length - 1];
            } catch (e) {
                this.track("AV_M3", "&prbdres=badpos&sn=" + encodeURIComponent(location.href).slice(0, 400));

                return;
            }

            if (!p) {
                this.retry();

                return;
            }
        }

        if (a.posId) {
            p = this.doc.getElementById(a.posId);

            if (!p) {
                this.retry();

                return;
            }
        }

        if (a.posTag) {
            var c = a.posTag.split("#");

            if (c && c.length == 2) {
                var e = p.getElementsByTagName(c[0]);

                if (e.length == 0) {
                    this.retry();

                    return;
                }

                p = e[Math.min(c[1] - 1, e.length - 1)];
            }
        }

        if (a.posClass) {
            var c = a.posClass.split("#");
            var e = 1;

            if (c.length == 2) {
                e = c[1];
            }

            var f = p.getElementsByClassName(c[0]);

            if (f.length > 0) {
                p = f[Math.min(e - 1, f.length - 1)];
            }

            if (!p) {
                this.retry();

                return;
            }
        }

        if (a.posDfp1x1 && window.frameElement) {
            n = window.frameElement.parentNode.parentNode;
            p = n.parentNode;

            if ((frameElement.clientHeight > 5 || document.body.clientHeight > 5) && !a.nohideIframe) {
                frameElement.style.height = "0px";
            }

            if (a.posType == "after") {
                n = n.nextElementSibling;
            }
        }

        var n;

        if (p === this.doc) {
            n = this.findScript();

            if (n) {
                p = n.parentNode;
            }
        }

        if (p === this.doc.head) {
            n = null;
            p = this.doc;
        }

        if (a.posType && a.posType !== "in" && !n) {
            if (a.posType === "after" && p.nextElementSibling) {
                n = p.nextElementSibling;
            } else {
                n = null;
            }

            p = p.parentNode;
        }

        if (p) {
            if (!p.av_setpos) {
                p.av_setpos = {};
            }

            if (!p.av_setpos[a.position]) {
                p.av_setpos[a.position] = true;
                a.position += "-" + Date.now();
                this.create(p, n);
                this.load(a.playerVersion);
            } else {
                this.track("AV_M3", "&prbdres=duppos&sn=" + encodeURIComponent(location.href).slice(0, 400));
            }
        }
    } catch (reason) {(console.error || console.log)(reason);}
        },
        fetchContent: function(callback) {
           try {        if (a.content && (a.content.cmsId && a.content.cmsType)) {
            a.content.contentFeed =
                "https://"
                + (a.cmsFeedDomain || "feed.avplayer.com")
                + "/backend/api/"
                + a.content.cmsType
                + "/"
                + a.content.cmsId
                + "?AV_TAGID="
                + this.config.tagId
                + "&pid="
                + this.config.adConfig.publisherId
                + "&cid="
                + this.config.adConfig.channelId
                + "&AV_TEMPID="
                + this.config.templateId;

            if (a.content.cmsUrlMapId) {
                a.content.contentFeed +=
                    "&urlMapId="
                    + a.content.cmsUrlMapId
                    + "&url="
                    + encodeURIComponent(window.location.href);
            }

            if(a.content.firstVideoId) {
                a.content.contentFeed += "&firstVideoId=" + a.content.firstVideoId;
            }

            if(a.content.cmsSyndicationId) {
                a.content.contentFeed += "&syndicationId=" + a.content.cmsSyndicationId;
            }

            if (a.adConfig && a.adConfig.publisherId) {
                a.content.contentFeed += "&AV_PUBLISHERID=" + a.adConfig.publisherId;
            }

            if (a.content.feedParams) {
                a.content.contentFeed += "&" + a.content.feedParams;
            }
        }

        if (a.content.contentFeed) {
            var xhr = new XMLHttpRequest();
            xhr.open( "GET", a.content.contentFeed, true);

            xhr.onload = function () {
                xhr.onload = null;
                xhr.onreadystatechange = null;

                try {
                    var json = JSON.parse(xhr.responseText);

                    if (json && json.playlist) {
                        a.content.contents = json.playlist;
                    }
                } catch (e) {}

                st.postFeed();
                callback();
            };

            xhr.onreadystatechange = function(val) {
                if (this.readyState == 4 && this.status > 400) {
                    xhr.onload = null;
                    xhr.onreadystatechange = null;
                    a.content.contents = [];

                    callback();

                    st.track("AV_M3", "&prbdres=cmserr&sn=" + encodeURIComponent(location.href).slice(0, 400));
                }
            };

            xhr.send();
        } else {
            callback();
        }
    } catch (reason) {(console.error || console.log)(reason);}
        },
        load: function(playerVersion) {
            try {        var that = this;
        var isNewPlayer = playerVersion >= 8;
        var playerApiInfo = getApiInfo(isNewPlayer ? "avContentPlayer" : "_avcp", that.win);
        var playerApi = playerApiInfo.api;
        var playerApiWindow = playerApiInfo.window;
        var scriptPath = isNewPlayer ? "/script/8.3/v/" : "/script/2/v/";
        var defaultScriptDomain = "player.avplayer.com";
        var scriptDomain = a.scriptDomain || defaultScriptDomain;
        var baseJsUrl = a.baseJsUrl || "https://" + scriptDomain + scriptPath;
        var defaultBaseJsUrl = "https://" + defaultScriptDomain + scriptPath;
        var loadCounter = 0;
        var scheduler = playerApiWindow.avContentPlayerScheduler || { loading: false, queue: [] };
        playerApiWindow.avContentPlayerScheduler = scheduler;

        function checkIfLoad() {
            if (++loadCounter > 1) {
                that.postLoadAsync(function() {
                    that.init(playerVersion);
                });
            }
        }

        function checkIfError() {
            if (++st.scriptErrorCounter < 2) {
                fetchScript(a.baseJsUrl || baseJsUrl, !isNewPlayer);
            } else if (st.scriptErrorCounter < 4) {
                setTimeout(function() {
                    if (a.baseJsUrl) {
                        a.baseJsUrl = defaultBaseJsUrl;
                    } else if (a.scriptDomain) {
                        a.scriptDomain = defaultScriptDomain;
                    }

                    fetchScript(defaultBaseJsUrl, !isNewPlayer);
                }, 5000);
            }
        }

        function fetchScript(baseJsUrl, noAb) {
            if (playerApi) {
                checkIfLoad();

                return;
            }

            if (scheduler.loading) {
                scheduler.queue.push([checkIfLoad, checkIfError]);

                return;
            }

            scheduler.loading = true;
            var scp = that.doc.createElement("script");
            var rand = Math.floor(Math.random() * 100) + 1;

            if (rand <= 5 && !noAb) {
               baseJsUrl += "ab5/";
               a.abtest = 5;
               a.adConfig.abtest = 5;
            } else {
                a.abtest = 0;
                a.adConfig.abtest = 0;
            }

            scp.src = baseJsUrl + "avcplayer.js";

            scp.onload = function() {
                scp.onload = null;
                scheduler.loading = false;
                checkIfLoad();
                var queue = scheduler.queue.slice();
                scheduler.queue.length = 0;

                while (callbacks = queue.shift()) {
                    callbacks[0]();
                }
            };

            scp.onerror = function() {
                scp.onerror = null;
                that.doc.body.removeChild(scp);
                scheduler.loading = false;
                checkIfError();
                var queue = scheduler.queue.slice();
                scheduler.queue.length = 0;

                while (callbacks = queue.shift()) {
                    callbacks[1]();
                }
            };

            scp.async = true;
            that.doc.body.appendChild(scp);
        }

        this.fetchContent(checkIfLoad);
        fetchScript(a.baseJsUrl || baseJsUrl, !isNewPlayer);
    } catch (reason) {(console.error || console.log)(reason);}
        },
        postStart: function(p) {
            
        },
        getAttr: function() {
            try {        if (a.scriptId) {
            var s = this.findScript();

            if (s) {
                for (var i = 0, t = s.attributes; i < s.attributes.length; i++) {
                    if (t[i].nodeName && t[i].nodeName.indexOf("data-") == 0) {
                        var n = t[i]
                            .nodeName
                            .replace(/^data-/, "")
                            .replace(/[-_]+?(\w)/g, function (_, letter) {
                                return letter.toUpperCase();
                            })
                            .split(".");

                        var lastProp = n.pop();

                        try {
                            var innerConfig = n.reduce(function (a, prop) {
                                return a[prop];
                            }, a);
                            innerConfig[lastProp] = t[i].nodeValue;
                        } catch(e) {}
                    }
                }

                if (s.src) {
                    var p = s.src.indexOf("?");

                    if (p > 10) {
                        var r = (s.src.substring(p + 1, s.src.length));
                        a.adConfig.ref1 = (a.adConfig.ref1 || "") + "&" + (r || "");
                    }
                }
            }
        }
    } catch (reason) {(console.error || console.log)(reason);}
        },
        start: function(player) {
            try {        this.p = player;

        if (this.pbjs && this.pbjs.preparePlayer) {
           this.pbjs.preparePlayer(player, st);
        }

        if(a.playerApi && typeof this.win[a.playerApi] === "function" ) {
            try {
                this.win[a.playerApi](a, player);
            } catch(ex) {}
        }

        player.nextContent();

        this.postStart(player);
    } catch (reason) {(console.error || console.log)(reason);}
        },
        preRun: function() {
            
        },
        run: function() {
            try {        this.config = a = config = this.getConfig();
        this.a = a;
        this.adConfig = adConfig = (config.playerType == 2 ? config.adConfig : config) || {};
        this.getAttr();

        function generateUuid() {
            return "xxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, function(c) {
                var r = Math.random() * 16|0;
                var v = c == "x" ? r : (r&0x3|0x8);

                return v.toString(16);
            });
        }

        if (a.isSessionIdEnabled) {
            a.sessionID = generateUuid();
        }

        if (window.av_s2sbid) {
            adConfig.s2sbid = window.av_s2sbid;
            window.av_s2sbid = undefined;
        }

        this.preRun();

        if (a.adConfig && a.adConfig.nabTest === "auto_disp_test") {
            a.adConfig.ref1 =
                (a.adConfig.ref1 || "")
                + "&AV_PUB_NET="
                + (a.adConfig.pubNet || "")
                + "&AV_FORCE_PUB_CON_ID="
                + (a.adConfig.pubCon || "")
                + "&AV_FORCE_PAR_CON_ID="
                + (a.adConfig.parCon || "");
        }

        this.findWin();

        if (!this.doc.body) {
            this.doc.addEventListener("DOMContentLoaded", function() {
                st.run();
            });

            if (this.bodyRetry > 0) {
                setTimeout(function() {
                    st.run();
                }, 250);

                this.domRetry--;
            }

            return;
        }

        if (a.configApi && typeof this.win[a.configApi] === "function") {
            try {
                this.win[a.configApi](a);
            } catch (ex) {}
        }

        if (this.unique() && !this.loaded) {
            this.loaded = true;
            this.track("playerLoaded", this.playerLoadedTrackParams());
            this.retryCnt = 0;
            this.timeout = a.posTimeout || 40;
            this.pbjs = window.aniviewRenderer && window.aniviewRenderer.units && window.aniviewRenderer.units[a.scriptId];

            if (!this.pbjs) {
                this.pbjs = window.aniviewRenderer;
            }

            if (this.pbjs && this.pbjs.prepareConfig) {
                this.pbjs.prepareConfig(a, st);
            }

            if (a.playerDelay > 0) {
                setTimeout(function(){
                    st.position();
                }, a.playerDelay * 1000);
            } else {
               st.position();
            }
        }
    } catch (reason) {(console.error || console.log)(reason);}
        },
        init: function(playerVersion) {
            try {        var that = this;
        this.getAttr();
        var isNewPlayer = playerVersion >= 8;
        var playerApiInfo = getApiInfo(isNewPlayer ? "avContentPlayer" : "_avcp", that.win);
        var playerApi = playerApiInfo.api;

        if (isNewPlayer && !playerApi) {
            playerApiInfo = getApiInfo("_avcp", that.win);
            playerApi = playerApiInfo.api;
            isNewPlayer = false;

            if (!playerApi) {
                a.baseJsUrl = null;
                that.load(7);

                return;
            }
        }

        if (!playerApi) {
            throw new Error("The player API was not found");
        }

        if (isNewPlayer) {
            if (typeof playerApi.create == "function") {
                playerApi.create(a)
                    .then(function (player) {
                        that.start(player);
                    });
            } else {
                playerApi.createPlayer(a)
                    .then(function (playerClass) {
                        that.start(new playerClass(a));
                    });
            }
        } else {
            that.start(new playerApi(a));
        }
    } catch (reason) {(console.error || console.log)(reason);}
        },
        postFeed: function() {
            
        },
        postLoadAsync: function(callback) {
            try {        var done = false;

        if (!config.waitForScroll) {
            callback();

            return;
        }

        var checkPos = function() {
            if (st.win.scrollY > 5) {
                return true;
            }
        };

        var scrollListener = function() {
            if (done) {
                return;
            }

            if (checkPos()) {
                st.win.removeEventListener("scroll", scrollListener);
                callback();
                done = true;
            }
        };

        if (st.win !== top || checkPos()) {
            callback();
        } else {
            st.win.addEventListener("scroll", scrollListener);
        }
    } catch (reason) {(console.error || console.log)(reason);}
        },
        findScript: function() {
            try {        if (!this.scriptEl) {
            a.scriptApi = a.scriptApi || window["av_scriptApi_" + a.scriptId];

            if (a.scriptApi && typeof a.scriptApi === "function") {
                var scriptEl = a.scriptApi();

                if (scriptEl != null) {
                    this.scriptEl = scriptEl;
                }
            }
        }

        if (!this.scriptEl) {
            this.scriptEl = document.getElementById(a.scriptId) || document.currentScript;
        }

        return this.scriptEl;
    } catch (reason) {(console.error || console.log)(reason);}
        },
        domRetry: 20
    };
    st.run();
})(window);
