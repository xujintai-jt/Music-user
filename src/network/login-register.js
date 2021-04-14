import request from './request.js'


export function postLogin(data) {
  return request({
    method:"post",
    url: `/api/user/login`,
    data
  })
}

export function postRegister(data) {
  return request({
    method:"post",
    url: `/api/user/register`,
    data
  })
}