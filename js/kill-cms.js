/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-08-09-06:45:42
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-08-18-01:06:44
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

    // attr
    let attr = '';
    let $attr = $('#attr');
    let $attrText = $attr.find('.attr');
    let $nameAttrArray = $attr.find('[name="attr"]');

    let $format = $('#format');
    let $formatInput = $format.find('input');
    let n = '\n';
    $formatInput.eq(0).on('click', (e) => {
        n = '\n';
    });
    $formatInput.eq(1).on('click', (e) => {
        n = '';
    });

    // killHandler
    let killHandler = ($tempDOM) => {
        let $output = $('#output');
        let nodeid = $('#nodeid').val();
        let repeat = $('#repeat').val();
        let dayspan = (repeat < 200) ? 0 : repeat;

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
            let $this = $(e);

            if ($this.find('img').length === 0) {
                $this.text(cms.Title);
            }
            // else {
            //     let html = $.trim($(e).html());
            //     console.log(html);
            //     $this.html(html);
            // }
        });

        // 处理 $abs
        $abs.each((i, e) => {
            let $this = $(e);
            if ($this.find('a')) {
                let aText = $this.find('a').text();
                $this.text(cms.Abstract + 'URL_BEGIN<a href="' + cms.ArticleUrlPh + '">URL_END' + aText + '</a>');
            } else {
                $this.text(cms.Abstract);
            }
        });

        // 处理 $subTitle
        $subTitle.each((i, e) => {
            let $this = $(e);
            if ($this.find('a')) {
                $this.text('URL_BEGIN<a href="' + cms.ArticleUrlPh + '">URL_END' + cms.Subtitle + '</a>');
            } else {
                $this.text(cms.Subtitle);
            }
        });

        // 处理 a href自身
        $a.attr('href', cms.ArticleUrlPh).before('URL_BEGIN').prepend('URL_END');

        // 处理 img
        $img.each((i, e) => {
            let $this = $(e);
            $this.replaceWith(() => {
                let temp = cms.Picture.needcode[2];
                if ($this.attr('data-src')) {
                    temp = cms.Picture.needcode[0]
                } else if ($this.attr('data-original')) {
                    temp = cms.Picture.needcode[1]
                }
                return temp;
            });
        });

        //
        let orgHtml = $tempDOM.html();

        // demo:
        orgHtml = $.HTMLFormat(orgHtml, {
            indent_size: (n === '\n') ? 4 : 0,
            wrap: (n === '\n') ? true : false,
            indent_character: (n === '\n') ? ' ' : '',
            // max_char: 0x10000000
        });
        console.log('HTMLFormat orgHtml: ', orgHtml);

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

        console.log(outputTemp);

        $output.text(outputTemp);
    }

    // attrHandler
    // 初始化激活默认
    $nameAttrArray.eq(0)[0].checked = true;
    let attrHandler = (e) => {
        $nameAttrArray.eq(0)[0].checked = false;

        let $this = $(e.currentTarget);
        let v = '+' + $this.val();
        console.log(v);

        console.log($this[0].checked && v !== '+');

        if ($this[0].checked && v !== '+') {
            $this.attr('data-attr', v);
        } else {
            $this.attr('data-attr', '');
        }
        //
        // if (attr !== '' || v !== '+') {
        //     $attrText.text(attr);
        // } else {
        //     $attrText.text('默认');
        // }
    }

    $nameAttrArray.on('change', (e) => {
        let $this = $(e.currentTarget);
        if ($this.val() !== '') {
            attrHandler(e);
        } else { // 点击默认列表关闭其它
            $nameAttrArray
                .attr('data-attr', '')
                .each((i, e) => {
                    let $this = $(e);
                    if (i === 0) {
                        $this[0].checked = true;
                    } else {
                        $this[0].checked = false;
                    }
                });
        }
    });

    let $submit = $('#submit');
    $submit.on('click', () => {

        let $input = $('#input');
        let inputVal = $input.val();
        let $tempDOM = $('#tempDOM');
        // 隐藏临时DOM
        // $tempDOM.hide();

        // 克隆 input 内容
        cloneDOM($tempDOM, $.trim(inputVal));


        // 收集 attr
        attr = '';
        $('#attr')
            .find('input')
            .each((i, e) => {
                let v = $(e).attr('data-attr');
                console.log(v);
                if (v) {
                    attr += v;
                }
            });
        console.log('attr:', attr);

        // 转译 tempDOM 并输出
        killHandler($tempDOM);
    });
});
