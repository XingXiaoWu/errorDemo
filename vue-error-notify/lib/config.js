const URLS = {
    dev : 'http://127.0.0.1:1234/errorReceive?',
    test : '',
    prod  : 'http://127.0.0.1:1234/errorReceive?',
}

let globalProjectName = ''
let baseUrl = URLS.dev

export {
    URLS,
    globalProjectName,
    baseUrl,
}