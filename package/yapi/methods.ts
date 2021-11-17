
import chalk from 'chalk'
import got from 'got'
import ora from 'ora'
import type { 
  YapiInterfaceResponse, 
  InterfaceListResponse, 
  InterRequestDescribeTypes 
} from './yapi'

const loading = ora()

/**
 * 获取当前接口列表
 * @returns 接口列表
 */
export const getCurrentInterfaceList = async () => {
  try {
    loading.text = '正在获取接口列表，请耐心等待一下...'
    loading.start()
    const result = await got.get('http://yapi.smart-xwork.cn/api/interface/list', { 
      searchParams: {
        token: 'dbef9dfe4f8a8cfc6c17871803a1633f5506d760278f948083dd84b0e6ebaad8',
        limit: 999999,
        page: 1,
      },
    }).json<YapiInterfaceResponse<InterfaceListResponse>>()

    loading.succeed(chalk.green('接口列表获取成功'))
    if (result.errcode > 0) {
      throw new Error(result.errmsg)
    }
    const interfaceIds = result.data.list.map((el) => el._id)
    return interfaceIds
  } catch (error) {
    loading.fail(chalk.red('接口列表获取失败，请查看moyu-error.log错误日志'))
    throw error
  } finally {
    loading.stop()
  }
}


/**
 * 通过接口id获取接口详情
 */
export const getInterfaceDetailById = async (id: number) => {
  try {
    const interfaceDetail = await got.get('http://yapi.smart-xwork.cn/api/interface/get', {
    searchParams: {
      token: 'dbef9dfe4f8a8cfc6c17871803a1633f5506d760278f948083dd84b0e6ebaad8',
      id: id
    }
  }).json<YapiInterfaceResponse<InterRequestDescribeTypes>>()
  return interfaceDetail.data
  } catch (error) {
    throw error
  }
}