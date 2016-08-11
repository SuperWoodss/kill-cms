# 一 特殊用法：

1. 只取文章标题

  ```html
  <Article><Title length="-1">TitlePh</Title></Article>
  ```

2. 多图翔宇：

  ```html
  <picture needcode="1" border="0" iter="3" bsrc="true" src="PictureUrlPh">PictureUrlPh</picture>
  ```

3. 只取图片地址的：

  ```html
  <picture needcode="0">PictureUrlPh</picture>
  ```

## 图片翔宇说明：

- 0 只取绝对路径，没有标签修饰
- 1 取相对路径，有标签修饰
- 5 取绝对路径，有标签修饰

## 标题翔宇说明：

- -1时：只取标题，不取连接(针对链接稿)
- 0时：取标题和连接(针对链接稿)
- 10时：取标题长度，取标题和连接(针对链接稿)

# 二 快捷方法：

1. 标题链接

  ```html
  <Url><a href=ArticleUrlPh target="_blank"></Url><Title length="0">TitlePh</Title></a>
  ```

2. 文章细缆链接地址

  ```html
  <Url>ArticleUrlPh</Url>
  ```

3. ul li 循环的翔宇组件： +63普通 +61图片 +62头条

  ```html
  <!--webbot bot="AdvTitleList" nodeid="111111" type="0" spanmode="0" dayspan="0" attr="" comstring="<ul><Repeat Begin=1 End=8><Article><li><Url><a href=ArticleUrlPh target=#enpquot#_blank#enpquot#></Url><Title length=#enpquot#0#enpquot#>TitlePh</Title></a></li></Article></Repeat>
  </ul>" TAG="BODY" PREVIEW="[高级标题列表]" artattr="0" isshowcode="0" titlekeyword="" keyword="" tagstring="00" starttime="" endtime="" id="__enpspecial_b29db9f9def948ec8d6397c8e21c9a79" startspan --><!--webbot bot="AdvTitleList" endspan i-checksum="0" -->
  ```

4. 详细的链接

  ```html
  <Url><a href=ArticleUrlPh class="more" target="_blank"></Url>详细>></a>
  ```

5. 图片链接

  ```html
  <Url><a href=ArticleUrlPh target="_blank"></Url><Picture needcode=1 width=120 height=84  border=0>PictureUrlPh</Picture></a>
  ```

6. 摘要

  ```html
  <Url><a href=ArticleUrlPh target="_blank"></Url><Abstract>AbstractPh</Abstract></a>
  ```

# 三 其他汇总：

ssi使用方法：

```html
<!--#include virtual="ssitop.htm"-->
```
