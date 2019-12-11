import xy from './xy2';

function str2Json(s) {
  return xy.strNonEmpty(s) ? JSON.parse(s) : s;
}

function json2Str(json) {
  return json ? JSON.stringify(json) : xy.EMPTY.STRING;
}


function ajax(url, data, success, method = 'POST') {
  wx.request({
    url,
    data: data,
    method: method,
    header: {
      'content-type': 'application/json'
    },
    dataType: 'json',
    success,
  });
}

function upload(url, filePath, success, name = 'file', formData = {}) {
  wx.uploadFile({
    url, //仅为示例，非真实的接口地址
    filePath,
    name: 'file',
    formData,
    success
  });
}


xy.extend({
  str2Json,
  ajax,
  json2Str,
  upload
});