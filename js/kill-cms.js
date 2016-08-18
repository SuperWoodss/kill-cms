/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-08-09-06:45:42
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-08-18-06:15:47
 */

$(() => {
    // 开发模块
    let $tempShow = $('#tempShow');
    // 临时DOM
    let $tempDOM = $('#tempDOM');

    // 隐藏临时DOM和开发模块
    // $tempShow.show();
    // $tempDOM.show();

    // 克隆input 到 tempDOM
    let cloneDOM = ($tempDOM, DOM) => {
        $tempDOM.html(DOM);
    }

    // attr
    let attr = '';
    let $attr = $('#attr');
    let $attrText = $attr.find('.attr');
    let $nameAttrArray = $attr.find('[name="attr"]');

    // 是否折行 （‘\n’）
    let $format = $('#format');
    let $formatInput = $format.find('input');
    let n = '';
    $formatInput.eq(0).on('click', (e) => {
        n = '\n';
    });
    $formatInput.eq(1).on('click', (e) => {
        n = '';
    });

    // 判断是否有 class
    let classHandler = ($tag) => {
        let className = $tag.attr('class');
        return (className.length > 0) ? ` class="${className}"` : '';
    }

    // 主处理器 killHandler
    let killHandler = ($tempDOM) => {
        let $output = $('#output');
        let nodeid = $('#nodeid').val();
        let repeat = $('#repeat').val();
        let dayspan = (repeat < 200) ? 0 : repeat;

        // cms 规则
        let cms = {
            begin: '<!--webbot bot="AdvTitleList" nodeid="' + ((nodeid === '') ? '888888' : nodeid) + '" type="0" spanmode="0" dayspan="' + dayspan + '" attr="' + attr + '" comstring="',
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
            Subtitle: '<Subtitle>SubtitlePh</Subtitle>',
            end: '" TAG="BODY" PREVIEW="[高级标题列表]" artattr="0" isshowcode="0" titlekeyword="" keyword="" tagstring="00" starttime="" endtime="" id="" startspan --><!--webbot bot="AdvTitleList" endspan i-checksum="0" -->'
        };

        // 预处理 tempDOM
        // console.log('orgHtml0:', $tempDOM.html());
        let $a = $tempDOM.find('a');
        let $abs = $tempDOM.find('.abs');
        let $subTitle = $tempDOM.find('.subTitle');
        let $ul = $tempDOM.find('ul');

        let $img = $tempDOM.find('img');
        let imgWidth = $img.attr('width');
        let imgHeight = $img.attr('height');

        // 处理 a 内部内容
        // let aHandler = () => {
        $a.each((i, e) => {
            let $this = $(e);
            console.log('$a0:', $this.find('img').size() === 0);
            console.log('$a1:', $this.text().indexOf('详细') !== 0);
            if ($this.find('img').size() === 0 && $this.text().indexOf('详细') !== 0) {
                $this.text(cms.Title);
            }
            // else {
            //     let html = $.trim($(e).html());
            //     console.log(html);
            //     $this.html(html);
            // }
        });
        // };
        // aHandler();

        // 处理 $abs
        $abs.each((i, e) => {
            let $this = $(e);
            // console.log('$abs0:', $this.find('a').size() > 0);
            if ($this.find('a').size() > 0) {
                let aText = $this.find('a').text();
                console.log('$abs1:', aText);
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

        // 开发模块：展示处理后的DOM
        let showDOM = (DOM) => {
            $tempShow.text(DOM);
        }
        showDOM(orgHtml);

        // 获取处理后的 DOM
        let $li = $ul.find('li');
        let size = $li.size();
        console.log(size);

        if ($ul && size > 1) {
            // orgHtml =
            //     '<ul' + (($ul.hasClass('list')) ? ' class="list"' : '') + '>' + n +
            //     '<Repeat Begin=0 End=' + size + '>' + n +
            //     '<Article>' + n +
            //     '<li>' + $li.eq(0).html() + '</li>' + n +
            //     '</Article>' + n +
            //     '</Repeat>' + n +
            //     '</ul>' + n;

            // 处理 ul 的 class
            let ulClass = classHandler($ul);
            console.log(ulClass);

            // 处理 li 的 class
            let liClass = classHandler($li);
            console.log(liClass);

            // 转换 orgHtml
            orgHtml =
                `<ul${ulClass}>
                    <Repeat Begin=0 End=${size}>
                        <Article>
                            <li${liClass}>${$li.eq(0).html()}</li>
                        </Article>
                    </Repeat>
                </ul>`;
        } else {
            // 添加 Article
            orgHtml = '<Article>' + n + orgHtml + n + '</Article>' + n;
            // 添加 Repeat
            if (repeat !== '' && repeat > 0) {
                orgHtml = '<Repeat Begin=0 End=' + repeat + '>' + n + orgHtml + n + '</Repeat>' + n;
            }
        }

        // 格式化 orgHtml
        orgHtml = $.HTMLFormat(orgHtml, {
            indent_size: (n === '\n') ? 4 : 0,
            wrap: (n === '\n') ? true : false,
            indent_character: (n === '\n') ? ' ' : '',
        });
        console.log('HTMLFormat orgHtml: ', orgHtml);
        // console.log('orgHtml1:', orgHtml);

        // 使用正则转码
        orgHtml = orgHtml
            .replace(/picture/g, 'Picture')
            .replace(/URL_BEGIN/g, '<Url>')
            .replace(/URL_END/g, '</Url>')
            .replace(/</g, cms.lt)
            .replace(/>/g, cms.gt)
            .replace(/"/g, cms.enpquot);

        console.log('newHtml:', orgHtml);

        // 清空 outputTemp
        let outputTemp = '';

        // 重新给 outputTemp 赋值
        outputTemp =
            cms.begin +
            n +
            orgHtml +
            n +
            cms.end;

        console.log(outputTemp);

        // 输出结果（必须是字符串）
        $output.text(outputTemp);
    }

    // 初始化激活 默认属性
    $nameAttrArray.eq(0)[0].checked = true;

    // 属性处理器
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

    // 当属性改变时
    $nameAttrArray.on('change', (e) => {
        let $this = $(e.currentTarget);
        if ($this.val() !== '') {
            attrHandler(e);
        } else {
            // 点击默认列表关闭其它属性
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

    // 提交
    let $submit = $('#submit');
    $submit.on('click', () => {

        let $input = $('#input');
        let inputVal = $input.val();

        // 克隆 input 内容转为 killHandler 可以处理的 DOM结构
        cloneDOM($tempDOM, $.trim(inputVal));

        // 收集输出 attr
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

    // footer添加版本信息，读取 package.json 中 version对象
    $.when($.ajax('package.json')).then((data) => {
        let v = data.version;
        $('title').append('_v' + v);
        $('footer').append(' _v ' + v);
    });
});


// var people = ['Wayou', 'John', 'Sherlock'];
// //sayHello函数本来接收三个单独的参数人妖，人二和人三
// function sayHello(people1, people2, people3) {
//     `${people1}`
//     console.log(`Hello ${people1},${people2},${people3}`);
// }
// //但是我们将一个数组以拓展参数的形式传递，它能很好地映射到每个单独的参数
// sayHello(...people); //输出：Hello Wayou,John,Sherlock
// `${people}`
