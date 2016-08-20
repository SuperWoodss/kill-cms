/**
 * Copyright (c) 2015 Xinhuanet Inc. All rights reserved.
 *
 * @file   js/jquery.xinhuanetAD.js
 * @author St. <st_sister@icloud.com>
 * @time   2015-12-24-10.49
 *         2015-12-25-08.57
 *         2015-12-25-16.09
 *         2015-12-29-19.18
 *         2016-01-06-16.01
 *         2016-01-08-15.09
 *         2016-01-22-15.35
 *         2016-02-24-14.47 readd $.xinhuanetAD.init() & $.xinhuanetAD.all() modules
 *         2016-03-01-15.27 add banner toggle
 */

jQuery.fn.xinhuanetAD = function (array, start, speed, aniTime) {
    try {
        //if (array) {
        //console.log(array);

        //if(!array) {
//            array = {
//                width: this.width(),
//                height: this.height(),
//                url: '',
//                alt: '',
//                src: null,
//                empty: {
//                    src: 'http://www.news.cn/2015/img2015/banner_slogan.png',
//                    alt: ''
//                }
//            };
//        }

       // var $tag          = this;




        var $tag          = this;

        var config       = array;

        var url          = config.url;
        // console.log(url);
        var src          = config.src;
        // console.log(src);
        //console.log(src);

        //var imgExtension = config.imgExtension;
        var width        = config.width;
        var height       = config.height;
        var toggle       = config.toggle;
        $tag.css({position:'relative', overflow:'hidden'}).height(height).width(width);

        var len = 0;

        //console.log(src);

        if (src) {
            len = config.src.length;
        }
        //console.log('len: ' + len);

        var lenAdd       = 0;



        var alt        = config.alt;

        //var empty    = config.empty;
//        var emptySrc = '';
//        var emptyAlt = '';
//        var bg = '';

        var zIndex  = 1;

        //console.log(empty);

        //if (empty) {
//            emptySrc   = empty.src;
//            emptyAlt   = empty.alt;
//
//            lenAdd = 1;
//
//            bg = '<li style="' + displayNone + liStyle + ' z-index:' + zIndex + '; background:#f1f1f1 url(' + emptySrc + ') center center no-repeat;" title="' + emptyAlt + '"></li>';
//
//
//
//            //len = len + lenAdd;
//
//            //console.log(len);
//        }
        var css = {
            displayNone:  'display:none;',
            liStyle:      'position:absolute;top:0;left:0;width:' + width + 'px;height:' + height + 'px;',
            img:          'vertical-align:top;',
            btnBox:       'position:absolute;top:0;right:0;width:20px;z-index:99999;height:16px;',
            btnTipBox:    'position:absolute;top:0;right:0;display:none;z-index:3;',
            btnTip:       'position:absolute;top:0;right:20px;width:30px;z-index:2;height:16px;line-height:17px;text-align:center;font-size:12px;color:#FFFFFF;overflow:hidden;',
            btnTipShadow: 'position:absolute;top:0;right:20px;width:30px;z-index:1;height:16px;background:#000000;filter:alpha(opacity=50);-moz-opacity:.5;opacity:.5;overflow:hidden;'
            //btnTip2: 'position:absolute; top:0; right:21px; width:62px; height:17px; z-index: 99998; text-align:center; font-size:12px; color:#FFFFFF; overflow:hidden; line-height:17px;',
            //btnTip2Shadow: 'position:absolute; top:0; right:21px; width:62px; height:17px; z-index: 99997; background:#000000; filter: alpha(opacity=50);-moz-opacity: .5; opacity: .5; overflow:hidden;'
        };

         //var superscript = '<div style="' + superscriptCss[0] + '"><a href="http://www.news.cn/jiaju/2014ggfw/index.htm" target="_blank" onMouseOver="$(this).next(\'div\').toggle();"><img src="http://www.xinhuanet.com/global/img/superscript.gif" width="21" height="17" border="0" alt="新华网广告服务" title="新华网广告服务" /></a><div><div style="' + superscriptCss[1] + '">广告</div><div style="' + superscriptCss[1] + '">laoding...</div><div style="' + superscriptCss[2] + '"></div></div></div>';
         var superscript;
          //var superscript2 = '<div style="' + superscriptCss[0] + '">' +
//                   '<a href="http://www.news.cn/jiaju/2014ggfw/index.htm" target="_blank" onMouseOver="$(this).next(\'div\').stop().fadeIn();" onMouseOut="$(this).next(\'div\').stop().fadeOut()">' +
//                       '<img src="http://www.xinhuanet.com/global/img/superscript.gif" width="21" height="17" border="0" alt="新华网广告服务" title="新华网广告服务" />' +
//                   '</a>' +
//                   '<div style="display:none">' +
//                       '<div style="' + superscriptCss[3] + '">laoding...</div>' +
//                       '<div style="' + superscriptCss[4] + '"></div>' +
//                   '</div>' +
//               '</div>';

        var adTemp = '<ul>';
        //var ani = false;
        if (len!==0) {
            for (var i=0; i<len; i++) {
                zIndex = len + lenAdd - i;
                //style = style + '\'z-index\':' + zIndex;

                //console.log('z: ' + zIndex);
               // adTemp += '<li style="' + css.displayNone + css.liStyle + ' z-index:' + zIndex + '"><a href="' + url + '" target="_blank"><img src="' + src[i] + '" width="' + width + '" height="' + height + '" border="0" alt="' + alt + '" title="' + alt + '" style="' + css.img + '" /></a></li>';

                adTemp += '<li style="' + css.displayNone + css.liStyle + ' z-index:' + zIndex + '">'+
                              '<a href="' + url + '" target="_blank">' +
                                  '<img src="' + src[i] + '" width="' + width + '" height="' + height + '" border="0" style="' + css.img + '" />'+
                              '</a>'+
                          '</li>';

                if(!toggle||toggle==='on'){
                    if (i===len-1) {
                        superscript = '<div style="' + css.btnBox + '">' +
                                          '<a href="http://www.news.cn/jiaju/2014ggfw/index.htm" target="_blank">' +
                                              '<img src="http://www.xinhuanet.com/global/img/superscript.gif" width="20" height="16" border="0" alt="新华网广告服务" style="' + css.img + '" onMouseOver="$(this).parent().next(\'div\').stop().show();" onMouseOut="$(this).parent().next(\'div\').stop().hide()" />' +
                                          '</a>' +
                                          '<div style="' + css.btnTipBox + '">' +
                                              '<div style="' + css.btnTip + '">广告</div>' +
                                              //'<div style="' + superscriptCss[2] + '">laoding...</div>' +
                                              '<div style="' + css.btnTipShadow + '"></div>' +
                                          '</div>' +
                                      '</div>';
                    }
                }
                else if(toggle==='off'){
                        superscript = '';
                }

                adTemp += superscript;

                //if (len===1 && src[0].lastIndexOf('这里少打底广告的图片的名称 需要根据这个做检索匹配')>=0) {
//                    adTemp += superscript2;
//                }
            }

         }

         $tag[0].innerHTML = adTemp + '</ul>';

         $tag.css({position:'relative', overflow:'hidden'}).height(height).width(width);






        if (!speed) {
            speed = 4000;
        }
        if (!aniTime) {
            aniTime = 3000;
        }

        if (!start || start<0 || start>len) {
            start = 0;
        }
        else {
            start = start - 1;
        }
//        else if(start>0&&start<len) {
//            start = start-1;
//            console.log('start>0&&start<len ' + start);
//        }
//        else if(start===len) {
//            start = len;
//            console.log('start===len '  + start);
//        }
//        else {
//            start = 0;
//        }


            //$liImg       = $li.find('img'),
            //liImgWidth  = $liImg.width(),
            //liImgHeight = $liImg.height(),
            //liLen = len,
            //css0 = {
    //            position: 'relative',
    //            overflow: 'hidden',
    //            width:  width,
    //            height: height
    //        },
    //        css1 = {
    //            display: 'none',
    //            position: 'absolute',
    //            width:  width,
    //            height: height,
    //            top: 0,
    //            left: 0
    //        };



        //console.log(liLen>1);
        //setTimeout(function(){



        var $li = $tag.find('li');
        $li.eq(start).show();

        var timeInt;

        if (len>1) {

            //for (var i=len; i>0; i--) {
    //            $li.eq(i).css({'z-index': i });
    //        }

            timeInt = setInterval(function(){
                start++;
                if (start === len + lenAdd) {
                    start = 0;
                }
                $li.fadeOut(aniTime).eq(start).fadeIn(aniTime);
             }, speed);
        }
        else {
            clearInterval(timeInt);
            $li.show();
        }

        //}, 300);
    }
    catch (exception) {
        $('body').append('<br>:( 糟糕！似乎出错了 ' + exception);
    }
};

var xinhuanetAD = {
    init: function(){
        var array = [];
        //var str;
        $('.xinhuanetADBox').each(function() {
            var dataAd = $(this).attr('data-ad');
            //if (dataAd) {
            //var str = ;
            array.push(eval('(' + dataAd + ')'));
            //}
        });

        //console.log(array);

        return array;
   },
   all: function(){
        //var tag   = '.xinhuanetADBox';
        var array = this.init();
        var len   = array.length;

        //console.log(len);
        //console.log(array);

        if (array) {
            for (var i=0; i<len; i++) {
                $('.xinhuanetADBox:eq(' + i +')').xinhuanetAD(array[i]);
            }
        }
   },


   //set: function(num){
//
//        //var dataAd = $tag.attr('data-ad');
//
//        //var array = this.array[num];
//        //var obj    = eval('(' + dataAd + ')');
//
//        //console.log($tag);
//        //console.log(dataAd);
//        console.log(this.array[num]);
//
//        $('.xinhuanetADBox:eq(' + num +')').xinhuanetAD(this.array[num]);
//   }


    // 旧版set模块
    // set: function(num){
    //
    //     var $tag   = $('.xinhuanetADBox:eq(' + num +')');
    //     var dataAd = $tag.attr('data-ad');
    //     var obj    = eval('(' + dataAd + ')');
    //
    //     //console.log($tag);
    //     //console.log(dataAd);
    //     //console.log(obj);
    //     //console.log(this.array[num]);
    //
    //     $tag.xinhuanetAD(obj);
    // },

    set: function(tag){
		// console.log(tag);
		var adID = tag.attr('name');
        var $tag = $('#xhAdData').find('.adData').eq(adID).find('.xinhuanetADBox');
        var dataAd = $tag.attr('data-ad');

        // console.log("adID:"+adID);
		// console.log("$tag:"+$tag);
		// console.log("$dataAd:"+dataAd);

        var obj    = eval('(' + dataAd + ')');

		// console.log(obj);

        tag.xinhuanetAD(obj);
    }

};

//$(function (){
//    xinhuanetAD.allAD();
//});
