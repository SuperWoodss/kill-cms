/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-08-09-06:45:42
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-08-17-05:01:27
 */

$(() => {
    // 克隆input 到 tempDOM
    let cloneDOM = ($tempDOM, DOM) => {
        $tempDOM.html(DOM);
    }

    // 开发模块：展示处理后的DOM
    let showDOM = (DOM) => {
        let $tempShow = $('#tempShow');
        $tempShow.text(DOM);
    }

    let attr = '';

    // killHandler
    let killHandler = ($tempDOM) => {
        let $output = $('#output');
        let nodeid = $('#nodeid').val();
        let repeat = $('#repeat').val();
        let dayspan = (repeat < 200) ? 0 : repeat;

        let nOn = 1; // 0: false, 1: tre\ue;
        let n = (nOn) ? '\n' : '';

        // let n = '';
        let cms = {
            begin: '<!--webbot bot="AdvTitleList" nodeid="' + ((nodeid === '') ? '888888' : nodeid) + '" type="0" spanmode="0" dayspan="' + dayspan + '" attr="' + attr + '" comstring="' + n,
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

        // console.log('orgHtml0:', $tempDOM.html());
        let $a = $tempDOM.find('a');
        let $abs = $tempDOM.find('.abs');
        let $subTitle = $tempDOM.find('.subTitle');
        let $ul = $tempDOM.find('ul');

        let $img = $tempDOM.find('img');
        let imgWidth = $img.attr('width');
        let imgHeight = $img.attr('height');

        // 处理 a 内部内容
        $a.each((i, e) => {
            var _this = $(e);
            if (_this.find('img').length === 0) {
                _this.text(cms.Title);
            }
        });

        // 处理 $abs
        $abs.each((i, e) => {
            let _this = $(e);
            if (_this.find('a')) {
                let aText = _this.find('a').text();
                _this.text(cms.Abstract + 'URL_BEGIN<a href="' + cms.ArticleUrlPh + '">URL_END' + aText + '</a>');
            } else {
                _this.text(cms.Abstract);
            }
        });

        // 处理 $subTitle
        $subTitle.each((i, e) => {
            let _this = $(e);
            if (_this.find('a')) {
                _this.text('URL_BEGIN<a href="' + cms.ArticleUrlPh + '">URL_END' + cms.Subtitle + '</a>');
            } else {
                _this.text(cms.Subtitle);
            }
        });

        // 处理 a href自身
        $a.attr('href', cms.ArticleUrlPh).before('URL_BEGIN').prepend('URL_END');

        // 处理 img
        $img.each((i, e) => {
            let _this = $(e);
            _this.replaceWith(() => {
                let temp = cms.Picture.needcode[2];
                if (_this.attr('data-src')) {
                    temp = cms.Picture.needcode[0]
                } else if (_this.attr('data-original')) {
                    temp = cms.Picture.needcode[1]
                }
                return temp;
            });
        });

        //
        let orgHtml = $tempDOM.html();

        // 开发用模块：查看处理完的 DOM
        showDOM(orgHtml);

        // 获取处理后的 DOM
        let $li = $ul.find('li');
        let size = $li.size();
        console.log(size);
        if ($ul && size > 1) {
            orgHtml =
                '<ul' + (($ul.hasClass('list')) ? ' class="list"' : '') + '>' + n +
                '<Repeat Begin=0 End=' + size + '>' + n +
                '<Article>' + n +
                '<li>' + $li.eq(0).html() + '</li>' + n +
                '</Article>' + n +
                '</Repeat>' + n +
                '</ul>' + n;
        } else {
            // 添加 Article
            orgHtml = '<Article>' + n + orgHtml + n + '</Article>' + n;
            // 添加 Repeat
            if (repeat !== '' && repeat > 0) {
                orgHtml = '<Repeat Begin=0 End=' + repeat + '>' + n + orgHtml + n + '</Repeat>' + n;
            }
        }

        // console.log('orgHtml1:', orgHtml);

        // 转码
        orgHtml = orgHtml
            .replace(/picture/g, 'Picture')
            .replace(/URL_BEGIN/g, '<Url>')
            .replace(/URL_END/g, '</Url>')
            .replace(/</g, cms.lt)
            .replace(/>/g, cms.gt)
            .replace(/"/g, cms.enpquot);

        console.log('newHtml:', orgHtml);

        let outputTemp = '';
        outputTemp =
            cms.begin + n +
            orgHtml + n +
            cms.end;

        $output.text(outputTemp);
    }

    // attrHandler
    let $attr = $('#attr');
    let $attrText = $attr.find('.attr');
    let $nameAttrArray = $attr.find('[name="attr"]');

    let attrHandler = (e) => {
        let $this = $(e.currentTarget);
        let v = '+' + $this.val();
        console.log(v);

        console.log($this[0].checked && v !== '+');

        if ($this[0].checked && v !== '+') {
            attr += v;
            console.log('attr:', attr);
        } else {
            // let reg = new RegExp(eval('/' + v + '/g'));
            // console.log(reg);
            attr = attr.replace(eval(v) + '/g', '');
        }

        if (attr !== '' || v !== '+') {
            $attrText.text(attr);
        } else {
            $attrText.text('默认');
        }
    }

    $nameAttrArray.on('change', (e) => {
        attrHandler(e);
    });

    let $submit = $('#submit');
    $submit.on('click', () => {

        let $input = $('#input');
        let inputVal = $input.val();
        let $tempDOM = $('#tempDOM');

        // 克隆 input 内容
        cloneDOM($tempDOM, $.trim(inputVal));

        // 转译 tempDOM 并输出
        killHandler($tempDOM);
    });
});
