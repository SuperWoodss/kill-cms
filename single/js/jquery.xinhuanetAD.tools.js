
/**
 * Copyright (c) 2015 Xinhuanet Inc. All rights reserved.
 *
 * @file   js/jquery.xinhuanetAD.tools.js
 * @author St. <st_sister@icloud.com>
 * @time   2015-12-27-13.25
 *         2016-01-06-16.15
 *         2016-01-07-08.21
 *         2016-03-08-14.27 add copy
 *         2016-03-09-15.40 添加点击 copy之后的回调，调整为 提交》copy》提交 的点击循环
 */

var $body = $('body');
var $addImgPos = $('#addImgPos');
var $emptyToggle = $('#emptyToggle');
var $emptyBox = $('#emptyBox');
var $emptySrc = $('#emptySrc');
var $emptyAlt = $('#emptyAlt');
var $submit = $('#submit');
var $output = $('#output');
var $copy = $('#copy');
var $tipBox = $('#tipBox');
var outputHtml ='<p>“把大象放进冰箱总共3步”，所以xinhuanetAD tools也只需3步：</p>' +
                '<hr>' +
                '<p>' +
                    '1、正确填写上面表单。<br>' +
                    '2、点击 <a href="javascript:void(0);" onClick="$(\'#submit\').click();">&quot;提 交&quot;</a> 生成广告代码。<br>' +
                    '3、点击 <a href="javascript:void(0);" onClick="$(\'#copy\').click();">&quot;复 制&quot;</a> 粘贴代码到广告系统。' +
                '</p>';
var $done;
var $done2;
var str2 = '必要选项不能为空！';
var textarea = '';
var timeout;
var global_code = null;
var clip;

$(function() {

    var srcVal;

    $tipBox.html('<div class="done" id="done"></div>' +
        '<div class="done done2" id="done2"></div>');

    $done = $('#done');
    $done2 = $('#done2');

    $output.html(outputHtml);
    // $copy.hide();

    $('#addImg').on('click', function() {
        //addImgStart++

        srcVal = $('#src').find('input').eq(0).val();

        //((src0val==='undefined')?('placeholder="友情提示！！!==>必须添加图片地址"'):('value="' + $('#src0').find('input').eq(0).val() + '"'))
        //var srcDom;

        if (srcVal === 'undefined') {
            srcVal = 'placeholder="友情提示==> 必须添加图片地址!!!"';
        } else {
            srcVal = 'value="' + srcVal + '"';
        }

        ////console.log(srcVal);


        $addImgPos.append('<div class="tr">' +
            '<div class="td0"></div>' +
            '<div class="td1">' +
            '<input class="input" ' + srcVal + '> ' +
            '<button class="delImg" onClick="$(this).parent().parent().remove();$(\'#addImgPos\').attr(\'data-max\', $addImgPos.attr(\'data-max\')-0-1);">-</button>' +
            '</div>' +
            '</div>');

        $addImgPos.attr('data-max', $addImgPos.attr('data-max') - 0 + 1);
    });

    //$emptyToggle.on('click', function(){
    //        var $this = $(this);
    //        var text = $this.text();
    //
    //        $emptyBox.toggle();
    //
    //        if (text==='开启') {
    //            $this.addClass('active');
    //            $this.text('关闭');
    //        }
    //        else {
    //            $this.removeClass('active');
    //            $this.text('开启');
    //
    //            $emptySrc.val('');
    //            $emptyAlt.val('');
    //        }
    //    });



    //var blank = ',';
    //var blank2 = '<script>';
    //var blank3 = '<\/script>';
    //var tag;
    var width;
    var height;
    var url;
    var alt;
    //var emptySrc;
    //var emptyAlt;
    //var start;
    //var speed;
    //var aniTime;
    var src;

    $submit.on('click', function() {


        // clip = new ZeroClipboard($('#copy'));

        var srcImg = [];
        var $srcInput = $('#src').find('input');
        $srcInput.each(function() {
            var temp = '\'' + $(this).val().trim() + '\'';

            ////console.log(temp);

            srcImg.push(temp);
        });

        ////console.log(srcImg);

        //tag      = $('#tag').val();

        //start    = $('#start').val();
        //speed    = $('#speed').val();
        //aniTime  = $('#aniTime').val();


        //document.write("<div class=\"xinhuanetADBox\" data-ad=\"{url: 'http://www.ccb.com/cn/html/office/jgyw/subject/09/mbtd0511/index.htm', src: ['http://imgs.xinhuanet.com/ad/test20151225/ad_jh10_syqz_50070_0.gif','http://imgs.xinhuanet.com/ad/test20151225/ad_jh10_syqz_50070_1.gif','http://imgs.xinhuanet.com/ad/test20151225/ad_jh10_syqz_50070_2.gif','http://imgs.xinhuanet.com/ad/test20151225/ad_jh10_syqz_50070_3.gif','http://imgs.xinhuanet.com/ad/test20151225/ad_jh10_syqz_50070_4.gif','http://imgs.xinhuanet.com/ad/test20151225/ad_jh10_syqz_50070_5.gif'],width: 500,height: 70,alt: '', empty: null}\"></div>");





        //var text =
        //            //$('#tag').val() + blank +
        //            $('#width').val() + blank +
        //            $('#height').val() + blank +
        //            $('#url').val() + blank +
        //            srcImg +
        //            $('#alt').val() + blank +
        //            $('#emptySrc').val() + blank +
        //            $('#emptyAlt').val();
        //            //$('#start').val() + blank +
        //            //$('#speed').val() + blank +
        //            //$('#aniTime').val();

        src = srcImg;

        ////console.log(srcImg);



        width = $('#width').val().trim();
        height = $('#height').val().trim();
        url = $('#url').val().trim();
        alt = ''; //$('#alt').val();
        //emptySrc = $('#emptySrc').val();
        //emptyAlt = $('#emptyAlt').val();


        //var code = blank2 + "document.writeln(\"<div class=\\\"xinhuanetADBox\\\" data-ad=\\\"{url: '" + url + "', src: [" + src + "],width: " + width + ",height: " + height + ",alt: '" + alt + "', empty: null}\\\"></div>\");" + blank3;
        /*var code = "<script>document.writeln(\"<div class=\\\"xinhuanetADBox\\\" data-ad=\\\"{url: '" + url + "', src: [" + src + "],width: " + width + ",height: " + height + ",alt: '" + new Date() + "', empty: null}\\\"></div>\");</script>";*/
        var code = "<script>document.writeln(\"<div class=\\\"xinhuanetADBox\\\" data-ad=\\\"{url:'" + url + "',src:[" + src + "],width:'" + width + "',height:'" + height + "',alt:'" + alt + "',empty:null,toggle:'off'}\\\"></div>\");</script>";

        //code = new Date();


        // 验证表单

        if (url === '') {
            tips();
            $('#url').addClass('bR');
        } else if (width === '') {
            tips();
            $('#width').addClass('bR').siblings(document).removeClass('bR');
        } else if (height === '') {
            tips();
            $('#height').addClass('bR');
        } else if ($srcInput.val() === '') {
            //tips();
            $srcInput.each(function() {
                var $this = $(this);
                $this.addClass('bR');
                doneTips(str2, 'html', '$done');
            });
        } else {
            $('.bR').removeClass('bR');
            // 验证图片格式
            $srcInput.each(function() {
                var $this = $(this);
                var src = $this.val().trim();

                if (src.lastIndexOf('.jpg') < 0 && src.lastIndexOf('.png') < 0 && src.lastIndexOf('.gif') < 0) {

                    var str = //'<div class="cons' + i + '">' +
                        // '<hr>' +
                        //'<h3>请注意！！！</h3>' +
                        // '<p>' +
                        //'您的 <strong>' + (i + 1) + '</strong> 个图片格式可能存在问题！！！<br>' +
                        '您的图片格式可能存在问题！！！<br>' +
                        '请尝试使用<70k的jpg（或者png、gif）格式的图片';
                        //'<li></li>' +
                        // '</p>' +
                        // '<hr>'; // +
                    //'</div>';

                    doneTips(str, 'html', '$done');
                    $done2.html('');
                    $this.addClass('bR');
                } else if (src !== '') {
                    $this.removeClass('bR');
                }
            });
        }

        //console.log(!$('.bR').length);


        if (!$('.bR').length) {
            textarea = '<textarea id="content" class="copyTextarea" rows="5">' + code + '</textarea>';
            $output.html(textarea);

            doneTips('^0^ 制作完成！', 'html', '$done');

            global_code = code;
            clip = new ZeroClipboard($('#copy'));

            // $copy.show('slow');
            // $(this).hide('slow');

            $done2.html('');

        } else {

            $output.html('');
            global_code = null;
        }
    });



    $('#copy').on('click', function() {
        //var $content = $('#content');

        if (global_code === null) {
            doneTips('-__-||| 无法复制，因为您似乎没有制作代码！', 'html', '$done');
        } else {

            clip = new ZeroClipboard($('#copy'));

            doneTips('~__~ 已复制！', 'html', '$done');

            // $copy.hide('slow');
            // $submit.show('slow');

            // 改变焦点
            // $('#content').focus();
        }
    });

    // footer
    $body.append('<div class="footer">本工具必须使用Chrome浏览器，技术支持：&copy; ' + new Date().getFullYear() + ' 新华网 技术部<div>');
});


//function doneTips() {
//    $done.html('但图片地址似乎有些问题！');
//}

function doneTips(str, mod, tag) {
    var temp = $done.html();

    ////console.log(!mod);
    ////console.log(mod==='html');
    ////console.log(mod==='prepend');

    if (!mod) {
        if (temp.indexOf(str) < 0) {
            $done.append(str);
        }
    } else if (mod === 'html') {
        if (!tag) {
            $done2.html(str);
        } else if (tag === '$done') {
            $done.html(str);
        } else if (tag === '$done2') {
            $done2.html(str);
        }
    } else if (mod === 'prepend') {

        var temp2 = $done2.html();

        if (temp2.indexOf(str) < 0) {
            $done2.prepend(str);
        }
    }

    //if (mod && mod==='html' && temp.indexOf(str2) > 0) {
    //        temp.replace(str2, '');
    //    }
}

function tips() {
    //    var temp = $done.html();
    //    if (temp.indexOf(str2) > 0) {
    //        temp.replace(str2, '');
    //    }
    doneTips(str2, 'html', '$done');
    //alert('必要选项不能为空！');
    $('.bR').removeClass('bR');
}

//function delImg() {
//    $('.delImg').on('click', function(){
//       $(this).parent().parent().remove();
//       $addImgPos.attr('data-max', addImgStart--);
//    });
//}
