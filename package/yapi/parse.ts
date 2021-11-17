import { transFormFunctionName } from '@/utils'
import { jsonSchemaToDts } from '@/utils/jsonSchema'
import type { InterfaceDetailResponse, ParseRequestModule } from './yapi'

export const parseRequestBody = () => {
  
}

export const parseRequestParamsPath = (path: string, kyes: string[]) => {
  const cpPath: string = path
  kyes.forEach((param: string) => cpPath.replace(`${param}`, '$' + `{${param}}`))
  return cpPath
}

export const parseRequestModule = async (detail: InterfaceDetailResponse) => {
  let requestModule: ParseRequestModule = {
    name: '',
    path: '',
    method: 'POST',
    params: [],
    query: [],
    data: []
  }
  if (detail.method && detail.path) {
    console.log(detail.method, detail.path, transFormFunctionName(detail.method, detail.path))
    requestModule.name = transFormFunctionName(detail.method, detail.path)
  }
  
  if (detail.req_params && detail.path) {
    const paramNames: string[] = detail.req_params.map((v) => v.name)
    requestModule.path = parseRequestParamsPath(detail.path, paramNames)
    requestModule.params = paramNames
  }

  if (detail.req_query) {
    const queryNames = detail.req_query.map((v) => v.name)
    requestModule.query = queryNames
  }
  if (detail.req_body_other) {
    await jsonSchemaToDts(JSON.parse(detail.req_body_other), requestModule.name)
  }
  
} 
