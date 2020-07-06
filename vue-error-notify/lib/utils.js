// import {globalProjectName,baseUrl,URLS} from './config'
import * as Config from './config'
import * as Tracekit from 'tracekit'
import {get} from 'lodash'


function formatTime(fmt, date) {
    let ret;
    const Opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let key in Opt) {
        ret = new RegExp("(" + key + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (Opt[key]) : (Opt[key].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

// 初始化地址
function globalInit(projectName) {
    Config.globalProjectName = projectName
    // 开发,生产,本地
    if (process.env.VUE_APP_ENV_CONFIG === 'dev') {
        Config.baseUrl = Config.URLS.dev
    } else if (process.env.VUE_APP_ENV_CONFIG === 'prod') {
        Config.baseUrl = Config.URLS.prod
    }
}

// 创建
function createErrorInfo(name, mode, message, stack) {
    // 写
    let errorInfo = {
        appName: Config.globalProjectName,
        name: name,
        mode: mode,
        message: message,
        column: get(stack,'column',0),
        line: get(stack,'line',0),
        url:  get(stack,'url',''),
        userAgent: window.navigator.userAgent,
        time: formatTime('YYYY-mm-dd HH:MM:SS', new Date()),
    }
    return errorInfo;
}
function formatErrorInfo(errorInfo) {
    // 转义 &jenkinPath=${jenkinPath}
    let result = `projectName=${errorInfo.appName}&message=${errorInfo.message}&name=${errorInfo.name}\
&mode=${errorInfo.mode}&line=${errorInfo.line}&column=${errorInfo.column}&url=${errorInfo.url}\
&userAgent=${errorInfo.userAgent}&time=${errorInfo.time}\
`
    return result
}
// 发送
function notify(error) {
    // 判断当前环境,不是开发也不是生产,不上传
    // if (process.env.VUE_APP_ENV_CONFIG !== 'dev' && process.env.VUE_APP_ENV_CONFIG !== 'prod') {
    //     return
    // }
    // 计算堆栈
    let stack = Tracekit.computeStackTrace(error)
    let tmpStack = get(stack, ['stack', '0'])
    let errorInfo = createErrorInfo(stack.name,stack.mode,stack.message,tmpStack)
    // 发送
    let result = formatErrorInfo(errorInfo)
    let image = new Image()
    image.src = Config.baseUrl + result
}

export {
    formatTime,
    globalInit,
    notify,
}