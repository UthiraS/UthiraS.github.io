function init_intr(root,adData,utils) {
  var This={};
  This.adData=adData.his;
  This.adDataContent=adData.creative_content;
  This.pid=adData.pid;
  This.tid=adData.tid;
  var log=utils.log;
  This.utils=utils;
  This.prebidUrl='//prebid.bidsxchange.com/prebid.js';
  function scriptExists(url){
    return This.utils.D.querySelectorAll(`script[src="${url}"]`).length>0;
  }

  if(!scriptExists(This.prebidUrl)){
    var pjs=This.utils.D.createElement("script");
    pjs.src="//prebid.bidsxchange.com/prebid.js";
    pjs.type="text/javascript";
    This.utils.D.head.appendChild(pjs);
  }

  if(This.adData.disableLogging==undefined){ This.disableLogging=true}else{This.disableLogging=This.adData.disableLogging};
  //This.utils.enableLog(This.disableLogging);
  This.width=Number(This.adData.size.split("x")[0]);
  This.height=Number(This.adData.size.split("x")[1]);
  This.margin_bottom=Number(This.adData.margin_bottom);
  This.margin_left=Number(This.adData.margin_left);
  This.margin_right=Number(This.adData.margin_right);
  This.zoomPercentage=Number(This.adData.zoom_percentage);
  This.close_button=This.adData.close_button;
  This.googleDemandTag=This.adData.googleDemandTag;
  This.refresh=Boolean(This.adData.refresh);
  This.pixel=This.adData.third_party;
  This.zIndex=Number(This.adData.z_index);
  This.tags=This.adDataContent.SSPTag;
  This.blur=Boolean(This.adData.show_blur);
  if(This.adData.bluePercentage==undefined){This.bluePercentage=8;}else{This.bluePercentage=Number(This.adData.bluePercentage/10)};
  if(This.bluePercentage>10){This.bluePercentage=10;}
  This.i=-1;
  This.count=0;
  This.IframeCount=0;
  if(This.adData.refresh_interval<25){This.refreshInterval=25}else{This.refreshInterval=Number(This.adData.refresh_interval)};
  if(This.adData.close_button_delay<2){This.closeButtonDelay=2}else{This.closeButtonDelay=This.adData.close_button_delay};
  if(This.adData.refresh){This.refreshCycle=2}else{This.refreshCycle=1}
  if(This.adData.ad_open_delay==undefined){This.adLoad_delay=1000}else{This.adLoad_delay=(This.adData.ad_open_delay)*1000};
  This.device=adData.device;
  This.accidentalClick=Boolean(This.adData.accidentalClick);
  This.smartRefresh=Boolean(This.adData.smartRefresh);
  This.bandName=This.adData.bandName;
  This.showBranding=Boolean(This.adData.showBranding);
  This.content_length=24;
  This.collections=[];
  This.skip_home=Boolean(This.adData.skip_home);
  if(This.adDataContent.HbTag!=undefined){This.HbTag=This.adDataContent.HbTag.replace("document.getElementById(placementId).append(fallback);","window.frameElement.callback();")};
  This.isHb=false;
  This.isHbEmpty=false;
  This.HbWitTime=1.5;
  if(This.adData.autoCloseAd==undefined){ This.autoCloseAd=false;}else{This.autoCloseAd=This.adData.autoCloseAd};
  if(This.adData.openFrameonlyOnAd==undefined){ This.openFrameonlyOnAd=true;}else{This.openFrameonlyOnAd=This.adData.openFrameonlyOnAd};
  This.isAd=false;
  if(This.utils.D.querySelectorAll('iframe[id^="Bsrv_int"]').length>0){
    This.checkIframeIf=This.utils.D.querySelectorAll('iframe[id^="Bsrv_int"]');
    //log(This.checkIframeIf);
    for (let i = 0; i < This.checkIframeIf.length; i++) {
      This.checkIframeIf[i].remove();
    }
    This.checkIBlure= This.utils.D.querySelectorAll('blur[id^="Bsrv_Blur"]');
    for (let j = 0; j < This.checkIBlure.length; j++) {
      if(This.blur){ 
        This.checkIBlure[j].remove();
       }
    }
  }
  This.tabOnView=true;
  if(This.adData.RefrehOnTabView && typeof This.utils.D.hidden !== "undefined"){
    This.hidden="hidden";
    This.visibilityChange="visibilitychange";
    function handleVisibilityChange(){
      if (This.utils.D[This.hidden]) {
        This.tabOnView=false;
        //log("Tab is not in view");
      }else{
        This.tabOnView=true;
        //log("Tab is in view");
      }
    }
    This.utils.D.addEventListener(This.visibilityChange, handleVisibilityChange, false);
  } 
  // else {
  //   log("Page Visibility API is not supported in this browser");
  // }
  
  This.closeOnBlur=Boolean(This.adData.closeOnBlur);
  if(This.adData.closeForcefully==undefined){ This.closeForcefully=false}else{This.closeForcefully=Boolean(This.adData.closeForcefully)};
  if(This.adData.refreshCountLimit>10 || This.adData.refreshCountLimit==undefined){This.countLimit=10}else{This.countLimit=Number(This.adData.refreshCountLimit)};
  if(This.adData.closeButtonSize==undefined){This.adData.closeButtonSize='medium'};
  switch(This.adData.closeButtonSize) {
    case 'small': {
      This.closeButtonHeight=(This.adData.close_button!='none')?15:0;
    }break;
    case 'medium': {
      This.closeButtonHeight=(This.adData.close_button!='none')?25:0;
    }break;
    case 'large': {
      This.closeButtonHeight=(This.adData.close_button!='none')?35:0;
    }break;
  }
  if(This.adData.autoCloseAd_Timer==undefined){This.autoCloseAd_Timer=5}else{This.autoCloseAd_Timer=Number(This.adData.autoCloseAd_Timer)};
  This.callback=function() {
    This.isHbEmpty=true;
  }

  if(adData.header_bidding.length>0){This.perbidOption=true;}else{This.perbidOption=false;}
  This.hBGetData=function(hbData,adUnitName){
    This.headerBiddingParms=[];
    for(var i in hbData) {
      This.HbInfo=hbData[i];
      This.actualFloorPrice=Number(This.HbInfo.floorPrice.toFixed(2));
      This.mediaTypes={
        banner: { sizes: [[Number(This.HbInfo.size.split("x")[0]), Number(This.HbInfo.size.split("x")[1])]]}
      };
      This.florePrice={
        currency: 'USD',
        schema: {
          fields: ['mediaType']
        },
        values: {
          'banner': This.actualFloorPrice
        }
      };
      //log(This.HbInfo);
      for(var j in This.HbInfo.conditions) {
        This.BidderParms={
          bidderName:This.HbInfo.buyerName,
          bidderID:This.HbInfo.buyerId,
          schain: { ver:"1.0", complete: 1, nodes: This.HbInfo.schain},
          //Imp
          bidder:This.HbInfo.bidder,
          params:This.HbInfo.conditions[j]
        };
        const setHbrequest=2; 
				for(var i=0;i<setHbrequest;i++) {
          This.headerBiddingParms.push({
            "code": adUnitName,
            "mediaTypes": This.mediaTypes,
            "floors": This.florePrice,
            "bids" : [This.BidderParms]
          });
				}

        if(This.HbInfo.isSecondaryFloorPriceEnabled){
          This.secondaryFloorPrice=Number(This.HbInfo.secondaryFloorPrice.toFixed(2));
          This.SecondaryflorePrice={
            currency: 'USD',
            schema: {
              fields: ['mediaType']
            },
            values: {
              'banner':This.secondaryFloorPrice
            }
          };
          This.headerBiddingParms.push({
            "code": adUnitName,
            "mediaTypes": This.mediaTypes,
            "floors": This.SecondaryflorePrice,
            "bids" : [This.BidderParms]
          });
        }
      }
    }
    return This.headerBiddingParms;
  }

  var status=true;
  if(This.skip_home) {
    var url=This.utils.W.location.href;
    const forwardSlashCount = (url.match(/\//g) || []).length;
    const thirdforwardSlashCount = url.split('/', 3).join('/').length;
    if(forwardSlashCount >= 3 && thirdforwardSlashCount < url.length - 1) {
      //log(true);
    } else {
      status=false;
      log('skipped-1');
      return;
    }
  }
  
  for(i=0; i<This.adData.skip_urls_ending_with.length; i++){
    This.skip_urls_ending_with=(This.adData.skip_urls_ending_with[i].length>0)?This.adData.skip_urls_ending_with[i].length:null;
    if(This.skip_urls_ending_with!=null&&This.utils.W.location.href.endsWith(This.skip_urls_ending_with)) {
      status=false;
      log('skipped-2');
      return;
    }
  }
  for(j=0; j<This.adData.skip_urls_containing.length; j++){
    This.skip_urls_containing=(This.adData.skip_urls_containing[j].length>0)?This.adData.skip_urls_containing[j].length:null;
    if(This.skip_urls_containing!=null&&This.utils.W.location.href.search(This.skip_urls_containing)>-1) {
      status=false;
      log('skipped-3');
      return;
    }
  }

  {
    This.isOpera=(!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    This.isFirefox=typeof InstallTrigger !== 'undefined';
    This.isSafari=/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
    This.isIE=/*@cc_on!@*/false || !!document.documentMode;
    This.isEdge=!This.isIE && !!window.StyleMedia;
    This.isChrome=!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    This.isEdgeChromium=This.isChrome && (navigator.userAgent.indexOf("Edg") != -1);
    This.isBlink=(This.isChrome||This.isOpera) && !!window.CSS;
  }

  function onScroll(event) {
    var wheelValue=(event.wheelDelta)?event.wheelDelta:event.deltaY;
    var isUp=(event.wheelDelta)?event.wheelDelta>0:event.deltaY<0;
    This.This.adData.root.style.display=(isUp)?'flex':'none';
  }
  
  function onScrollUni(event) {
    adData.isUp=true;
    if(This.utils.W.pageYOffset > 0) {
      adData.isUp=false;
    }
    // log(event);
    // log(adData.isUp);
    This.This.adData.root.style.display=(adData.isUp)?'flex':'none';
  }
  
  This.delayLoadAd=setInterval(function() {
    This.start=new Date().getTime();
    This.adData.root=This.utils.D.body;
    This.adData.root.style.position='relative';
    This.adData.blur=This.utils.D.createElement('blur');
    if(This.blur){  
      //This.adData.blur.style.backgroundColor='rgb(237 238 242 / 87%)';
      This.adData.blur.style.backgroundColor='rgb(2 7 26 / 37%)';
      This.adData.blur.style.backdropFilter='blur('+This.bluePercentage+'px)';
      This.adData.blur.style.webkitBackdropFilter='blur('+This.bluePercentage+'px)';
      This.adData.blur.style.mozBackdropFilter='blur('+This.bluePercentage+'px)';
      This.adData.blur.style.msBackdropFilter='blur('+This.bluePercentage+'px)';
      This.adData.blur.style.oBackdropFilter='blur('+This.bluePercentage+'px)';
    }
    
    This.adData.blur.style.position='fixed';
    This.adData.blur.style.top ='0px';
    This.adData.blur.style.left='0px';
    This.adData.blur.style.zIndex='9999999998';
    This.adData.blur.setAttribute('id', 'Bsrv_Blur');
    This.adData.root.appendChild(This.adData.blur);
        
    This.adData.support_width=34;
    This.adData.support_height=20;
        
    This.adData.support=This.utils.D.createElement('div');
    This.adData.blur.appendChild(This.adData.support);
    //This.adData.support.style.backgroundColor='white';
    This.adData.support.style.borderRadius='10px';
    This.adData.support.style.position='fixed';
    This.adData.support.style.top='10%';   
    This.adData.support.style.marginTop=This.margin_bottom+'px';     
    This.adData.support.style.marginLeft=This.margin_left+'px';     
    
    //Show Barnding
    if(This.showBranding) {
      This.adData.adBanner = This.utils.D.createElement('div');
      This.adData.support.appendChild(This.adData.adBanner);
      This.adData.adBanner.setAttribute('id', 'bsrvBrand');
      This.adData.adBanner.style.position = 'absolute';
      This.adData.adBanner.style.color = 'rgb(7 83 134)';
      This.adData.adBanner.style.width = '100%';
      This.adData.adBanner.style.height = '15px';
      This.adData.adBanner.style.top = '-20px';
      This.adData.adBanner.style.fontSize = '10px';
      This.adData.adBanner.style.fontFamily = 'arial,serif';
      This.adData.adBanner.style.textAlign = 'center';
      This.adData.adBanner.style.display = 'none';
      //This.adData.adBanner.innerHTML = 'Ads By'

      This.adData.adBannerSpan = This.utils.D.createElement('span');
      This.adData.adBanner.appendChild(This.adData.adBannerSpan);
      This.adData.adBannerSpan.style.backgroundColor = '#e2e1e1';
      This.adData.adBannerSpan.style.padding = '0.24em 1.0em 0.25em';
      This.adData.adBannerSpan.style.borderRadius = '50px 10px';
      This.adData.adBannerSpan.innerHTML = 'Ads By';

      This.adData.adBannerLink = This.utils.D.createElement('a');
      This.adData.adBannerSpan.appendChild(This.adData.adBannerLink);
      //This.adData.adBannerLink.addEventListener('click', function (event) { adBanner(); }, false);
      This.adData.adBannerLink.setAttribute('href', 'javascript:;');
      This.adData.adBannerLink.style.display = 'inline';
      This.adData.adBannerLink.style.color = 'rgb(7 83 134)';
      This.adData.adBannerLink.style.lineHeight = '15px';
      This.adData.adBannerLink.style.position = 'relative';
      This.adData.adBannerLink.style.fontSize = '10px';
      This.adData.adBannerLink.style.fontFamily = 'arial,serif';
      This.adData.adBannerLink.style.fontWeight = 'bold';
      This.adData.adBannerLink.innerHTML = ' ' + This.bandName;


      // This.adData.adBrandingDiv = This.utils.D.createElement('div');
      // This.utils.D.body.appendChild(This.adData.adBrandingDiv);
      // This.adData.adBrandingDiv.setAttribute('id', 'bsrvBrandDiv');
      // This.adData.adBrandingDiv.addEventListener('click', function (event) {
      //   This.utils.D.body.style.overflow = 'visible';
      //   This.adData.adBrandingDiv.style.opacity = '0';
      //   This.adData.adBrandingDiv.style.display = 'none';
      // }, false);
      // This.adData.adBannerLink.setAttribute('href', 'javascript:;');
      // This.adData.adBrandingDiv.style.position = 'fixed';
      // This.adData.adBrandingDiv.style.zIndex = '11111111';
      // This.adData.adBrandingDiv.style.background = 'rgba(0,0,0,0.5)';
      // This.adData.adBrandingDiv.style.opacity = '0';
      // This.adData.adBrandingDiv.style.display = 'none';
      // This.adData.adBrandingDiv.style.left = '0';
      // This.adData.adBrandingDiv.style.top = '0';
      // This.adData.adBrandingDiv.style.bottom = '0';
      // This.adData.adBrandingDiv.style.right = '0';

      // This.adData.adBrandingModal = This.utils.D.createElement('iframe');
      // This.adData.adBrandingModal.setAttribute('src', 'https://assets.bidsxchange.com');
      // This.adData.adBrandingDiv.appendChild(This.adData.adBrandingModal);
      // This.adData.adBrandingModal.setAttribute('id', 'bsrvBrandModal');
      // This.adData.adBrandingModal.style.position = 'absolute';
      // This.adData.adBrandingModal.style.background = 'rgb(7 83 134)';
      // if(This.device!='desktop'){
      //   This.adData.adBrandingModal.style.width = 'fit-content';
      //   This.adData.adBrandingModal.style.height = '-webkit-fill-available';
      // }else{
      //   This.adData.adBrandingModal.style.width = '800px';
      //   This.adData.adBrandingModal.style.height = '500px';
      // }
      // This.adData.adBrandingModal.style.top = '50%';
      // This.adData.adBrandingModal.style.left = '50%';
      // This.adData.adBrandingModal.style.transform = 'translateX(-50%) translateY(-50%)';
      // This.adData.adBrandingModal.style.borderRadius = '4px';
    }

    function adBanner() {
      if (This.adData.adBrandingDiv.style.display == 'none') {
        This.utils.D.body.style.overflow = 'hidden';
        This.adData.adBrandingDiv.style.opacity = '1';
        This.adData.adBrandingDiv.style.display = 'block';
      }
    }
    This.utils.resize(This.adData.support,'center',This.zoomPercentage);
    
    This.closeForce=function() {
      if(This.closeForcefully){
        This.isClosed=true;
        This.adData.blur.parentElement.removeChild(This.adData.blur);
        log(This.adDataContent.creativeTemplateName+'->closed');
      }
    };

    This.close=function() {
      //This.isClosed=true;
      This.collections.splice(This.collections.indexOf(This),1);
      if(This.closeOnBlur){
        This.adData.blur.style.display='none';
      }
      This.closeForce();
    };

    This.closeManiContaier=function() {
      //This.isClosed=true;
      This.collections.splice(This.collections.indexOf(This),1);
      This.adData.blur.style.display='none';
      This.closeForce();
    };

    This.adData.blur.addEventListener('click',function() { This.close(); });
    
    //Autoclose Ad
    // This.autoCloseAdInt=setInterval(function() {
    //   if(This.autoCloseAd){ This.close();};
    //   clearInterval(This.autoCloseAdInt);
	  // },This.autoCloseAd_Timer);
    
    if(This.close_button!='none') {
      This.closeText=This.utils.D.createElement('p');
      This.adData.support.appendChild(This.closeText);
      This.closeText.textContent='Close... ';
      This.closeText.style.position='absolute';
      This.closeText.style.color='#000000';
      This.closeText.style.fontFamily="'FontAwesome'";
      This.closeText.style.top='0px';
      if(This.close_button=='left') {
        This.closeText.style.left=(This.adData.support_width/2)+'px';
      }else{
        This.closeText.style.right=(This.adData.support_width/2)+'px';
      }
        
      This.closeTextSpan=This.utils.D.createElement('span');
      This.closeText.appendChild(This.closeTextSpan);
      This.closeTextSpan.setAttribute('id','countdowntimer');
      This.closeTextSpan.style.color='#000000';
      This.closeTextSpan.style.fontFamily="'FontAwesome'";

      This.controls=This.utils.D.createElement('div');
      This.adData.support.appendChild(This.controls);
      This.controls.style.width=This.width+'px';
      This.controls.style.height=This.closeButtonHeight+'px';
      This.controls.style.position='absolute';
      This.controls.style.top='0px';
      This.controls.style.left=(This.adData.support_width/2)+'px';
      This.controls.style.display='none';
      
      This.ahref=This.utils.D.createElement('a');
      This.controls.appendChild(This.ahref);
      This.ahref.addEventListener('click',function(event) { This.closeManiContaier(); },false);
      This.ahref.setAttribute('href','javascript:;');
      This.ahref.style.width=This.closeButtonHeight+'px';
      This.ahref.style.height=This.closeButtonHeight+'px';
      This.ahref.style.position='absolute';
      This.ahref.style.top='-4px';
      if(This.close_button=='left') {
        This.ahref.style.left='0px';
      } else {
        This.ahref.style.right='0px';
      }
      
      This.ahrefImg=This.utils.D.createElement('img');
      This.ahrefImg.style.width=This.closeButtonHeight+'px';
      This.ahrefImg.style.height=This.closeButtonHeight+'px'; 
      This.ahrefImg.style.width='0';
      This.ahrefImg.style.height='0';
      This.ahrefImg.style.curosr='pointer';
      This.ahrefImg.setAttribute('src','https://bsrv.bidsxchange.com/extras/close_nw.png');
      This.ahref.appendChild(This.ahrefImg);

      switch(This.adData.closeButtonSize) {
        case 'small': {
          This.closeText.style.top='-5px';
          This.controls.style.top='-5px';
        }break;
        case 'medium': {
          This.closeText.style.top='0px';
          This.controls.style.top='0px';
        }break;
        case 'large': {
          This.closeText.style.top='0px';
          This.controls.style.top='0px';
        }break;
      }
    }
    
    This.showAd=function(){
      if(This.openFrameonlyOnAd){
        This.adData.blur.style.height='0';
        This.adData.blur.style.width='0';
        if(This.showBranding){
          This.adData.adBanner.style.display='none';
        }
        if(This.close_button!='none') {
          This.adData.support.style.width='0';
          This.adData.support.style.height='0';
          This.ahrefImg.style.width='0';
          This.ahrefImg.style.height='0';
        }
      }else{
        This.adData.blur.style.height='100vh';
        This.adData.blur.style.width='100vw';
        if(This.showBranding){
          This.adData.adBanner.style.display='block';
        }
        if(This.close_button!='none') {
          This.adData.support.style.width=(This.adData.support_width+This.width)+'px';
          This.adData.support.style.height=(This.height+This.adData.support_height+This.closeButtonHeight)+'px';
          This.ahrefImg.style.width=This.closeButtonHeight+'px';
          This.ahrefImg.style.height=This.closeButtonHeight+'px';
        }
      }
    }
    
    This.adContainer=This.utils.D.createElement('div');
    This.adData.support.appendChild(This.adContainer);
    This.adContainer.style.width=This.width+'px';
    This.adContainer.style.height=This.height+'px';
    This.adContainer.style.position='absolute';
    if(This.adData.close_button!='none'){This.adContainer.style.top=This.closeButtonHeight+'px';}else{This.adContainer.style.top='10px';}
    //This.adContainer.style.top=This.closeButtonHeight+'px';
    This.adContainer.style.left=(This.adData.support_width/2)+'px';

    
    This.taskAutoDestroyStart=new Date().getTime();
    This.taskAutoDestroyLimit=This.refreshInterval+1000;  
    This.createAd=function(tagData,pid,tid,content) {
      ++This.count;
      //HB Logic
      if(typeof(tagData)!=='undefined' && content.creativeType=='highImpact'){
        //content.HbTag='';
        if(content.HbTag!=undefined && content.HbTag.length>0) {
          content.HbTag=content.HbTag.replace("document.getElementById(placementId).append(fallback);","window.frameElement.callback();");
          This.isHb=true;
          var adIframe = This.utils.createIframe(This.adContainer, This.utils.D, This.width, This.height, content.HbTag, null, This.callback);
          log("Hb");
        }else {
          var adIframe = This.utils.createIframe(This.adContainer, This.utils.D, This.width, This.height, content.SSPTag);
          log("ssp");
        }
  
        if(This.isHb) {
            const  startCheck=new Date().getTime();
            This.HbTask=setInterval(function() {
            const  diff=((new Date().getTime())-startCheck)/1000;
            if(diff>This.HbWitTime&&This.isHbEmpty) {
              This.isHbEmpty=false;
              var adIframe = This.utils.createIframe(This.adContainer, This.utils.D, This.width, This.height, content.SSPTag);
              log("ssp");
              if(This.count>1){
                var adIframeMonitor=setInterval(function() {
                  if(document.activeElement==adIframe) {
                    clearInterval(adIframeMonitor);
                    This.utils.rclick(adData.id,pid,tid);
                    //log('Ref Ad Clicked');
                  }
                },100);
              }else{
                var adIframeMonitor=setInterval(function() {
                  if(document.activeElement==adIframe) {
                    clearInterval(adIframeMonitor);
                    This.utils.click(adData.id,pid,tid);
                    //log('Ad Clicked');
                  }
                },100);
              }
              clearInterval(This.HbTask);        
            }
            if(This.refresh==false) {
              clearInterval(This.HbTask);
            }
          },1);
        }
      }else if(typeof(tagData)!=='undefined' && content.creativeType=='image'){
        var adIframe = This.utils.createIframe(This.adContainer, This.utils.D, This.width, This.height, tagData);
      }else{
        var adIframe = This.utils.createIframe(This.adContainer, This.utils.D, This.width, This.height, '');
      }

      //var adIframe = This.utils.createIframe(This.adContainer, This.utils.D, This.width, This.height, tagData);
      if(This.count>1){
        This.utils.rimp(adData.id,pid,tid,This.utils.viewability(This.adData.root));
        
        if(content.creativeType=='html'){
          var HtmlAdIframe=This.utils.createIframe(adIframe,This.utils.D,This.width,This.height,'');
              HtmlAdIframe.setAttribute("src",content.url);
              HtmlAdIframe.style.margin='-1px';
          adIframe.contentDocument.body.appendChild(HtmlAdIframe);
        }
        //log('Refresh-Impression_Delivery-'+This.count);
        var adIframeMonitor=setInterval(function() {
          if(document.activeElement==adIframe) {
            clearInterval(adIframeMonitor);
            This.utils.rclick(adData.id,pid,tid);
            //log('Ref Ad Clicked');
          }
            },100);
      }else{
        This.utils.imp(adData.id,pid,tid,This.utils.viewability(This.adData.root));
        
        //log('Impression_Delivery-'+This.count);
        if(content.creativeType=='html'){
          var HtmlAdIframe=This.utils.createIframe(adIframe,This.utils.D,This.width,This.height,'');
              HtmlAdIframe.setAttribute("src",content.url);
              HtmlAdIframe.style.margin='-1px';
          adIframe.contentDocument.body.appendChild(HtmlAdIframe);
        }
        var adIframeMonitor=setInterval(function() {
          if(document.activeElement==adIframe) {
            clearInterval(adIframeMonitor);
            This.utils.click(adData.id,pid,tid);
            //log('Ad Clicked');
          }
            },100);
      }

      adIframe.onload=function() {
        //log(adIframe.contentWindow.document.querySelector('[id^=gpt-passback]'));
        This.isAd=false;
        adIframe.setAttribute('id', 'Bsrv_int'+This.count);
      }
      log(This.adDataContent.creativeTemplateName+'(INT)-> 1/'+This.count+','+This.countLimit);
      This.collections.push(This);

      //Accidenal click
      if(This.accidentalClick){
        This.adData.accidentalClick=This.utils.D.createElement('div');
        adData.checkAccDiv=This.utils.D.getElementById('bsrvAccidentalClick');
        if(adData.checkAccDiv!=null){adData.checkAccDiv.remove();}
        This.adContainer.parentNode.insertBefore(This.adData.accidentalClick,This.adContainer);
        This.adData.accidentalClick.setAttribute('id','bsrvAccidentalClick');
        This.adData.accidentalClick.style.position='absolute';
        This.adData.accidentalClick.style.width=This.width+'px';
        This.adData.accidentalClick.style.height=This.height+'px';
        This.adData.accidentalClick.style.zIndex='99999999998';
        if(This.adData.close_button!='none'){This.adData.accidentalClick.style.top=This.closeButtonHeight+'px';}else{This.adData.accidentalClick.style.top='10px';}
        This.adData.accidentalClick.style.left=(This.adData.support_width/2)+'px';
        This.adData.accidentalClick.style.background='rgb(0 0 0 / 0%)'; //rgb(0 0 0 / 0%) || rgb(0 0 0 / 12%)
        This.adData.accidentalClick.addEventListener('click', function (event) { This.adData.accidentalClick.style.display = 'none'; }, false);
      }
    };
    if(!(This.adDataContent.creativeType=='image')) {
      //Prebid Logic
    if(This.perbidOption){
      This.hbAdUnitImp='bsrv_Imp_'+adData.id;
      This.hBGetData(adData.header_bidding,'bsrv_Imp_'+adData.id);
      log(This.headerBiddingParms);
      This.PREBID_TIMEOUT=1500;
      //prebid ManinFun
      This.utils.W.bxpbjs=This.utils.W.bxpbjs || {};
      var bxpbjs=This.utils.W.bxpbjs;
      bxpbjs.que=bxpbjs.que || [];
      bxpbjs.bidderSettings={
        storageAllowed: true,
        standard:{
          adserverTargeting:[{
            key: "hb_bidder",
            val: function(bidResponse) {
              for(var i in adData.header_bidding){
                if(bidResponse.bidder==adData.header_bidding[i].bidder){
                  bidResponse.bidderAdjustment=adData.header_bidding[i].adjustment;
                }
              }
              return bidResponse.bidderAdjustment;
            }
          }]
        }
      }
      bxpbjs.que.push(function() {
        bxpbjs.setConfig({
          floors: {}, enableTIDs: true, userSync: { syncsPerBidder: 999}, currency:{ adServerCurrency: 'USD' }, deviceAccess:true, userSync:{filterSettings:{iframe:{bidders:'*',filter:"include"}}}
        });
        bxpbjs.addAdUnits(This.headerBiddingParms);
        bxpbjs.requestBids({
          bidsBackHandler: function(bids,timedOut,auctionId) {
            log(bids);
            This.ifBidFails=Object.keys(bids).length===0;
            if(!This.hbAdUnitImp in bids || This.ifBidFails){
              //if(This.ifBidFails){
              This.createAd(This.tags,This.pid,This.tid,This.adDataContent);
            }else{
              This.bidResponses=bxpbjs.getBidResponsesForAdUnitCode(This.hbAdUnitImp);
              This.newBidsRes=This.bidResponses.bids;
              //log(This.newBidsRes);
              for(var j in This.newBidsRes) {
                This.bidCpm=This.newBidsRes[j].cpm;
                This.bidAdjustment=Number(((This.newBidsRes[j].bidderAdjustment/100)*This.bidCpm).toFixed(2));
                //log(This.bidAdjustment);
                This.newBidsRes[j].cpm=This.bidAdjustment;
                //log(This.newBidsRes[j]);
              }
              This.winners=bxpbjs.getHighestCpmBids(This.hbAdUnitImp);
              log(This.winners);
              if(This.winners.length>0){
                This.adDataContent.HbTag=This.winners[0].ad;
                This.createAd(This.tags,This.pid,This.tid,This.adDataContent);
              }else{
                This.createAd(This.tags,This.pid,This.tid,This.adDataContent);
              }
            }
          },
          timeout: This.PREBID_TIMEOUT
        });
      });
    }else{
      This.createAd(This.tags,This.pid,This.tid,This.adDataContent);
    }
      //This.createAd(This.tags,This.pid,This.tid,This.adDataContent);
    }else{
      This.adData.ImgHref=This.utils.D.createElement('a');
      This.adData.ImgHref.setAttribute('href',''+This.adDataContent.creativeLandingPageUrl+'');
      This.adData.ImgHref.setAttribute('target', '_blank');
      This.adData.ImgAss=This.utils.D.createElement('img');
      This.adData.ImgHref.appendChild(This.adData.ImgAss);
      This.adData.ImgAss.src=''+This.adDataContent.url+'';
      This.createAd(This.adData.ImgHref.outerHTML,This.pid,This.tid,This.adDataContent);
    }
    //This.createAd(This.tags,This.tid);

    //Timer CountDone for closeBtn
    if(This.close_button!='none') {
      This.closeBtnTimer=setInterval(function(){
        This.closeButtonDelay--;
        This.closeTextSpan.textContent = This.closeButtonDelay+'s';
        if(This.closeButtonDelay<=1){
          clearInterval(This.closeBtnTimer);
          This.closeText.style.display='none';
          This.closeTextSpan.style.display='none';
          This.controls.style.display='block';
        }
      },1000);
    }

    This.closeUnitForRef=function() {
      This.adData.blur.style.height='0';
      This.adData.blur.style.width='0';
      This.adContainer.style.width='0';
      This.adContainer.style.height='0';
      if(This.showBranding){
        This.adData.adBanner.style.display='none';
      }
      if(This.close_button!='none') {
        This.adData.support.style.width='0';
        This.adData.support.style.height='0';
        This.ahrefImg.style.width='0';
        This.ahrefImg.style.height='0';
      }
      This.getIframe=This.utils.D.querySelectorAll('iframe[id^="Bsrv_int"]');
      for (let i = 0; i < This.getIframe.length; i++) {
        This.getIframe[i].remove();
        //log('iframe removed');
      }
      //This.getIframe.contentWindow.document.body.innerHTML="";
    };

    This.checkforAd=function(newAdIframe){
      //Resize Ad Container
      This.ifGpt=newAdIframe.contentWindow.document.querySelector('[id^=gpt-passback]');
      if(This.ifGpt==null){
        log('no gpt');
        This.adData.blur.style.height='100vh';
        This.adData.blur.style.width='100vw';
        if(This.showBranding){
          This.adData.adBanner.style.display='block';
        }

        This.adContainer.style.width=This.width+'px';
        This.adContainer.style.height=This.height+'px';
        newAdIframe.style.width=This.width+'px';
        newAdIframe.style.height=This.height+'px';
        This.adData.support.style.width=(This.adData.support_width+This.width)+'px';
        This.adData.support.style.height=(This.height+This.adData.support_height+This.closeButtonHeight)+'px';

        if(This.close_button!='none') {
          This.ahrefImg.style.width=This.closeButtonHeight+'px';
          This.ahrefImg.style.height=This.closeButtonHeight+'px';
          This.controls.style.width=This.width+'px';
        }
        This.AutoCloseAdIntSo=setInterval(function() {
          //AutoClose Ad
          if(This.autoCloseAd && (((new Date().getTime()-This.start)/1000) >= (This.autoCloseAd_Timer))){
            This.closeUnitForRef();
          }
        },1);
      }else{
        var child=newAdIframe.contentWindow.document.querySelector('[id^=gpt-passback]').children[0];
        //log(child.nodeName);
        if(child.nodeName=='DIV' && This.adData.size=='1x1') {
          //Show Ad
          This.adData.blur.style.height='100vh';
          This.adData.blur.style.width='100vw';
          if(This.showBranding){
            This.adData.adBanner.style.display='block';
          }
          This.adData.support.style.width=(This.adData.support_width+This.width)+'px';
          This.adData.support.style.height=(This.height+This.adData.support_height+This.closeButtonHeight)+'px';

          This.resizeConter=This.utils.getDim(child.children[0]);
          //log(This.resizeConter);
          This.adContainer.style.width=This.resizeConter.width+'px';
          This.adContainer.style.height=This.resizeConter.height+'px';
          newAdIframe.style.width=This.resizeConter.width+'px';
          newAdIframe.style.height=This.resizeConter.height+'px';
          This.adData.support.style.width=(This.adData.support_width+This.resizeConter.width)+'px';

          if(This.close_button!='none') {
            This.controls.style.width=This.resizeConter.width+'px';
            This.ahrefImg.style.width=This.closeButtonHeight+'px';
            This.ahrefImg.style.height=This.closeButtonHeight+'px';
          }

          This.adContainer.style.height=This.resizeConter.height+'px';
          if(This.accidentalClick){This.adData.accidentalClick.style.height=This.resizeConter.height+'px';}
          This.adData.support.style.height=(This.resizeConter.height+This.adData.support_height+This.closeButtonHeight)+'px'; 
          log('Yes, Ad');
        }else if(child.nodeName=='DIV' && This.adData.size!='1x1'){
          This.adData.blur.style.height='100vh';
          This.adData.blur.style.width='100vw';
          if(This.showBranding){
            This.adData.adBanner.style.display='block';
          }
          This.adData.support.style.width=(This.adData.support_width+This.width)+'px';
          This.adData.support.style.height=(This.height+This.adData.support_height+This.closeButtonHeight)+'px';

          if(This.close_button!='none') {
            This.controls.style.width=This.width+'px';
            This.ahrefImg.style.width=This.closeButtonHeight+'px';
            This.ahrefImg.style.height=This.closeButtonHeight+'px';
          }
          log('Yes, Ad');
        }else {
          This.showAd();
          log('No, Ad');
        }
        log('yes gpt');
        This.AutoCloseAdIntSo=setInterval(function() {
          //AutoClose Ad
          if(This.autoCloseAd && (((new Date().getTime()-This.start)/1000) >= (This.autoCloseAd_Timer))){
            This.closeUnitForRef();
          }
        },1);
      }
    }

    This.task=setInterval(function() {
      This.checkIframe=This.utils.D.getElementById('Bsrv_int'+This.count);
      if(This.refresh && This.countLimit>=1 && This.checkIframe!=null && This.isAd==false){
        This.checksSelection=This.checkIframe.contentWindow.document.querySelector('[id^=gpt-passback]') !== null;
        if(This.checksSelection){
          if(This.checkIframe.contentWindow.document.querySelector('[id^=gpt-passback]').children[0].nodeName!=null){
            This.chekGamDiv=This.checkIframe.contentWindow.document.querySelector('[id^=gpt-passback]').children[0].nodeName;
            if(This.chekGamDiv=='DIV' && This.isAd==false){
              This.checkforAd(This.checkIframe);
              This.isAd=true; 
            }
          }
        }else {
          This.openFrameonlyOnAd=false;
          This.showAd();
        }
      }
      if(This.count>=This.countLimit) {
        This.checkIframeNew=This.utils.D.getElementById('Bsrv_int'+This.count);
        if((new Date().getTime()-This.taskAutoDestroyStart)>=This.taskAutoDestroyLimit && This.checkIframeNew!=null) {
          This.checksSelectionNew=This.checkIframeNew.contentWindow.document.querySelector('[id^=gpt-passback]') !== null;
          if(This.checksSelectionNew){
            This.chekGamDivNew=This.checkIframeNew.contentWindow.document.querySelector('[id^=gpt-passback]').children[0].nodeName;
            if(This.chekGamDivNew=='DIV' && This.isAd==false){
              This.isAd=true;
              This.checkforAd(This.checkIframeNew);
              clearInterval(This.task);
            }
            if(This.isAd){
              log('Task destroyed End of Refresh cycle');
              clearInterval(This.task);
            }
          }else{
            This.openFrameonlyOnAd=false;
            This.showAd();
          }
        }
        return;
      }
      if((((new Date().getTime()-This.start)/1000) >= This.closeButtonDelay) &&  This.close_button!='none') {
        //This.controls.style.display='block';
      }
      if(This.tabOnView && ((new Date().getTime()-This.start)/1000) >= This.refreshInterval) {
        //This.closeUnitForRef();
        if(This.autoCloseAd){
          This.closeUnitForRef();
        }
        //log(This.isClosed);
        if(!This.isClosed){
          if(This.adData.blur.style.display === 'none'){
            This.adData.blur.style.display = 'block';
          }
          //This.createAd();
          This.adData.callback=function(response) {
            //log(response);
            if(!(response.creative_content.creativeType=='image')) {
              //Prebid Logic Refresh
              if(response.header_bidding.length>0){
                This.hBGetData(response.header_bidding,'bsrv_RImp_'+adData.id);
                //log(This.headerBiddingParms);
                var PREBID_TIMEOUT=1500;
                // ======== DO NOT EDIT BELOW THIS LINE =========== //
                bxpbjs.adUnits.length=0;
                bxpbjs.bidderSettings={
                  storageAllowed: true,
                  standard:{
                    adserverTargeting:[{
                      key: "hb_bidderRef",
                      val: function(bidResponse) {
                        for(var i in response.header_bidding){
                          if(bidResponse.bidder==response.header_bidding[i].bidder){
                            bidResponse.bidderAdjustment=response.header_bidding[i].adjustment;
                          }
                        }
                        return bidResponse.bidderAdjustment;
                      }
                    }]
                  }
                }
                bxpbjs.que.push(function() {
                  bxpbjs.setConfig({
                    floors: {}, enableTIDs: true, userSync: { syncsPerBidder: 999}, currency:{ adServerCurrency: 'USD' }, deviceAccess:true, userSync:{filterSettings:{iframe:{bidders:'*',filter:"include"}}}
                  });
                  bxpbjs.addAdUnits(This.headerBiddingParms);
                  bxpbjs.requestBids({
                    timeout: PREBID_TIMEOUT,
                    bidsBackHandler: function(RefBid) {
                      log(RefBid);
                      This.hbAdUnit='bsrv_RImp_'+adData.id;
                      if(This.hbAdUnit in RefBid) {
                        This.refBidRes=RefBid[This.hbAdUnit].bids;
                        //log(This.refBidRes);
                        for(var j in This.refBidRes) {
                          This.bidCpmRef=This.refBidRes[j].cpm;
                          This.bidAdjustmentRef=Number(((This.refBidRes[j].bidderAdjustment/100)*This.bidCpmRef).toFixed(2));
                          //log(This.bidAdjustmentRef);
                          This.refBidRes[j].cpm=This.bidAdjustmentRef;
                          //log(This.refBidRes[j]);
                          This.resultBid.push(This.refBidRes[j]);
                        }
                        This.winnersRef=bxpbjs.getHighestCpmBids(This.hbAdUnit);
                        log(This.winnersRef);
                        //This.refBidRes.length=0;
                        This.resultBid.length=0;
                        response.creative_content.HbTag=This.winnersRef[0].ad;
                        This.createAd(response.creative_content.HbTag,response.pid,response.tid,response.creative_content);
                      }else{
                          This.createAd(response.creative_content.SSPTag,response.pid,response.tid,response.creative_content);
                      }
                      This.ifBidFailsRef=Object.keys(RefBid).length === 0; //Not required
                      This.checkRefKey='bsrv_RImp_'+adData.id in RefBid; //Not required
                      if(This.checkRefKey){ } //Not required
                    }
                  });
                });
              }else{
                This.createAd(response.creative_content.SSPTag,response.pid,response.tid,response.creative_content);
              }
              //This.createAd(response.creative_content.SSPTag,response.pid,response.tid,response.creative_content);
            }else{
              This.adData.ImgHref=This.utils.D.createElement('a');
              This.adData.ImgHref.setAttribute('href',''+response.creative_content.creativeLandingPageUrl+'');
              This.adData.ImgHref.setAttribute('target', '_blank');
              This.adData.ImgAss=This.utils.D.createElement('img');
              This.adData.ImgHref.appendChild(This.adData.ImgAss);
              This.adData.ImgAss.src=''+response.creative_content.url+'';
              This.createAd(This.adData.ImgHref.outerHTML,response.pid,response.tid,response.creative_content);
            }
          };
          This.utils.rreq(adData.id,This.pid,This.adData.callback);
        }
        This.start=new Date().getTime();
      }
      //AutoClose Ad
      // if(This.autoCloseAd && (((new Date().getTime()-This.start)/1000) >= (This.autoCloseAd_Timer-1))){
      //   This.closeUnitForRef();
      //   if(!This.refresh){
      //     clearInterval(This.task);
      //   }
      // }
      if(This.refresh==false) {
        if(!This.refresh && This.checkIframe!=null && This.isAd==false){
          This.checksSelection=This.checkIframe.contentWindow.document.querySelector('[id^=gpt-passback]') !== null;
          if(This.checksSelection){
            if(This.checkIframe.contentWindow.document.querySelector('[id^=gpt-passback]').children[0].nodeName!=null){
              This.chekGamDiv=This.checkIframe.contentWindow.document.querySelector('[id^=gpt-passback]').children[0].nodeName;
              if(This.chekGamDiv=='DIV' && This.isAd==false){
                This.isAd=true; 
                This.checkforAd(This.checkIframe);
                // if(This.autoCloseAd && (((new Date().getTime()-This.start)/1000) >= (This.autoCloseAd_Timer-1))){
                //   This.closeUnitForRef();
                //   clearInterval(This.task);
                // }
                if(This.autoCloseAd!=false){
                  clearInterval(This.task);
                }
                clearInterval(This.task);
              }
              // else{
              //   log('TGIS dde u');
              //   clearInterval(This.task);
              // }
            }
          }else {
            This.openFrameonlyOnAd=false;
            This.showAd();
          }
          //log('Task destroyed End of Refresh cycle');
        }
        //clearInterval(This.task);
      }
    },1);
    clearInterval(This.delayLoadAd);
	},This.adLoad_delay);
}