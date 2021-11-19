import { rootPath, configName } from '@/utils/constant'
import { existsSync} from 'fs'
import { resolve } from 'path'

export interface YapiConfigTypes {
  token: string
  output: string
  requestImportResolve: string
  url: string
}

export interface MoyuConfigTypes {
  yapi: YapiConfigTypes
}

abstract class MoyuConfigInstance {
  constructor () {}
  
  abstract getLocalConfig(): void

  abstract getYpiConfig(): YapiConfigTypes

  abstract getConfigPath(): string
}

class MoyuConfig extends MoyuConfigInstance  {
  private config!: MoyuConfigTypes

  constructor () {
    super()
  }

  /**
   * 初始化
   */
  init () {
    this.getLocalConfig() 
  }

  /**
   * 获取当前配置文件的路径
   * @returns 当前配置文件的path路径
   */
  getConfigPath() {
    return resolve(rootPath, `./${configName}`)
  }

  /**
   *  获取本地项目中的local配置文件
   */
  getLocalConfig() {
    const configPath: string = this.getConfigPath()
    if (!existsSync(configPath)) {
      throw new Error(`Error: cli配置不存在，请在当前执行目录下创建moyu.config.js。`)
    }

    /** require会缓存配置文件的修改，因此在require之前需要对其删除 */
    delete require.cache[configPath]
    const config: MoyuConfigTypes = require(configPath)

    this.config = config
  }

  /**
   * 获取本地YAPI配置
   * @returns YAPI配置
   */
  getYpiConfig() {
    const yapiConfig: YapiConfigTypes = this.config?.yapi

    /** 如果yapi配置不存在，或者内部不存在Prototype下 */
    if (!yapiConfig || Object.keys(yapiConfig).length === 0) {
      throw new Error(`Error: cli配置中不存在相关yapi配置，请配置后重新运行。`)
    }

     /** yapi配置token不存在，无法拉取项目资料 */
    if (!yapiConfig.url) {
      throw new Error(`Error: yapi配置中缺乏yapi地址，请将地址填写在yapi下的url当中。`)
    }

    /** yapi配置token不存在，无法拉取项目资料 */
    if (!yapiConfig.token) {
      throw new Error(`Error: yapi配置中，没有包含token信息授权，无法拉取对应的项目资料。`)
    }

    /** yapi配置token不存在，无法拉取项目资料 */
    if (!yapiConfig.output) {
      this.config.yapi.output = './src/api'
    }

    /** yapi配置token不存在，无法拉取项目资料 */
    if (!yapiConfig.requestImportResolve) {
      throw new Error(`Error: yapi配置中，没有包含requestImportResolve路径，请求将出现错误。`)
    }

    return this.config.yapi

  }
}

const moyuConfig = new MoyuConfig()

moyuConfig.init()

export default moyuConfig