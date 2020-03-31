const superagent = require('superagent');
const fs = require('fs');
const jsdom = require('jsdom');
const path = require('path');

const api = `https://www.csdn.net/`;

// type: new
// category: home
// shown_offset: 0
// first_view: false

superagent.get(api)
    .end(async (err, res) => {
        debugger;
        if (err) {
            console.log(err.message.red);
        } else {
            try {
                await fs.writeFileSync(path.resolve(__dirname, '..', 'data/home.html'), res.text, { encoding: 'utf-8'});
                const { JSDOM } = jsdom;
                const dom = new JSDOM(res.text);

                const list = dom.window.document.querySelector('.nav_com').querySelector('ul').children;
                let navs = [];
                for(let item of list) {
                    const { innerHTML } = item;
                    const [_, key, value] = innerHTML.match(/href="([^"]+)">([^>]+)</);
                    navs.push([key,value].join(' '));
                }
                debugger;
                await fs.writeFileSync(path.resolve(__dirname, '..', 'data/navs.txt'), navs.join('\n'), { encoding: 'utf-8'});
            } catch (error) {
                console.log(error.message.red)
            }
        }
    })