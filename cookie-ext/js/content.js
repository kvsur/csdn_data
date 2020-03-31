window.addEventListener('load', e => {
  chrome.runtime.sendMessage({url: document.URL}, async res => {
    console.log(res)
  })
})