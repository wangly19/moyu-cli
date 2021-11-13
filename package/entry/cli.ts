#!/usr/bin/env node
import got from 'got'

got.post('http://yapi.smart-xwork.cn/api/user/login', {
  json: {
    hello: 'world'
  },
  responseType: 'json'
})