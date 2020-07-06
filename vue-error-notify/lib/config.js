const URLS = {
    dev : 'https://127.0.0.1/errorReceive?',
    test : '',
    prod  : 'https://127.0.0.1/errorReceive?',
}

let globalProjectName = ''
let baseUrl = URLS.dev

export {
    URLS,
    globalProjectName,
    baseUrl,
}