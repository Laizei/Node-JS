var request = require('request');
const puppeteer = require('puppeteer');
const fs = require('fs');


// download img
var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        request(uri)
            .pipe(fs.createWriteStream('D:\\' + `/${filename}`))
            .on('close', function() {
                //console.log('Download Images')
            })
    })
}

// 等一下
function wait(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}


(async () => {

    const borwser = await puppeteer.launch({
        headless: true,
        slowMo: 150,
    })

    let url =('https://comicbus.live/online/a-13530.html?ch=1')

    const page = await borwser.newPage()
    await page.goto(url)
    // await page.click('#next');

    // Some extra delay to let images load
    await wait(1000)

    // 擷取 comic pagenum 漫畫頁數
    let comicPagenum = await page.evaluate(() => {
        const pagenum = document.getElementById('pagenum')
        return parseInt(pagenum.innerHTML.split('/')[1].slice(0, -1))
        // 字串 轉 數字
    })

    for(var i = 1; i <= comicPagenum; i++){

        // click next page
        // await page.click('#next')

        // go to url
        await page.goto(url + '-' + i)

        // 篩選 圖片url
        let imageLink = await page.evaluate(() => {
            const images = Array.from(document.querySelectorAll('img'))
            return images.map(img => img.src).filter(imgText => imgText.includes("8comic"))
            // .filter(img => img.includes('https:'))
        })

        // 圖片網址
        console.log(imageLink)

        // img donwload funcotion
        imageLink.forEach((img, index) =>
            download(img, i + '.jpg', function() {
                console.log('done')
                // imgname = number
            })
        )


    }



    await borwser.close()

})();


// document.getElementById("pagenum").innerHTML.split('/')[1].slice(0, -1)