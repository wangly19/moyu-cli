import { getCurrentInterfaceList, getInterfaceDetailById } from "./methods"
import ora from "ora"
import chalk from "chalk"
// import logger from '@/utils/logger'
import { parseRequestModule } from "./parse"
import generateModuleLocalFile from "./generate"

const loading = ora()

const main = async (itTs?: boolean) => {

  const result = await getCurrentInterfaceList()
  const promises = result.map((id) => getInterfaceDetailById(id))
  try {
    loading.text = '正在获取接口列表详情'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    loading.start()
    const details = await Promise.allSettled(promises)
    const successCount: number = details.filter((res) => res.status === 'fulfilled').length
    loading.succeed(
      chalk.green(`获取接口列表详情, 成功${successCount}/${details.length}`)
    )
    details.forEach(async (v: any) => {
      if (v.value) {
        try {
          const module = await parseRequestModule(v.value, itTs)
          await generateModuleLocalFile(module, itTs)
        } catch (error) {
          throw error
        }
      }
    })
    
  } catch (error) {
    loading.succeed(
      chalk.green(`获取接口列表详情失败，请查看moyu-error.log`)
    )
    throw error
  } finally {
    loading.stop()
  }
}

export default main