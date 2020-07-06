// 错误处理当前全在这里
import {  notify } from './utils'

// Vue处理
function handleVueError(Vue) {
    // 判断Vue是否存在
    if (Vue && Vue.config) {
        // 获取旧处理
        let oldOnError = Vue.config.errorHandler
        Vue.config.errorHandler = function (error, vm, info) {
            // 打印出来
            console.error(error)
            notify(error);
            // 抛回去
            if (typeof oldOnError === 'function') {
                oldOnError.call(this, error, vm, info)
            }
        }
    }
}

// window-error处理二选一
function windowOnError() {
    window.onerror = function (message, source, line, column, error ) {
         if(error){
            notify(error);
        }
    }
}
// window-error处理二选一
function windowOnHandleError() {
    /*
    window.addEventListener('error', event => {
        let info: ErrorInfo = createErrorInfo(TYPE.error, JSON.stringify({
            message: event.error.message,
            stack: event.error.stack,
        }), event.lineno, event.colno, "", "")
        notify(event.error, info);
        // 错误数据
        console.log('window.addEventListener(error)')
    })
    */
}

// window-reject处理
function windowOnUnhandledRejection() {
    window.addEventListener('unhandledrejection', event => {
        // 网络错误型不上报
        if (event.reason.message.indexOf('Request failed') !== -1) {
            return
        }
        notify(event.reason)
        // 默认实现,不再打印
        if (process.env.NODE_ENV === 'production') { event.preventDefault(); }
    })

}

// 网络请求
function networkHandle() {

    // 网络请求
    let originSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.send = function () {
        console.log('send', arguments);
        this.addEventListener('loadend', () => {
            // 判断结果
            console.log('loadend')
            // 判断
            if (this.status !== 200) {
                console.log('networkHandle')
            }
        })
        originSend.apply(this, arguments);
    };

}

export {
    handleVueError,
    windowOnError,
    windowOnHandleError,
    windowOnUnhandledRejection,
    networkHandle
}