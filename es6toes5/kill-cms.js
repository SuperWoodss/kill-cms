'use strict';

/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-08-09-06:45:42
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-08-10-09:55:48
 */

$(function () {
    var cloneDOM = function cloneDOM($tempDOM, tempDOM) {
        $tempDOM.html(tempDOM);
    };
    var killHandler = function killHandler($tempDOM) {
        var $output = $('#output');
        var nodeid = $('#nodeid').val();
        var attr = $('#attr').attr('data-attr');
        var repeat = $('#repeat').val();

        // let n = '\n';
        var n = '';
        var cms = {
            begin: '<!--webbot bot="AdvTitleList" nodeid="' + (nodeid === '' ? '888888' : nodeid) + '" type="0" spanmode="0" dayspan="0" attr="' + (attr === '' ? '' : '+' + attr) + '" comstring="' + n,
            lt: '&lt;',
            gt: '&gt;',
            enpquot: '#enpquot#',
            Picture: {
                needcode: ['<img data-src="<Picture needcode=0>PictureUrlPh</Picture>">', '<img data-original="<Picture needcode=0>PictureUrlPh</Picture>">',
                // '<img data-src="<Picture needcode=0>PictureUrlPh</Picture>" width="' + imgWidth + '" height="' + imgHeight + '" alt="<Title length="0">TitlePh</Title>">',
                '<Picture needcode=1 width=100 height=100>PictureUrlPh</Picture>']
            },
            Title: '<Title length="0">TitlePh</Title>',
            ArticleUrlPh: 'ArticleUrlPh',
            Abstract: '<Abstract>AbstractPh</Abstract>',
            Subtitle: n + '<Subtitle>SubtitlePh</Subtitle>',
            end: '" TAG="BODY" PREVIEW="[高级标题列表]" artattr="0" isshowcode="0" titlekeyword="" keyword="" tagstring="00" starttime="" endtime="" id="" startspan --><!--webbot bot="AdvTitleList" endspan i-checksum="0" -->'
        };

        console.log('orgHtml0:', $tempDOM.html());

        var $a = $tempDOM.find('a');
        var $abs = $tempDOM.find('.abs');
        var $subTitle = $tempDOM.find('.subTitle');
        var $ul = $tempDOM.find('ul');

        var $img = $tempDOM.find('img');
        var imgWidth = $img.attr('width');
        var imgHeight = $img.attr('height');

        // 处理 a 内部内容
        $a.each(function () {
            var _this = $(this);
            if (_this.find('img').length === 0) {
                _this.text(cms.Title);
            }
        });

        // 处理 $abs
        $abs.each(function () {
            var _this = $(this);
            if (_this.find('a')) {
                var aText = _this.find('a').text();
                _this.text(cms.Abstract + 'UrlBegin<a href="' + cms.ArticleUrlPh + '">UrlEnd' + aText + '</a>');
            } else {
                _this.text(cms.Abstract);
            }
        });

        // 处理 $subTitle
        $subTitle.each(function () {
            var _this = $(this);
            if (_this.find('a')) {
                _this.text('UrlBegin<a href="' + cms.ArticleUrlPh + '">UrlEnd' + cms.Subtitle + '</a>');
            } else {
                _this.text(cms.Subtitle);
            }
        });

        // 处理 a href自身
        $a.attr('href', cms.ArticleUrlPh).before('UrlBegin').prepend('UrlEnd');

        // 处理 img
        $img.each(function () {
            var _this = $(this);
            _this.replaceWith(function () {
                var temp = cms.Picture.needcode[2];
                if (_this.attr('data-src')) {
                    temp = cms.Picture.needcode[0];
                } else if (_this.attr('data-original')) {
                    temp = cms.Picture.needcode[1];
                }
                return temp;
            });
        });

        var orgHtml = $tempDOM.html();

        // 获取处理后的 DOM
        var $li = $ul.find('li');
        var size = $li.size();
        console.log(size);
        if ($ul && size > 1) {
            orgHtml = '<ul' + ($ul.hasClass('list') ? ' class="list"' : '') + '>' + n + '<Repeat Begin=0 End=' + size + '>' + n + '<Article>' + n + '<li>' + $li.eq(0).html() + '</li>' + n + '</Article>' + n + '</Repeat>' + n + '</ul>' + n;
        } else {
            // 添加 Article
            orgHtml = '<Article>' + n + orgHtml + '</Article>' + n;
            // 添加 Repeat
            if (repeat !== '' && repeat > 0) {
                orgHtml = '<Repeat Begin=0 End=' + repeat + '>' + n + orgHtml + '</Repeat>' + n;
            }
        }

        console.log('orgHtml1:', orgHtml);

        // 转码
        orgHtml = orgHtml.replace(/picture/g, 'Picture').replace(/UrlBegin/g, '<Url>').replace(/UrlEnd/g, '</Url>').replace(/</g, cms.lt).replace(/>/g, cms.gt).replace(/"/g, cms.enpquot);

        console.log('newHtml:', orgHtml);

        var outputTemp = '';
        outputTemp = cms.begin + orgHtml + cms.end;

        $output.text(outputTemp);
    };

    var $submit = $('#submit');
    $submit.on('click', function () {

        var $input = $('#input');
        var tempDOM = $input.val();
        var $tempDOM = $('#tempDOM');

        cloneDOM($tempDOM, tempDOM);
        killHandler($tempDOM);
        // if (tempDOM !== '') {
        //
        // } else {
        //     alert('你在逗我吗？');
        // }
    });
});