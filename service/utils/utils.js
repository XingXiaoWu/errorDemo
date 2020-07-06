const sourceMap = require('source-map');
const _ = require('lodash');
const fs = require('fs');
const { json } = require('express');

/**
 * 
 * @param {*} url 发生错误的url,最后切割的是文件名,配上注册时数据库的url即可
 * @param {*} line 行
 * @param {*} column 列
 */
async function analyzeError(url, line, column) {
    if (_.isEmpty(url) || line === '0' || column === '0') {
      return;
    }
    // map数据源
    const mapSource = await getMapSource(url);
    // 判断是否为空
    if (_.isEmpty(mapSource)) {
        // 直接return
        return mapSource;
    }
    // 2.解析
    const mapResult = await mapReduction(mapSource, line, column)
    return mapResult;
}
    
// 获取map数据
async function getMapSource(url) {
    // 1.获取url对应的map地址
    const jsName = _.split(url, '/');
    // 获取map名称
    const tmp = jsName[jsName.length - 1] + '.map';
    const mapUrl = './maps/' + tmp;
    // map文件
    // const mapSource = await this.ctx.curl(mapUrl, {
    //   timeout: 3000,
    // });
    const mapSource = JSON.parse(fs.readFileSync(mapUrl).toString())
    return mapSource;
}
    
      // map还原
async function mapReduction(mapSource, line, column) {
    const sourcesPathMap = {};
    const fileContent = JSON.stringify(mapSource);
    const fileObj = mapSource;
    const sources = fileObj.sources;
    // eslint-disable-next-line array-callback-return
    sources.map(item => {
      console.log(item);
      sourcesPathMap[fixPath(item)] = item;
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

module.exports = {
  analyzeError
}