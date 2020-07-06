import {globalInit} from './utils'

import {handleVueError,windowOnHandleError,windowOnError,windowOnUnhandledRejection,networkHandle} from './errorhandle'

function init(appName, Vue, network = false) {
    globalInit(appName)
    if (Vue && Vue.config) {
        // 做排查
        handleVueError(Vue)
    }
     // 判断全局window是否存在
     if (window && window.addEventListener) {
        // 添加window捕获错误
        windowOnError()
        windowOnHandleError()
        windowOnUnhandledRejection()
    }
      // 判断网络请求是否需要捕获
      if (network) {
        // 捕获网络请求
        networkHandle()
    }
}


export { init }