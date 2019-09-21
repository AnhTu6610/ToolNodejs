const request = require('request');
const { http, https } = require('follow-redirects');
const crypto = require('crypto');
const puppeteer = require('puppeteer');
// const http = require('http');
// const https = require('https');
const fs = require('fs');
const path = require('path');
const parseUrl = require('url').parse;

function getfilename(url) {
    const parsed = parseUrl(url);
    const filename = path.basename(parsed.path);
    return filename;
}
const downloadFile = (url, dest, callback) => {
    console.log(dest);
    const file = fs.createWriteStream('images/' + dest);
    const req = littps.get(url, (res) => {
        if (res.statusCode !== 200) {
            return callback('File is not found');
        }
        const len = parseInt(res.headers['content—length'], 10);
        let dowloaded = 0;
        res.pipe(file);
        res.on('data', (chunk) => {
            dowloaded += chunk.length;
            console.log("Downloading" + (100.0 * download / len).toFixed(2) + "%" + dowloaded + "bytes" + "\r");
        }).on('end', () => {
            file.end();
            callback(null);
        }).on('error', (err) => {
            callback(err.message);
        })
    }).on('error', (err) => {
        fs.unlink(dest);
        callback(err.message);
    });
}

const getData1 = async (url) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const results = await page.evaluate(() => {
        let items = document.querySelectorAll('#videojs_html5_api')
        console.log(items);

        let links = []
        items.forEach((item) => {
            links.push({
                title: item.innerHTML,
                // url: item.getAttribute('href'),
                // url: item.querySelector('#videojs_html5_api').textContent,
                // video : item.querySelector('iframe').getAttribute('src'),
                // video: item.getAttribute('src'),
            })
        })
        return links;
    });

    console.log(results)
    // Do what you want with the `results`

    await browser.close()
}


// getData1('https://rapidvid.to/e/G6R6XBXM42/');
// getData1('https://anime-update.com/watch-online/detective-conan-episode-954/');
var r = request.get('https://anime-update.com/watch-online/detective-conan-episode-954/', function (err, res, body) {
  console.log(r.uri.href);
  console.log(res.request.uri.href);

  // Mikael doesn't mention getting the uri using 'this' so maybe it's best to avoid it
  // please add a comment if you know why this might be bad
  console.log(this.uri.href);
});

// https.get('https://anime-update.com/watch-online/detective-conan-episode-954/', response => {
//   response.on('data', chunk => {
//     console.log(chunk);
//   });
// }).on('error', err => {
//   console.error('error =>'+ err);
// });

