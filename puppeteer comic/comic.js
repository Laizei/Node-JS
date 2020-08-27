var request = require('request');
const puppeteer = require('puppeteer');
const fs = require('fs');


// download function
var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        request(uri)
            .pipe(fs.createWriteStream('D:\\' + `/${filename}`))
            .on('close', function() {
                //console.log('Download Images')
            })
    })
}

// time delay
function wait(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}


(async () => {

    const borwser = await puppeteer.launch({
        headless: true,
        slowMo: 150,
    })

    // comicUrl
    let comicUrl =('https://comicbus.live/online/a-10406.html?ch=1')

    const page = await borwser.newPage()
    await page.goto(comicUrl)
    // await page.click('#next');

    // time 1s
    await wait(1000)

    // 爬取 comic pagenum 漫畫頁數
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

        // 爬出 img url
        let imageLinkurl = await page.evaluate(() => {
            const images = Array.from(document.querySelectorAll('img'))
            return images.map(img => img.src).filter(imgText => imgText.includes("8comic"))
        })

        // imgLink
        console.log(imgLink)

        // img funcotion
        imgLink.forEach((img, index) =>
            download(img, i + '.jpg', function() {
                console.log('download done')
                // imgname = number
            })
        )

    }

    await borwser.close() // borwser close

})();

