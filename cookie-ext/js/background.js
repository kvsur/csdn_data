chrome.runtime.onMessage.addListener((req, sender, senderRes) => {
    console.log(req)
    chrome.cookies.getAll({
        url: req.url
    }, cks => {
        const cookie = cks.map(({name, value}) => name + '=' + value).join('_#_');
        console.log(cookie)
        senderRes({cookie})
        chrome.storage.local.set({lichengCookie: cookie}, _ => {
            console.log('-----cookie storaged --------')
        });
        chrome.cookies.set({
            url: 'http://localhost:8080',
            name: 'csdn_cookie',
            value: cookie,
            // domain: 'localhost:8080',
            // secure: true,
            // httpOnly: true,
            // expirationDate: 60 * 60 * 24 * 1
        }, )
    })
})
