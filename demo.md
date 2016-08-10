# kill-cms demo

```html
<!--webbot bot="AdvTitleList" nodeid="" type="0" spanmode="0" dayspan="0" attr="" comstring="<Repeat Begin=0 End=5>
<Article>
    <div class=#enpquot#swiper-slide#enpquot#>
        <Url>
            <a href=ArticleUrlPh ></Url>
        <Picture needcode=1 width=598 height=397>PictureUrlPh</Picture>
        </a>
        <p class=#enpquot#name#enpquot#>
            <Url>
                <a href=ArticleUrlPh ></Url>
            <Title length=#enpquot#0#enpquot#>TitlePh</Title>
            </a>
        </p>
    </div>
</Article>
</Repeat>" TAG="BODY" PREVIEW="[高级标题列表]" artattr="0" isshowcode="0" titlekeyword="" keyword="" tagstring="00" starttime="" endtime="" id="__enpspecial_003266d856304c6c90e62f926a2d1edc" startspan -->
<!--webbot bot="AdvTitleList" endspan i-checksum="0" -->


<Repeat Begin=0 End=5>
    <Article>
        <div class="swiper-slide">
            <Url>
                <a href=ArticleUrlPh></Url>
            <Picture needcode=1 width=598 height=397>PictureUrlPh</Picture>
            </a>
            <p class="name">
                <Url>
                    <a href=ArticleUrlPh></Url>
                <Title length="0">TitlePh</Title>
                </a>
            </p>
        </div>
    </Article>
</Repeat>
```

## html

```html
<kill nodeid="11138794" attr="+63">
    <div class="swiper-slide">
        <a href="#">
            <img data-src="local/4.png" width="100%" height="auto" alt=""> </a>
        <p><a href="#"> h2 2016年二十国集团峰会第一次协调人会议圆满结束</a></p>
    </div>
    <div class="swiper-slide">
        <a href="#">
            <img data-src="local/4.png" width="100%" height="auto" alt=""> </a>
        <p><a href="#"> h2 2016年二十国集团峰会第一次协调人会议圆满结束</a></p>
    </div>
</kill>
```

## html2

```html
<div class="swiper-slide">
    <a href="#">
        <img data-src="local/4.png" width="100%" height="auto" alt=""> </a>
    <p><a href="#"> h2 2016年二十国集团峰会第一次协调人会议圆满结束</a></p>
</div>
```

## small template

```html
<Repeat Begin=0 End=5>
    <Article>
<div class="swiper-slide">
    <Url><a href=ArticleUrlPh></Url>
        <img data-src="<Picture needcode=0>PictureUrlPh</Picture>" width="100%" height="auto" alt="">
    </a>
    <p>
        <Url>
            <a href=ArticleUrlPh></Url>
            <Title length="0">TitlePh</Title>
        </a>
    </p>
</div>
    </Article>
</Repeat>
```

```
<Article>
    <h2 class="bigTitle"> <Url><a href=ArticleUrlPh></Url><Title length="0">TitlePh</Title>
</a> </h2>
    <p class="abs">
        <Abstract>AbstractPh</Abstract>
        <Url>
            <a href=ArticleUrlPh></Url>【详细】</a>
    </p>
</Article>
```
