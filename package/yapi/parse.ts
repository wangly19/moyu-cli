import { transFormFunctionName } from '@/utils'
import type { InterfaceDetailResponse, ParseRequestModule, InterRequestDescribeTypes } from './interface'
import type { JSONSchema4, JSONSchema4TypeName } from 'json-schema'
import chalk from 'chalk'
import config from '@/config'

export const parseRequestBody = () => {
  
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
    if (item.required === 1) {
      schema.required = [...schema.required as string[], item.name]
    }
    if (schema.properties) {
      schema.properties[item.name] = {
        type: 'string | number' as JSONSchema4TypeName,
        description: item.desc,
      }
    }
  })

  return schema
}

export const parseResponseInterface = () => {
  
}

export const parseRequestModule = async (detail: InterfaceDetailResponse, itTs?: boolean) => {
  let requestModule: ParseRequestModule = {
    requestImportResolve: config.getYpiConfig().requestImportResolve || '',
    name: '',
    path: '',
    method: 'POST',
    params: [],
    query: [],
  }

  requestModule.method = detail.method || 'POST'
  
  requestModule.path = detail.path?.replace('{', '${') || ''
  
  /** 文件内容和名称 */
  if (detail.method && detail.path) {
    requestModule.name = transFormFunctionName(detail.method, detail.path)
  }
  
  /** paramsUrl参数转换 */
  if (detail.req_params && detail.path) {
    const paramNames: string[] = detail.req_params.map((v) => v.name)
    requestModule.params = paramNames
  }

  /** react query参数 */
  if (detail.req_query) {
    const queryNames = detail.req_query.map((v) => v.name)
    requestModule.query = queryNames
  }

  if (itTs) {
    requestModule.interface = {
      req: undefined,
      res: undefined
    }
    let properties: InterRequestDescribeTypes[] = []
    if (Array.isArray(detail.req_query)) {
      properties = [...properties, ...detail.req_query]
    }

    if (Array.isArray(detail.req_params)) {
      properties = [...properties, ...detail.req_params]
    }

    requestModule.interface.req = parseRequestInterface(properties, detail.req_body_other)
    if (detail?.res_body) {
      try {
        requestModule.interface.res = JSON.parse(detail.res_body)
      } catch (error) {
        console.log(chalk.red('[Log]:', `${detail.path}类型处理失败，请检查平台接口定义无误后重新拉取`))
      }
      
    }
  }

  return requestModule
  
} 
