/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-08-09-06:45:42
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-08-22-01:52:50
 */

$(() => {
    // kill 参数数组
    let killConfigArray;

    // 克隆input 到 tempDOM
    let cloneDOM = ($tempDOM, DOM) => {
        $tempDOM.html(DOM);
    }

    // attr
    // let attr = '';
    // let $attr = $('#attr');
    // let $attrText = $attr.find('.attr');
    // let $nameAttrArray = $attr.find('[name="attr"]');

    // 是否折行 （‘\n’）
    let $format = $('#format');
    let $formatInput = $format.find('input');
    // let wrap = ''; // 起始选中连续
    let wrap = '';
    $formatInput.eq(0).on('click', (e) => {
        wrap = '\n';
    });
    $formatInput.eq(1).on('click', (e) => {
        wrap = '';
    });

    // 控制 checked 现实状态
    if (wrap === '\n') {
        $formatInput.eq(0).attr('checked', true);
        $formatInput.eq(1).attr('checked', false);
    } else {
        $formatInput.eq(0).attr('checked', false);
        $formatInput.eq(1).attr('checked', true);
    }

    // 判断是否有 class
    let classHandler = ($tag) => {
        let className = $tag.attr('class');
        return (className && className.length > 0) ? ` class="${className}"` : '';
    }

    // 主处理器 killHandler
    let killHandler = ($tempDOM, i) => {

        console.log($tempDOM[0], i);

        // 声明 killAttr属性 array:([0]:中文名, [1]:nodeid, [2]:attr);
        let killAttrs = killConfigArray[i] ? killConfigArray[i] : ['未命名栏目', '888888', '默认'];

        console.log('killAttrs:', killAttrs);

        // 预处理 tempDOM
        let $a = $tempDOM.find('a');
        let $abs = $tempDOM.find('.abs');
        let $subTitle = $tempDOM.find('.subTitle');
        let $img = $tempDOM.find('img');
        let imgWidth = $img.attr('width');
        let imgHeight = $img.attr('height');

        // 声明 nodeid,attr, repeat
        let nodeid = killAttrs[1];
        let attr = killAttrs[2];

        let repeat = 0;
        // (() => {
        //     let $div = $tempDOM.find('div');
        //     if ($div) {
        //         let divSize = $div.size();
        //         if (divSize > 0) {
        //             return divSize;
        //         }
        //     }
        // })();
        let dayspan = (repeat < 200 || dayspan === undefined) ? 0 : repeat;

        // cms 规则
        let cms = {
            lt: '&lt;',
            gt: '&gt;',
            enpquot: '#enpquot#',
            Picture: {
                needcode: [
                    '<img data-src="<Picture needcode=0>PictureUrlPh</Picture>">',
                    '<img data-original="<Picture needcode=0>PictureUrlPh</Picture>">',
                    `<Picture needcode=1 width=${(imgWidth)?imgWidth:100} height=${(imgHeight)?imgHeight:100}>PictureUrlPh</Picture>`,
                    // '<img data-src="<Picture needcode=0>PictureUrlPh</Picture>" width="' + imgWidth + '" height="' + imgHeight + '" alt="<Title length="0">TitlePh</Title>">',
                ]
            },
            Title: '<Title length="0">TitlePh</Title>',
            ArticleUrlPh: 'ArticleUrlPh',
            Abstract: '<Abstract>AbstractPh</Abstract>',
            Subtitle: '<Subtitle>SubtitlePh</Subtitle>',
        };


        // 处理 a 内部内容
        // let aHandler = () => {
        $a.each((i, e) => {
            let $this = $(e);
            // console.log('$a0:', $this.find('img').size() === 0);
            // console.log('$a1:', $this.text().indexOf('详细') !== 0);
            if ($this.find('img').size() === 0 && $this.text().indexOf('详细') !== 0) {
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
            // console.log('$abs0:', $this.find('a').size() > 0);
            if ($this.find('a').size() > 0) {
                let aText = $this.find('a').text();
                console.log('$abs1:\n', aText);
                // $this.text(cms.Abstract + 'URL_BEGIN<a href="' + cms.ArticleUrlPh + '">URL_END' + aText + '</a>');
                $this.text(`${cms.Abstract}URL_BEGIN<a href="${cms.ArticleUrlPh}">URL_END${aText}</a>`);
            } else {
                $this.text(cms.Abstract);
            }
        });

        // 处理 $subTitle
        $subTitle.each((i, e) => {
            let $this = $(e);
            if ($this.find('a').size() > 0) {
                $this.text(`URL_BEGIN<a href="${cms.ArticleUrlPh}">URL_END${cms.Subtitle}</a>`);
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

        // 获取预处理过的 tempDOM
        let orgHtml = $tempDOM.html();

        // 处理 li DOM
        console.log('ul:', $tempDOM.is('ul'));
        console.log('div:', $tempDOM.hasClass('swiper-wrapper'));

        let outputType = 'html';
        let $ul = $tempDOM;

        if ($tempDOM.is('ul')) {

            // ul 处理
            let $li = $ul.children('li');
            let size = $li.size();

            console.log('li DOM1:', size > 1);

            if (size > 1) {
                // 处理 ul 的 class
                let ulClass = classHandler($ul);
                console.log(ulClass);

                // 处理 li 的 class
                let liClass = classHandler($li);
                console.log(liClass);

                // 转换 orgHtml
                orgHtml =
                    // `<ul${ulClass} kill="${killAttrs}">
                    `<ul${ulClass}>
                        <Repeat Begin=0 End=${size}>
                            <Article>
                                <li${liClass}>${$li.eq(0).html()}</li>
                            </Article>
                        </Repeat>
                    </ul>`;
                outputType = 'replaceWith';
            }

        } else if ($tempDOM.children('div').size() > 1) {

            // rot swiper-wrapper 处理
            let $li = $ul.children('div');
            let size = $li.size();

            console.log('div DOM1:', size > 1);

            if (size > 1) {
                // 处理 ul 的 class
                let ulClass = classHandler($ul);
                console.log(ulClass);
                // 处理 li 的 class
                let liClass = classHandler($li);
                console.log(liClass);
                // 转换 orgHtml
                orgHtml =
                    `<Repeat Begin=0 End=${size}>
                        <Article>
                            <div${liClass}>${$li.eq(0).html()}</div>
                        </Article>
                    </Repeat>`;
            }

        } else {
            // 添加 Article
            orgHtml = `<Article>${orgHtml}</Article>`;
            // // 添加 Repeat
            // if (repeat !== '' && repeat > 0) {
            //     orgHtml = `<Repeat Begin=0 End=${repeat}>${orgHtml}</Repeat>`;
            // }
        }

        // 格式化 orgHtml
        orgHtml = $.HTMLFormat(orgHtml, {
            indent_size: (wrap === '\n') ? 4 : 0,
            wrap: (wrap === '\n') ? true : false,
            indent_character: (wrap === '\n') ? ' ' : '',
        });

        console.log('HTMLFormat:\n', orgHtml);
        // console.log('orgHtml1:', orgHtml);

        // 使用正则转码
        orgHtml = orgHtml
            .replace(/picture/g, 'Picture')
            .replace(/URL_BEGIN/g, '<Url>')
            .replace(/URL_END/g, '</Url>')
            .replace(/</g, cms.lt)
            .replace(/>/g, cms.gt)
            .replace(/"/g, cms.enpquot);

        // console.log('newHtml:', orgHtml)
        let attrZh =
            (attr === '' || attr === null) ?
            '默认' :
            attr
            .replace('61', '图片')
            .replace('62', '头条')
            .replace('63', '普通');

        // 重新给 outputTemp 赋值
        let outputTemp =
            `
            <!-- ${killAttrs[0]} BEGIN nodeid:${nodeid}, attr:${attrZh} -->
            <!--webbot bot="AdvTitleList" nodeid="${(nodeid === '') ? '888888' : nodeid}" type="0" spanmode="0" dayspan="${dayspan}" attr="${(attr === 'null' || attr === '默认') ? '' : attr}" comstring="${wrap}${orgHtml}${wrap}" TAG="BODY" PREVIEW="[高级标题列表]" artattr="0" isshowcode="0" titlekeyword="" keyword="" tagstring="00" starttime="" endtime="" id="" startspan --><!--webbot bot="AdvTitleList" endspan i-checksum="0" -->
            <!-- ${killAttrs[0]} END -->
            `;

        // 给kill 添加内容
        // $tempDOM.attr('kill', killAttrs);
        $tempDOM.removeAttr('kill');

        // 输出结果至 kill DOM位置
        if (outputType === 'html') {
            $tempDOM.html(outputTemp);
        } else if (outputType === 'replaceWith') {
            $tempDOM.replaceWith(outputTemp);
        }
    }



    // 提交
    let $submit = $('#submit');
    $submit.on('click', () => {

        let $input = $('#input');
        let inputVal = $input.val();
        let $tempDOM = $('#tempDOM');

        // 隐藏临时DOM
        // $tempDOM.show();

        // 克隆 input 内容转为 killHandler 可以处理的 DOM结构
        cloneDOM($tempDOM, $.trim(inputVal));

        // 获取 kill-cms节点
        let $killCms = $tempDOM.find('[kill]');

        // 重置 killConfigArray
        killConfigArray = [];

        // 获取 killConfig
        let $killConfig = $tempDOM.find('#killConfig');
        let $killConfigLi = $killConfig.find('li');


        $killConfigLi.each((i, e) => {
            let t = $(e).text();
            t = t.split(',');

            t[0] = $.trim(t[0]); // 栏目名
            t[1] = $.trim(t[1]); // 信息片
            t[2] = $.trim(t[2]); // 属性

            // 转换 attr
            // console.log(t[1].indexOf('默认') >= 0);
            if (t[2].indexOf('默认') >= 0 || t[1] === '') {
                t[2] = 'null';

                // 添加清除重复的中文属性功能
                t[2] = t[2].replace(new RegExp('默认', 'g'), '');

            } else {
                t[2] = t[2]
                    .replace('图片', '+61')
                    .replace('头条', '+62')
                    .replace('普通', '+63');

                // 添加清除重复的中文属性功能
                t[2] = t[2]
                    .replace(new RegExp('图片', 'g'), '')
                    .replace(new RegExp('头条', 'g'), '')
                    .replace(new RegExp('普通', 'g'), '');
            }




            killConfigArray.push(t);
        });
        // let killCmsLen = $killCms.length;
        // let killConfigLiLen = $killConfigLi.length;


        // 移除 tempDOM 的 #killConfig
        $killConfig.remove();

        // killHandler each
        $killCms.each((i, e) => {
            killHandler($(e), i);
        });

        // 输出结果
        let $output = $('#output');
        $output.text($tempDOM.html());

        // if (killCmsLen <= killConfigLiLen) {
        //
        // } else {
        //     alert(`请检查"killConfig"配置, 我们发现似乎缺少"${killCmsLen - killConfigLiLen}"个项目`);
        // }
    });

    // footer添加版本信息，读取 package.json 中 version对象
    $.when($.ajax('package.json')).then((data) => {
        let v = data.version;
        $('title').append(' v' + v);
        $('#version').append(' v ' + v);
    });
});
