import { transFormFunctionName } from '@/utils'
import type { InterfaceDetailResponse, ParseRequestModule, InterRequestDescribeTypes } from './yapi'
import {  } from 'json-schema-to-typescript'
import type { JSONSchema4, JSONSchema4TypeName } from 'json-schema'

export const parseRequestBody = () => {
  
}

export const parseRequestParamsPath = (path: string, kyes: string[]) => {
  const cpPath: string = path
  kyes.forEach((param: string) => cpPath.replace(`${param}`, '$' + `{${param}}`))
  return cpPath
}

export const parseRequestInterface = (properties: InterRequestDescribeTypes[], data?: string): Record<string, any> => {
  let schema: JSONSchema4 = {
    properties: {},
    required: []
  }
  if (data) {
    const requestBody = JSON.parse(data)
    if (Array.isArray(requestBody.required)) {
      schema.required = [...requestBody?.required]
    }
    
    if (requestBody?.properties) {
      schema.properties = {
        ...requestBody?.properties,
      }
    }
  }
  properties.forEach((item) => {
    if (schema.properties) {
      console.log(item.type)
      schema.properties[item.name] = {
        type: (item?.type || 'string | number') as JSONSchema4TypeName,
        required: item.required === 1,
        description: item.desc,
      }
    }
  })

  return schema
}

export const parseResponseInterface = () => {
  
}

export const parseRequestModule = async (detail: InterfaceDetailResponse) => {
  let requestModule: ParseRequestModule = {
    name: '',
    path: '',
    method: 'POST',
    params: [],
    query: [],
  }

  requestModule.method = detail.method || 'POST'
  
  /** 文件内容和名称 */
  if (detail.method && detail.path) {
    requestModule.name = transFormFunctionName(detail.method, detail.path)
  }
  
  /** paramsUrl参数转换 */
  if (detail.req_params && detail.path) {
    const paramNames: string[] = detail.req_params.map((v) => v.name)
    requestModule.path = parseRequestParamsPath(detail.path, paramNames)
    requestModule.params = paramNames
  }

  /** react query参数 */
  if (detail.req_query) {
    const queryNames = detail.req_query.map((v) => v.name)
    requestModule.query = queryNames
  }

  // let interfaceSchema: Record<string, any> = {}

  if (true) {
    let properties: InterRequestDescribeTypes[] = []
    if (Array.isArray(detail.req_query)) {
      properties = [...properties, ...detail.req_query]
    }

    if (Array.isArray(detail.req_params)) {
      properties = [...properties, ...detail.req_params]
    }

    parseRequestInterface(properties, detail.req_body_other)
  }
} 
