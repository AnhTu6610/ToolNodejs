const puppeteer = require('puppeteer');
const fs = require('fs');

let listlink = [];

const getData1 = async (url) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const results = await page.evaluate(() => {
        let items = document.querySelectorAll('.listItem')
        console.log(items);

        let links = []
        items.forEach((item) => {
            links.push({
                index: item.querySelector('strong').textContent,
                name: item.querySelector('.listItem__title').textContent,
                image: item.querySelector('img').getAttribute('src'),
                // url: item.getAttribute('href'),
                // url: item.querySelector('#videojs_html5_api').textContent,
                // video : item.querySelector('iframe').getAttribute('src'),
                // video: item.getAttribute('src'),
            })
        })
        return links;
    });
    listlink = listlink.concat(results);
    // console.log(results)
    await browser.close()
}
let index = 0;
function getAll() {
    index++;
    console.log('==>>' + index);
    if (index <= 33) {
        getData1('https://www.ranker.com/list/complete-list-of-all-pokemon-characters/video-game-info?page=' + index.toString()).then((f) => {
            getAll();
        });
    } else{
        console.log(listlink);
        downloadImg();

    }
}

getAll();

function downloadImg() {
    // var jsonObj = JSON.parse(listlink);
    // console.log(jsonObj);
    console.log(listlink);
    
    // stringify JSON Object
    var jsonContent = JSON.stringify(listlink);
    console.log(jsonContent);

    fs.writeFile("./pokemon/output.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
};