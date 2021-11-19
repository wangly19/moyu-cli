/** 公共返回数据 */
export interface YapiInterfaceResponse<T = null> {
  errcode: number;
  errmsg: string;
  data: T;
}

export interface InterfaceListResponse {
  count: number;
  total: number;
  list: any[];
}

interface InterRequestDescribeTypes {
  name: string;
  type: string;
  example: string;
  desc: string;
  required: 1 | 0;
}
export interface InterfaceDetailResponse {
  _id: number;
  project_id?: number;
  catid?: number;
  title?: string;
  path?: string;
  method?: RequestMethod;
  status?: string;
  req_body_type?: "json" | "row";
  req_body_form?: Array<InterRequestDescribeTypes>;
  req_body_other?: string;
  req_query?: Array<InterRequestDescribeTypes>;
  res_body?: Array<InterRequestDescribeTypes>;
  req_params?: Array<InterRequestDescribeTypes>;
  add_time: string;
  up_time: string;
  edit_uid: string;
}

export type RequestMethod =
  | "POST"
  | "GET"
  | "DELETE"
  | "PUT"
  | "OPTIONS"
  | "PATCH"
  | "post"
  | "get"
  | "delete"
  | "put"
  | "options"
  | "patch";

export interface InterRequestBodyOtherChildren {
  type: string,
  format?: string,
  enum: string[]
  description?: string
}

export interface InterRequestBodyOther {
  type: string;
  $$ref: string;
  properties: Record<string, InterRequestBodyOtherChildren>;
  required: string[]
}

export interface ParseRequestModule {
  /** @name 函数或者是方法的名称 */
  name: string;

  /** @name 请求地址 */
  path: string;

  /** 请求方式 */
  method: RequestMethod;

  /** @name Query查询参数 */
  query: string[];

  /** @name Body参数 */
  data?: string[];

  params: string[],

  /** 接口列表 */
  interface?: Record<string, any>

}
