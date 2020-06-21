import request from './request';
import { apiUrl } from './apiUrl';

let services = {};

Object.entries(apiUrl).forEach((item) => {
  services[item[0]] = function (options = {}) {
    return request(Object.assign({
      url: item[1]
    }, options))
  }
})

export default services;