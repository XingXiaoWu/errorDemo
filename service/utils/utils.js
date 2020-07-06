const sourceMap = require('source-map');
import _ from 'lodash'
/**
 * 
 * @param {*} url 发生错误的url,最后切割的是文件名,配上注册时数据库的url即可
 * @param {*} line 行
 * @param {*} column 列
 */
function analyzeError(url, line, column) {
    if (_.isEmpty(url) || line === '0' || column === '0') {
      return;
    }
    // map数据源
    const mapSource = await this.getMapSource(url);
    // 判断是否为空
    if (_.isEmpty(mapSource)) {
        // 直接return
        return mapSource;
    }
    // 2.解析
    const mapResult = await this.mapReduction(mapSource, line, column)
    return mapResult;
}
    
// 获取map数据
function getMapSource(url) {
    // 开发环境的map地址
    const baseMapUrl = this.app.config.userConfig.mapUrl;
    // 1.获取url对应的map地址
    const jsName = _.split(url, '/');
    // 获取map名称
    const tmp = jsName[jsName.length - 1] + '.map';
    const mapUrl = baseMapUrl + tmp;
    // map文件
    const mapSource = await this.ctx.curl(mapUrl, {
      timeout: 3000,
    });
    // 判断是否200
    if (mapSource.status === 200) {
      const result = JSON.parse(mapSource.data);
      return result;
    }
    return {};
    // const result = JSON.parse(mapSource.data);
    // return result;
}
    
      // map还原
function mapReduction(mapSource, line, column) {
    const sourcesPathMap = {};
    const fileContent = JSON.stringify(mapSource);
    const fileObj = mapSource;
    const sources = fileObj.sources;
    // eslint-disable-next-line array-callback-return
    sources.map(item => {
      console.log(item);
      sourcesPathMap[this.fixPath(item)] = item;
    });
    // 解析
    const consumer = await new sourceMap.SourceMapConsumer(fileContent);
    const lookup = {
      line: parseInt(line),
      column: parseInt(column),
    };
    const result = consumer.originalPositionFor(lookup);
    // 错误源码输出
    // const originSource = sourcesPathMap[result.source];
    // const sourcesContent = fileObj.sourcesContent[sources.indexOf(originSource)];
    // result.sourcesContent = sourcesContent;
    consumer.destroy();
    return result;
}
function fixPath(filepath) {
    return filepath.replace(/\.[\.\/]+/g, '');
}