/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-08-09-06:45:42
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-08-10-07:14:31
 */

$(() => {
    let cloneDOM = ($tempDOM, tempDOM) => {
        $tempDOM.html(tempDOM);
    }
    let killHandler = ($tempDOM) => {
        let $output = $('#output');
        let nodeid = $('#nodeid').val();
        let attr = $('#attr').attr('data-attr');
        let repeat = $('#repeat').val();

        const n = '\n';
        const cms = {
            begin: '<!--webbot bot="AdvTitleList" nodeid="' + ((nodeid === '') ? '888888' : nodeid) + '" type="0" spanmode="0" dayspan="0" attr="' + ((attr === '') ? '' : ('+' + attr)) + '" comstring="' + n,
            lt: '&lt;',
            gt: '&gt;',
            enpquot: '#enpquot#',
            Picture: {
                needcode: [
                    '<img data-src="<Picture needcode=0>PictureUrlPh</Picture>">',
                    '<img data-original="<Picture needcode=0>PictureUrlPh</Picture>">',
                    // '<img data-src="<Picture needcode=0>PictureUrlPh</Picture>" width="' + imgWidth + '" height="' + imgHeight + '" alt="<Title length="0">TitlePh</Title>">',
                    '<Picture needcode=1 width=100 height=100>PictureUrlPh</Picture>'
                ]
            },
            Title: '<Title length="0">TitlePh</Title>',
            ArticleUrlPh: 'ArticleUrlPh',
            Abstract: '<Abstract>AbstractPh</Abstract>',
            Subtitle: n + '<Subtitle>SubtitlePh</Subtitle>',
            end: '" TAG="BODY" PREVIEW="[高级标题列表]" artattr="0" isshowcode="0" titlekeyword="" keyword="" tagstring="00" starttime="" endtime="" id="" startspan --><!--webbot bot="AdvTitleList" endspan i-checksum="0" -->'
        };



        console.log('orgHtml0:', $tempDOM.html());

        let $a = $tempDOM.find('a');
        let $abs = $tempDOM.find('.abs');
        let $subTitle = $tempDOM.find('.subTitle');

        let $img = $tempDOM.find('img');
        let imgWidth = $img.attr('width');
        let imgHeight = $img.attr('height');



        // 处理 a 内部内容
        $a.each(function () {
            var _this = $(this);

            // console.log(_this);
            // _this.attr('href', cms.href);
            // _this.before('UrlBegin');

            // console.log(_this.find('img').length);

            if (_this.find('img').length === 0) {
                _this.text(cms.Title);
            }
        });

        // 处理 $abs
        $abs.each(function () {
            let _this = $(this);
            if (_this.find('a')) {
                let aText = _this.find('a').text();
                _this.text(cms.Abstract + 'UrlBegin<a href="' + cms.ArticleUrlPh + '">UrlEnd' + aText + '</a>');
            } else {
                _this.text(cms.Abstract);
            }
        });

        // 处理 $subTitle
        $subTitle.each(function () {
            let _this = $(this);
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
            $(this).replaceWith(function () {
                let _this = $(this);
                let temp = cms.Picture.needcode[2];
                if (_this.attr('data-src')) {
                    temp = cms.Picture.needcode[0]
                } else if (_this.attr('data-original')) {
                    temp = cms.Picture.needcode[1]
                }
                return temp;
            });
        });

        // 获取处理后的 DOM
        let orgHtml = $tempDOM.html();

        // 添加 Article
        orgHtml = '<Article>' + n + orgHtml + '</Article>' + n;

        // 添加 Repeat
        if (repeat !== '' && repeat > 0) {
            orgHtml = '<Repeat Begin=0 End=' + repeat + '>' + n + orgHtml + '</Repeat>' + n;
        }

        console.log('orgHtml1:', orgHtml);

        // 转码
        orgHtml = orgHtml
            .replace(/picture/g, 'Picture')
            .replace(/UrlBegin/g, '<Url>')
            .replace(/UrlEnd/g, '</Url>')
            .replace(/</g, cms.lt)
            .replace(/>/g, cms.gt)
            .replace(/"/g, cms.enpquot);

        console.log('newHtml:', orgHtml);


        let outputTemp = '';
        outputTemp =
            cms.begin +
            orgHtml +
            cms.end;

        $output.text(outputTemp);
    }

    let $submit = $('#submit');
    $submit.on('click', () => {

        let $input = $('#input');
        let tempDOM = $input.val();
        let $tempDOM = $('#tempDOM');

        cloneDOM($tempDOM, tempDOM);
        killHandler($tempDOM);
        // if (tempDOM !== '') {
        //
        // } else {
        //     alert('你在逗我吗？');
        // }
    });

});
