# puppeteer 8comic crawler

此程式主要是透過 "puppeteer" 這個套件，來執行爬蟲的主要工作。

以8comic網站為主。

## 需要安裝的套件為以下三個
![Imgur_1](https://imgur.com/Hl4OIvl.png)
---

##  安裝 puppeteer 的指令
`npm install puppeteer`


[puppeteer 官方網站](https://pptr.dev/)


## 爬蟲方法




> 首先先去抓出圖片的網址，先用 chrome 瀏覽網頁在按 F12 進入 開發人員工具 選最上面 console 輸入已下 

![](https://i.imgur.com/QtOrIZ9.png)

> 就會跑出以下結果，這樣我們就獲得圖片的網址

![](https://i.imgur.com/KBpZg3y.png)

圖片網址獲得後，那麼頁數是不是也能透過類似的方法來取得呢?
答案是可以的，因為這些都是前端 JavaScript 基本的語法應用

> 頁數取得方法，一樣的作法。如下!

![](https://i.imgur.com/gf771rF.png)

![](https://i.imgur.com/awGZ4ib.png)


當我們就能夠取得 圖片網址、頁數 時，就能夠能開始寫我們的爬蟲了。
一樣的想法，使用 puppeteer 去瀏覽所需的網頁，在把圖片下載
這樣就能夠爬取所需的資料。