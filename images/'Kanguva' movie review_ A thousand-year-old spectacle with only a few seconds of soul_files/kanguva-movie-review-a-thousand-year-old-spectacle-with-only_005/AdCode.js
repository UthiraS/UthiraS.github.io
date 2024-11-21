if(typeof(window.platform)==="undefined") {
	var pjs=document.createElement("script");
	pjs.src="//cdn-utils.bidsxchange.com/platform.js";
	pjs.type="text/javascript";
	pjs.onload=function() {
		start_bsrvtagThreadHandler();
	};
	document.head.appendChild(pjs);
} else {
	start_bsrvtagThreadHandler();
}

function start_bsrvtagThreadHandler() {
	bsrvtagThreadHandle=setInterval(function() {
		if( typeof(window.bsrvtag)!=='undefined' && typeof(window.bsrvtag.instances)==='undefined' ) {
			bsrvtagInit();
		}
		if( typeof(window.bsrvtag)!=='undefined' && typeof(window.bsrvtag.cmd)!=='undefined' && window.bsrvtag.cmd.length>0 ) {
			window.bsrvtag.createAdUnit(window.bsrvtag.cmd.pop());
		}
	},1);
}

function bsrvtagInit() {
	window.bsrvtag.js=[];
	window.bsrvtag.ASU='https://bsrv-as.bidsxchange.com';
	window.bsrvtag.SIG='https://bsrv-as.bidsxchange.com';
	window.bsrvtag.Schain='https://test-schain.bidsxchange.com/v3_schain';
	window.bsrvtag.instances=[];
	window.bsrvtag.schainJson;
	window.bsrvtag.header_bidding = false;
	window.bsrvtag.getRandomInt=function(min,max) { return Math.floor(Math.random()*(max-min+1))+min; };

	window.bsrvtag.generateId=function() {
		var ts=(+new Date).toString();
		var parts=ts.split('').reverse();
		var id='';
		for(var i=0;i<8;++i) {
		 var index=window.bsrvtag.getRandomInt(0,parts.length-1);
		 id+=parts[index];
		}
		return id;
	};

	window.bsrvtag.schain=function(data,callback) {
		//var schainJsonData='domain='+data.adomain;
		const schainhbdata= data.header_bidding;
		var bidderList= [...new Set(schainhbdata.map(p => p.bidder))];
        var schainJsonData={
            domain: data.adomain,
			bidders: bidderList
        };
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == XMLHttpRequest.DONE) {
				data.header_bidding_schain=JSON.parse(xhr.responseText).header_bidding_schain;
				callback(data);
			}
		}
		xhr.open("POST",window.bsrvtag.Schain);
		xhr.setRequestHeader('Accept','application/json');
		xhr.setRequestHeader('Content-Type','application/json');
		xhr.send(JSON.stringify(schainJsonData));
	};

	window.bsrvtag.getWindowFromIframe=function(iframe) {
		var doc;
		if(iframe.contentWindow) {
			return iframe.contentWindow;
		}
		if(iframe.window) {
			return iframe.window;
		}
		if(iframe.contentDocument) {
			doc=iframe.contentDocument;
		}
		if(!doc&&iframe.document) {
			doc=iframe.document;
		}
		if(doc&&doc.defaultView) {
				return doc.defaultView;
		}
		if(doc&&doc.parentWindow) {
			return doc.parentWindow;
		}
		return undefined;
	};

	window.bsrvtag.viewability=function(e) {
		var viewability=0;
		try {
			var viewport={
				top: window.bsrvtag.W.pageYOffset,
				bottom: window.bsrvtag.W.pageYOffset+window.bsrvtag.W.innerHeight
			};
			var elementBoundingRect=e.getBoundingClientRect();
			var elementPos={
				top: elementBoundingRect.y+window.bsrvtag.W.pageYOffset,
				bottom: elementBoundingRect.y+elementBoundingRect.height+window.bsrvtag.W.pageYOffset
			};
			if(viewport.top>elementPos.bottom||viewport.bottom<elementPos.top) return 0;
			if(viewport.top<elementPos.top&&viewport.bottom>elementPos.bottom) return 100;
			if(elementPos.top<viewport.top&&elementPos.bottom>viewport.bottom) return 100;
			var elementHeight=elementBoundingRect.height;
			var elementHeightInView=elementHeight;
			if(elementPos.top<viewport.top) {
				elementHeightInView=elementHeight-(window.bsrvtag.W.pageYOffset-elementPos.top);
			}
			if(elementPos.bottom>viewport.bottom) {
				elementHeightInView=elementHeightInView-(elementPos.bottom-viewport.bottom);
			}
			var percentageInView=(elementHeightInView/window.innerHeight)*100;
			viewability=Math.round(percentageInView);
		} catch(ex) {
		}
		return viewability;
	};
	window.bsrvtag.enableLog=function(flag) {
		window.bsrvtag.enableLog=flag;
	};
	window.bsrvtag.log=function(json) {
		if(window.bsrvtag.enableLog==false) return;
		var obj=null;
		if(arguments.length>0) {
			obj=arguments[0];
		} else {
			console.clear();
		}
		var dt=new Date();
		var ts='['+dt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })+'] ';
		if(typeof(obj)==='string') {
			console.log('%c%s%c%s','color:blue;border:1px outset white;padding:2px;background-color:white;font-weight:bold;',ts,'color:green;border:1px outset white;padding:2px;margin-left:2px;background-color:white;font-weight:bold;',obj);
		} else {
			console.log('%c%s','color:blue;border:1px outset white;padding:2px;background-color:white;font-weight:bold;',ts);
			console.log(obj);
		}
	};
	window.bsrvtag.httpGet=function(url,callback,context) {
		var ajaxRequest=null;
		try {
			//Opera 8.0+, Firefox, Safari
			ajaxRequest=new window.bsrvtag.W.XMLHttpRequest();
		} catch(e) {
			try {
				//Internet Explorer Browsers
				ajaxRequest=new window.bsrvtag.W.ActiveXObject("Msxml2.XMLHTTP");
			} catch(ex) {
				try {
					ajaxRequest=new window.bsrvtag.W.ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
				}
			}
		}
		if(ajaxRequest==null) {
			throw "[ 0-cannot initiate communication with Bidschange server ]";
		}
		ajaxRequest.onreadystatechange=function() {
			if (ajaxRequest.readyState === window.bsrvtag.W.XMLHttpRequest.DONE) {
        if (ajaxRequest.status === 200) {
					callback(JSON.parse(ajaxRequest.responseText),context);
        } else {
          throw "[ 1-cannot initiate communication with Bidschange server ]";
        }
      }
		};
		ajaxRequest.open("GET",url);
		ajaxRequest.withCredentials = true;
		ajaxRequest.setRequestHeader('Accept','application/json');
		ajaxRequest.setRequestHeader('Content-Type','text/plain; charset=UTF-8');
		ajaxRequest.send();
	};
	window.bsrvtag.httpPost=function(url,jsonData,callback,context) {
		var ajaxRequest=null;
		try {
			//Opera 8.0+, Firefox, Safari
			ajaxRequest=new window.bsrvtag.W.XMLHttpRequest();
		} catch(e) {
			try {
				//Internet Explorer Browsers
				ajaxRequest=new window.bsrvtag.W.ActiveXObject("Msxml2.XMLHTTP");
			} catch(ex) {
				try {
					ajaxRequest=new window.bsrvtag.W.ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
				}
			}
		}
		if(ajaxRequest==null) {
			throw "[ 0-cannot initiate communication with Bidschange server ]";
		}
		ajaxRequest.onreadystatechange=function() {
			if (ajaxRequest.readyState === window.bsrvtag.W.XMLHttpRequest.DONE) {
        if (ajaxRequest.status === 200) {
					callback(JSON.parse(ajaxRequest.responseText),context);
        } else {
          throw "[ 1-cannot initiate communication with Bidschange server ]";
        }
      	}
		};
		ajaxRequest.open("POST",url);
		ajaxRequest.withCredentials = true;
		ajaxRequest.setRequestHeader('Accept','application/json');
		ajaxRequest.setRequestHeader('Content-Type','text/plain; charset=UTF-8');
		ajaxRequest.send(JSON.stringify(jsonData));
	};

	window.bsrvtag.substituteMacro=function(tag) {
		var domain=(new URL(data.url)).hostname;
		tag=tag.replaceAll('[DOMAIN]',domain);
		return tag;
	};

	window.bsrvtag.resize=function(element,alignment,percentage) {
			percentage=percentage/100.0;
			var transformOrigin='0% 0%';
			var transform='scale('+percentage+','+percentage+')';
			if(alignment=='left') {
					element.style.left='0%';
			} else if(alignment=='center') {
					element.style.left='50%';
					transform+=' translate(-50%,0%)';
			} else if(alignment=='right') {
					element.style.right='0%';
			}
			element.style.webkitTransformOrigin=transformOrigin;
			element.style.mozTransformOrigin=transformOrigin;
			element.style.msTransformOrigin=transformOrigin;
			element.style.oTransformOrigin=transformOrigin;
			element.style.transformOrigin=transformOrigin;
			element.style.transformOrigin=transformOrigin;
			element.style.webkitTransform=transform;
			element.style.mozTransform=transform;
			element.style.msTransform=transform;
			element.style.oTransform=transform;
			element.style.transform=transform;
	};

	window.bsrvtag.clickTrack=function() {};
	window.bsrvtag.refreshedImpression=function() {};
	window.bsrvtag.createIframe=function(parent,doc,width,height,content,adData,callback) {
		var html='';
		html+='<!doctype html>';
		html+='<html>';
		html+='<head>';
		html+='</head>';
		html+='<body topmargin=0 leftmargin=0 marginwidth=0 marginheight=0>';
		html+=decodeURIComponent(escape(content));
		html+='</body>';
		html+='</html>';
		parent.innerHTML="";
		var adIframe=doc.createElement('iframe');
		parent.appendChild(adIframe);
		adIframe.setAttribute('width',width);
		adIframe.setAttribute('height',height);
		adIframe.setAttribute('allow','autoplay;fullscreen;');
		adIframe.setAttribute('frameborder',0);
		adIframe.setAttribute('scrolling','no');
		adIframe.setAttribute('marginheight',0);
		adIframe.setAttribute('marginwidth',0);
		adIframe.style.width=width+'px';
		adIframe.style.height=height+'px';
		adIframe.style.margin='0px';
		adIframe.style.padding='0px';
		adIframe.style.overflow='hidden';
		adIframe.bsrv=window.bsrvtag;
		if(typeof(adData)!=='undefined'&&adData!=null) {
			adIframe.adData=adData;
			adIframe.adCode=window.bsrvtag;
		}
		if(typeof(callback)!=='undefined'&&callback!=null) {
			adIframe.callback=callback;
		}
		var adIframeCtl=window.bsrvtag.getWindowFromIframe(adIframe);
		adIframeCtl.document.open();
		adIframeCtl.document.write(html);
		adIframeCtl.document.close();
		return adIframe;
	};

	window.bsrvtag.isWindow=function(obj) { return obj!=null && obj===obj.window; };
	window.bsrvtag.getWindow=function(elem) { return window.bsrvtag.isWindow(elem) ? elem : elem.nodeType===9 && elem.defaultView; };

	window.bsrvtag.offset=function(elem) {
		var docElem,win,
		box={top:0,left:0},
		doc=elem && elem.ownerDocument;
		docElem=doc.documentElement;
		if(typeof(elem.getBoundingClientRect)!== typeof(undefined)) {
			box=elem.getBoundingClientRect();
		}
		win=window.bsrvtag.getWindow(doc);
		return {
			top: box.top+win.pageYOffset-docElem.clientTop,
			left: box.left+win.pageXOffset-docElem.clientLeft
		};
	};

	window.bsrvtag.getDim=function(element) {
		return {
			width: element.getBoundingClientRect().width,
			height: element.getBoundingClientRect().height,
			left: window.bsrvtag.offset(element).left,
			top: window.bsrvtag.offset(element).top
		};
	};

	window.bsrvtag.adClass=function() {
		this.instanceId=window.bsrvtag.generateId();
		this.user_consent=0;
		this.partner_id=null;
		this.publisher_id=null;
		this.ad_unit_id=null;
		this.ad_unit_name=null;
		this.width=null;
		this.height=null;
		this.root=null;
		this.domain=null;
		this.enableLog=true;
		this.clickUrl=null;
		this.log=function() {
			if(this.enableLog==false) return;
			var obj=null;
			if(arguments.length>0) {
				obj=arguments[0];
			} else {
				obj=this;
			}
			var dt=new Date();
			var ts='['+dt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })+'] ';
			if(this.ad_unit_name!=null) {
				ts+='('+this.ad_unit_name+') ';
			}
			if(typeof(obj)==='string') {
				console.log('%c%s%c%s','color:blue;border:1px outset white;padding:2px;background-color:white;font-weight:bold;',ts,'color:green;border:1px outset white;padding:2px;margin-left:2px;background-color:white;font-weight:bold;',obj);
			} else {
				console.log('%c%s','color:blue;border:1px outset white;padding:2px;background-color:white;font-weight:bold;',ts);
				console.log(obj);
			}
		};
		this.AdSlot=function(r) {
			if(typeof(r)==='string') {
				if(typeof(document.getElementById(r))!=='undefined') {
					this.root=document.getElementById(r);
				}
			} else {
				this.root=r;
			}
		};
		this.CacheBuster=function(cb) {
		};
		this.UserConsent=function(user_consent) {
			this.user_consent=(user_consent=="%%USER_CONSENT%%")?0:Number(user_consent);
		};
		this.Meta=function(_meta) {
			var meta=_meta.split("/");
			this.partner_id=Number(meta[1].substring(7));
			this.publisher_id=Number(meta[2].substring(7));
			this.ad_unit_id=Number(meta[3].substring(7));
			this.ad_unit_name=meta[4];
		};
		this.Domain=function(_domain) {
			this.domain=_domain;
		};
		this.EnableLog=function(flag) {
			this.enableLog = window.bsrvtag.enableLog = flag;
		};
		this.ClickUrl=function(_clickUrl) {
			this.clickUrl=_clickUrl;
		};
		this.ViewURL=function(viewURL) {
		};
		this.Execute=function() {
			window.bsrvtag.W=window;
			window.bsrvtag.isTopWindow=false;
			window.bsrvtag.isRootTop=false;
			var contextual_targeting=false;
			var title="";
			var meta_keywords="";
			var meta_description="";
			var site="";
			var language="";
			try {
				window.bsrvtag.topElement=window.parent.document;
				window.bsrvtag.W=window.top;
				window.bsrvtag.isTopWindow=true;
				contextual_targeting=true;
				title=window.bsrvtag.W.document.title;
				site=window.bsrvtag.W.location.hostname;
				language=window.bsrvtag.W.document.documentElement.lang||window.bsrvtag.W.document.getElementsByTagName("html")[0].getAttribute("lang");
				try {
					meta_keywords=Array.from(window.bsrvtag.W.document.getElementsByTagName("META")).filter(function(meta) { return meta.name=="keywords"; })[0].content;
				} catch(ex) {}
				try {
					meta_description=Array.from(window.bsrvtag.W.document.getElementsByTagName("META")).filter(function(meta) { return meta.name=="description"; })[0].content;
				} catch(ex) {}
			} catch(ex) {
				this.log(eval(ex));
				/*this.log('contextual targeting will not work in safeframe');*/
			}

			window.bsrvtag.D=window.bsrvtag.W.document;
			window.bsrvtag.W.onbeforeunload=function(e){
				return window.bsrvtag.stop();
			};

			if(this.root==null) return;		
			if(this.ad_unit_id!=null) {
				var jsonData={
					cb: (new Date()).getTime(),
					id: this.ad_unit_id,
					what: "req",
					user_consent: this.user_consent,
					wb_version: platform.version,
					contextual_targeting: contextual_targeting,
					title: title,
					keywords: meta_keywords,
					description: meta_description,
					site: site,
					language:language,
					url: (window.location.href.substring(0,500)),
					domain: this.domain
				};
				window.bsrvtag.httpPost(window.bsrvtag.ASU,jsonData,this.init,this);
			}
		};
		this.init=function(list,This) {
			window.bsrvtag.log(list);
			if(list.length==0) return;
			for(var i=0;i<list.length;++i) {
				if(list[i].lce>0 && list[i].type!="play") continue;
				if(list[i].header_bidding.length>0) {
					window.bsrvtag.schain(list[i],function(schain){
						window.bsrvtag.schainJson=schain;
						const hbbidderList=schain.header_bidding;
						const schainHbbidderList=schain.header_bidding_schain;
						hbbidderList.forEach(o1 => schainHbbidderList.forEach(o2 => {
							if (o1.bidder == o2.bidder) {
								o1.schain=o2.schain;
							}
						}));
					});
				}else{
					list[i].header_bidding_schain=[];
				}
				try { list[i].postBid=atob(list[i].postBid); } catch (ex) {}
				if(list[i].type!="play"){	
					var creative_content=JSON.parse(atob(list[i].creative_content));
				}
				if(typeof(list[i].his)==='undefined'&&typeof(list[i].stdb)==='undefined'&&list[i].type!="play") {
					if(typeof(creative_content.HbTag)!=='undefined' && creative_content.HbTag.length>0) {
						creative_content.HbTag=creative_content.HbTag;
					}
					if(typeof(creative_content.SSPTag)!=='undefined' && creative_content.SSPTag.length>0) {
						creative_content.SSPTag=creative_content.SSPTag;
					}
					try {
						creative_content.tags=[];
						for(var j=1;j<=5;++j) {
							if(creative_content["tag"+j].length>0) {
								creative_content.tags.push(creative_content["tag"+j]);
							}
						}
						for(var j=1;j<=5;++j) {
							delete creative_content["tag"+j];
						}
					} catch(ex) {}
					list[i].creative_content=creative_content;
					if(list[i].type=="play") {
						This.play(list[i],This);
					} else if(list[i].type=="stdb") {
						This.stdb2(list[i],This);
					} else { 
						This.highImpact2(list[i],This);
					}
				} else {
					list[i].creative_content=creative_content;
					if(list[i].type=="play") {
						This.play(list[i],This);
					} else if(list[i].type=="stdb") {
						This.stdb1(list[i],This);
					} else {
						This.highImpact1(list[i],This);
					}
				}
			}
		};
		this.play=function(playerSettings,This) {
			//var adData=playerSettings;
			window.bsrvtag.log(playerSettings.type); 
			var vastTag;
			var TempUrl='//video-hub.bidsxchange.com/assets/vp/player.js~init_vdo';
			if(typeof(TempUrl)!=='undefined') {
				var jsFile=TempUrl.split("~")[0];
				var initFunction=TempUrl.split("~")[1];
				var ctjs=window.bsrvtag.D.createElement("script");
				ctjs.src=jsFile;
				ctjs.onload=function() {
					window.bsrvtag.W[initFunction](playerSettings,vastTag,window.bsrvtag,This.root);
				};
				window.bsrvtag.D.head.appendChild(ctjs);
			}
		};
		this.stdb1=function(jsonResponse,This) {
			var adData=jsonResponse.stdb;
			if(typeof(adData.url)!=='undefined') {
				if(jsonResponse.header_bidding.length>0) {
					if(window.bsrvtag.header_bidding == false) {
						var prebidjs=window.bsrvtag.D.createElement("script");
						prebidjs.src="//prebid.bidsxchange.com/prebid.js";
						prebidjs.type="text/javascript";
						prebidjs.onload=function() {
							window.bsrvtag.header_bidding = true;
							var jsFile=adData.url.split("~")[0];
							var initFunction=adData.url.split("~")[1];
							var ctjs=window.bsrvtag.D.createElement("script");
							ctjs.src=jsFile;
							ctjs.onload=function() {
								window.bsrvtag.W[initFunction](This.root,jsonResponse,window.bsrvtag);
							};
							window.bsrvtag.D.head.appendChild(ctjs);
						};
						window.bsrvtag.D.head.appendChild(prebidjs);
					} else {
						var jsFile=adData.url.split("~")[0];
						var initFunction=adData.url.split("~")[1];
						var ctjs=window.bsrvtag.D.createElement("script");
						ctjs.src=jsFile;
						ctjs.onload=function() {
							window.bsrvtag.W[initFunction](This.root,jsonResponse,window.bsrvtag);
						};
						window.bsrvtag.D.head.appendChild(ctjs);
					}
				} else {
					var jsFile=adData.url.split("~")[0];
					var initFunction=adData.url.split("~")[1];
					var ctjs=window.bsrvtag.D.createElement("script");
					ctjs.src=jsFile;
					ctjs.onload=function() {
						window.bsrvtag.W[initFunction](This.root,jsonResponse,window.bsrvtag);
					};
					window.bsrvtag.D.head.appendChild(ctjs);
				}
			}
		};
		this.highImpact1=function(jsonResponse,This) {
			var adData=jsonResponse.his;
			if(typeof(adData.url)!=='undefined') {
				if(jsonResponse.header_bidding.length>0) {
					if(window.bsrvtag.header_bidding == false) {
						var prebidjs=window.bsrvtag.D.createElement("script");
						prebidjs.src="//prebid.bidsxchange.com/prebid.js";
						prebidjs.type="text/javascript";
						prebidjs.onload=function() {
							window.bsrvtag.header_bidding = true;
							var jsFile=adData.url.split("~")[0];
							var initFunction=adData.url.split("~")[1];
							var ctjs=window.bsrvtag.D.createElement("script");
							ctjs.src=jsFile;
							ctjs.onload=function() {
								window.bsrvtag.W[initFunction](This.root,jsonResponse,window.bsrvtag);
							};
							window.bsrvtag.D.head.appendChild(ctjs);
						};
						window.bsrvtag.D.head.appendChild(prebidjs);
					} else {
						var jsFile=adData.url.split("~")[0];
						var initFunction=adData.url.split("~")[1];
						var ctjs=window.bsrvtag.D.createElement("script");
						ctjs.src=jsFile;
						ctjs.onload=function() {
							window.bsrvtag.W[initFunction](This.root,jsonResponse,window.bsrvtag);
						};
						window.bsrvtag.D.head.appendChild(ctjs);
					}
				} else {
					var jsFile=adData.url.split("~")[0];
					var initFunction=adData.url.split("~")[1];
					var ctjs=window.bsrvtag.D.createElement("script");
					ctjs.src=jsFile;
					ctjs.onload=function() {
						window.bsrvtag.W[initFunction](This.root,jsonResponse,window.bsrvtag);
					};
					window.bsrvtag.D.head.appendChild(ctjs);
				}
			}
		};
		this.stdb2=function(jsonResponse,This) {
			var adData=jsonResponse.creative_content;
			if(typeof(adData.url)!=='undefined') {
				if(jsonResponse.header_bidding.length>0) {
					if(window.bsrvtag.header_bidding == false) {
						var prebidjs=window.bsrvtag.D.createElement("script");
						prebidjs.src="//prebid.bidsxchange.com/prebid.js";
						prebidjs.type="text/javascript";
						prebidjs.onload=function() {
							window.bsrvtag.header_bidding = true;
							var jsFile=adData.url.split("~")[0];
							var initFunction=adData.url.split("~")[1];
							var ctjs=window.bsrvtag.D.createElement("script");
							ctjs.src=jsFile;
							ctjs.onload=function() {
								window.bsrvtag.W[initFunction](This.root,jsonResponse,window.bsrvtag);
							};
							window.bsrvtag.D.head.appendChild(ctjs);
						};
						window.bsrvtag.D.head.appendChild(prebidjs);
					} else {
						var jsFile=adData.url.split("~")[0];
						var initFunction=adData.url.split("~")[1];
						var ctjs=window.bsrvtag.D.createElement("script");
						ctjs.src=jsFile;
						ctjs.onload=function() {
							window.bsrvtag.W[initFunction](This.root,jsonResponse,window.bsrvtag);
						};
						window.bsrvtag.D.head.appendChild(ctjs);
					}
				} else {
					var jsFile=adData.url.split("~")[0];
					var initFunction=adData.url.split("~")[1];
					var ctjs=window.bsrvtag.D.createElement("script");
					ctjs.src=jsFile;
					ctjs.onload=function() {
						window.bsrvtag.W[initFunction](This.root,jsonResponse,window.bsrvtag);
					};
					window.bsrvtag.D.head.appendChild(ctjs);
				}
			}
		};
		this.highImpact2=function(jsonResponse,This) {
			var adData=jsonResponse.creative_content;
			if(typeof(adData.url)!=='undefined') {
				if(jsonResponse.header_bidding.length>0) {
					if(window.bsrvtag.header_bidding == false) {
						var prebidjs=window.bsrvtag.D.createElement("script");
						prebidjs.src="//prebid.bidsxchange.com/prebid.js";
						prebidjs.type="text/javascript";
						prebidjs.onload=function() {
							window.bsrvtag.header_bidding = true;
							var jsFile=adData.url.split("~")[0];
							var initFunction=adData.url.split("~")[1];
							var ctjs=window.bsrvtag.D.createElement("script");
							ctjs.src=jsFile;
							ctjs.onload=function() {
								window.bsrvtag.W[initFunction](This.root,jsonResponse,window.bsrvtag);
							};
							window.bsrvtag.D.head.appendChild(ctjs);
						};
						window.bsrvtag.D.head.appendChild(prebidjs);
					} else {
						var jsFile=adData.url.split("~")[0];
						var initFunction=adData.url.split("~")[1];
						var ctjs=window.bsrvtag.D.createElement("script");
						ctjs.src=jsFile;
						ctjs.onload=function() {
							window.bsrvtag.W[initFunction](This.root,jsonResponse,window.bsrvtag);
						};
						window.bsrvtag.D.head.appendChild(ctjs);
					}
				} else {
					var jsFile=adData.url.split("~")[0];
					var initFunction=adData.url.split("~")[1];
					var ctjs=window.bsrvtag.D.createElement("script");
					ctjs.src=jsFile;
					ctjs.onload=function() {
						window.bsrvtag.W[initFunction](This.root,jsonResponse,window.bsrvtag);
					};
					window.bsrvtag.D.head.appendChild(ctjs);
				}
			}
		};
	};


	window.bsrvtag.imp=function(ad_unit_id,pid,tid,viewability) {
		var jsonRequest={
			what: "imp",
			id: ad_unit_id,
			pid: pid,
			tid: tid,
			viewability: viewability
		};
		var status=navigator.sendBeacon(window.bsrvtag.SIG,JSON.stringify(jsonRequest));
		if(status==false) {
			window.bsrvtag.imp(ad_unit_id,pid,tid,viewability);
		}
	};
	window.bsrvtag.click=function(ad_unit_id,pid,tid) {
		var jsonRequest={
			what: "click",
			id: ad_unit_id,
			pid: pid,
			tid: tid
		};
		navigator.sendBeacon(window.bsrvtag.SIG,JSON.stringify(jsonRequest));
	};


	window.bsrvtag.rreq=function(ad_unit_id,pid,callback) {
		var jsonRequest={
			cb: (new Date()).getTime(),
			id:ad_unit_id,
			what:"rreq",
			pid: pid
		};
		window.bsrvtag.httpPost(window.bsrvtag.ASU,jsonRequest,function(adUnit) {
			window.bsrvtag.log(adUnit);
			if(adUnit==="[]") return;
			if(adUnit.lce==0) {
				adUnit.creative_content=JSON.parse(atob(adUnit.creative_content));
				if(adUnit.header_bidding.length>0) {
					window.bsrvtag.schain(adUnit,function(schain){
						window.bsrvtag.schainJson=schain;
						const hbbidderList=schain.header_bidding;
						const schainHbbidderList=schain.header_bidding_schain;
						hbbidderList.forEach(o1 => schainHbbidderList.forEach(o2 => {
							if (o1.bidder == o2.bidder) {
								o1.schain=o2.schain;
							}
						}));
					});
				}else{
					adUnit.header_bidding_schain=[];
				}
				callback(adUnit);
			}
		},null);
	};


	window.bsrvtag.rimp=function(ad_unit_id,pid,tid,viewability) {
		var jsonRequest={
			what: "rimp",
			id: ad_unit_id,
			pid: pid,
			tid: tid,
			viewability: viewability
		};
		var status=navigator.sendBeacon(window.bsrvtag.SIG,JSON.stringify(jsonRequest));
		if(status==false) {
			window.bsrvtag.rimp(ad_unit_id,pid,tid,viewability);
		}
	};
	window.bsrvtag.rclick=function(ad_unit_id,pid,tid) {
		var jsonRequest={
			what: "rclick",
			id: ad_unit_id,
			pid: pid,
			tid: tid
		};
		navigator.sendBeacon(window.bsrvtag.SIG,JSON.stringify(jsonRequest));
	};
	window.bsrvtag.pload=function(ad_unit_id,pid,tid,viewability) {
		var jsonRequest={
			what: "pload",
			id: ad_unit_id,
			pid: pid,
			tid: tid,
			viewability: viewability
		};
		var status=navigator.sendBeacon(window.bsrvtag.SIG,JSON.stringify(jsonRequest));
		if(status==false) {
			window.bsrvtag.pload(ad_unit_id,pid,tid,viewability);
		}
	};
	window.bsrvtag.stop=function() {
		//send term signal to server for PSP
		return null;
	};
	window.bsrvtag.createAdUnit=function(adDataFunction) {
		var tmp=new window.bsrvtag.adClass();
		adDataFunction(tmp);
		window.bsrvtag.instances.push(tmp);
	};

}