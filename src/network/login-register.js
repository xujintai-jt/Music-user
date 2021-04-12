import request from './request.js'


export function postLogin(data) {
  return request({
    method:"post",
    url: `/userLogin`,
    data
  })
}

export function postRegister(data) {
  return request({
    method:"post",
    url: `/userRegistered`,
    data
  })
}