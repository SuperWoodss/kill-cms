/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-08-09-06:45:42
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-08-10-03:19:11
 */

$(() => {
    let $input = $('#input');
    let tempDOM = $input.val();
    let $tempDOM = $('#tempDOM');
    let cloneDOM = () => {
        $tempDOM.html(tempDOM);
    }
    let killHandler = () => {
        let $output = $('#output');
        let nodeid = $('#nodeid').val();
        let attr = $('#attr').val();
        let cms = {
            begin: '<!--webbot bot="AdvTitleList" nodeid="' + ((nodeid === '') ? '缺少信息片ID' : nodeid) + '" type="0" spanmode="0" dayspan="0" attr="' + ((attr === '') ? '' : ('+' + attr)) + '" comstring="\n',
            lt: '&lt;',
            gt: '&gt;',
            enpquot: '#enpquot#',
            Picture: {
                needcode: [
                    '<img data-src="<Picture needcode=0>PictureUrlPh</Picture>" width="' + imgWidth + '" height="' + imgHeight + '" alt="<Title length="0">TitlePh</Title>">',
                    '<Picture needcode=1 width=' + imgWidth + ' height=' + imgHeight + '>PictureUrlPh</Picture>'
                ]
            },
            Title: '<Title length="0">TitlePh</Title>',
            href: 'ArticleUrlPh',
            end: '\n" TAG="BODY" PREVIEW="[高级标题列表]" artattr="0" isshowcode="0" titlekeyword="" keyword="" tagstring="00" starttime="" endtime="" id="" startspan --><!--webbot bot="AdvTitleList" endspan i-checksum="0" -->'
        };

        console.log('orgHtml0:', $tempDOM.html());

        let $a = $tempDOM.find('a');

        let $img = $tempDOM.find('img');
        let imgWidth = $img.attr('width');
        let imgHeight = $img.attr('height');


        $a.attr('href', cms.href).before('UrlBegin').prepend('UrlEnd');

        // 处理 DOM
        $a.each(function (index, e) {
            var _this = $(this);

            // console.log(_this);
            // _this.attr('href', cms.href);
            // _this.before('UrlBegin');

            console.log(_this.find('img').length);

            if (_this.find('img').length === 0) {
                _this.html(cms.Title);
            }
        });

        // 处理 img
        $img.parent().text(cms.Picture.needcode[0]);

        // 获取处理后的 DOM
        let orgHtml = $tempDOM.html();

        console.log('orgHtml1:', orgHtml);

        orgHtml = orgHtml
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
        cloneDOM();
        killHandler();
        // if (tempDOM !== '') {
        //
        // } else {
        //     alert('你在逗我吗？');
        // }
    });

});
