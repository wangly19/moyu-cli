import got from 'got'
import ora from 'ora'

const loading = ora('')


/**
 * 获取当前接口列表
 * @returns 接口列表
 */
export const getCurrentInterfaceList = async () => {
  return await got.get('/api/interface/list', { 
    searchParams: {
      token: 'dbef9dfe4f8a8cfc6c17871803a1633f5506d760278f948083dd84b0e6ebaad8',
      limit: 999999,
      page: 1,
    },
  })
}
