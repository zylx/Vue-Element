import axios from 'axios';
import Qs from 'qs'; //引入 qs 模块，用来系列化 post 类型的数据
import { autoMatch, checkStatus, getToken } from '../utils/util.js'; //处理函数
import { Message } from 'element-ui';

//创建 axios 实例
const instance = axios.create({
  // baseURL: process.env.BASE_URL,
  timeout: 10000, //请求超时时间

  // 'transformRquest' 允许在向服务器发送请求之前，修改数据
  transformRequest: [data => {
    //对 data 任意转换处理
    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [data => {
    // 对 data 进行任意转换处理
    return JSON.parse(data);
  }]
});

//实例添加请求拦截器
instance.interceptors.request.use(config => {

  if (getToken()) {
    // config.headers['token'] = getToken() 
    config.params['token'] = getToken(); //让每次请求携带token
  }

  //在发送请求之前做处理
  config.headers = Object.assign(config.method === 'get' ? {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  } : {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }, config.headers);

  if (config.method === 'post') {
    const contentType = config.headers['Content-Type'];
    //根据 contentType 转换 data 数据
    if (contentType) {
      if (contentType.includes('multipart')) { //类型 'multipart/form-data;'
        config.data = data;
      } else if (contentType.includes('json')) { // 类型 'application/json;'
        // 服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
        config.data = JSON.stringify(config.data);
      } else { // 类型 'application/x-www-form-urlencoded;'
        // 服务器收到的raw body(原始数据) name=nowThen&age=18
        config.data = Qs.stringify(config.data);
      }
    }
  }
  // console.log("interceptors.request.config", config);

  return Promise.resolve(config);
}, error => {
  //对请求错误处理...
  return Promise.reject(error);
});

//实例添加响应拦截器
instance.interceptors.response.use(response => {

  // 对响应数据做处理
  const { error_code, error_msg } = response.data || {};
  if (error_code === 4007) { // token 过期
    const instance = Message.error(error_msg);
    setTimeout(() => {
      instance.close();
      window.location.href = '/login';
    }, 3000)
  }

  return Promise.resolve(checkStatus(response));
}, error => {
  //对响应错误做处理
  if (error.response) {
    return Promise.reject(checkStatus(error.response));
  } else if (
    error.code == "ECONNABORTED" &&
    error.message.indexOf("timeout") != -1
  ) {
    return Promise.reject({
      msg: "请求超时"
    });
  } else {
    return Promise.reject({});
  }
});

//实例封装到 async/await异步函数中
const request = async opt => {
  
  const options = Object.assign({
    method: 'get', //默认 get 方式
    isHandleError: true, //是否统一处理接口失败（提示）
  }, opt);

  try {
    //匹配接口前缀，开发环境通过 proxy 转发配置请求，生产环境则根据实际配置
    options.baseURL = autoMatch(options.prefix);
    // console.log("options", options);

    const res = await instance(options);
    // console.log("request.res", res);

    return res;
  } catch (err) {
    if (options.isHandleError) { //自定义参数，是否允许全局提示错误信息
      Message.error(err.msg || '请求处理失败！');
    }
    return err;
  }
}

export default request;