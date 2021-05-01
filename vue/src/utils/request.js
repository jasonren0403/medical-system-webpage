/**
 * @file 统一发送请求的地方
 */

import axios from 'axios'

export async function get (url, options) {
  let response = await axios.get(url, options)
  return response.data
}

export async function post(url, data, options){
  let response = await axios.post(url,data,options)
  return response.data
}

export async function put(url,data,options){
  let response = await axios.put(url,data,options)
  return response.data
}

export async function del(url,options){
  let response = await axios.delete(url,options)
  return response.data
}
