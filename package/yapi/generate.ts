import { ParseRequestModule } from './interface'
import { join } from 'path'
import { outputFile } from 'fs-extra'
import template from 'art-template'
import config from '@/config'
import chalk from 'chalk'
import { compile } from 'json-schema-to-typescript'
import { transFormFunctionName } from '@/utils'

/** @name 获取函数templates */
const FunViews = join(__dirname, '../package/tpl/fetch.fun.art')
const InterfaceViews = join(__dirname, '../package/tpl/fetch.interface.art')

const createRequestModuleFile = async(
  module: ParseRequestModule
) => {
  const insertFsPath: string = join(config.getYpiConfig().output, module.name)
  try {
    const beforeInsertFsContent: string = template(FunViews, module)
    await outputFile(join(insertFsPath, 'index.js'), beforeInsertFsContent)
    console.log(chalk.green('[LOG]', `接口${insertFsPath}创建成功`))
  } catch (error) {
    console.log(chalk.red('[LOG]', `接口${insertFsPath}创建失败`))
  }
}

/**
 * 创建interface类型声明
 * @param name 名称
 * @param interfaceModule 
 */
const createRequestInterfaceModuleFile = async (name: string, interfaceModule?: ParseRequestModule['interface']) => {
  if (interfaceModule) {
    const interfaceFsContent = {
      name,
      requestName: transFormFunctionName('', `${name}RequestTypes`),
      responseName: transFormFunctionName('', `${name}ResponseTypes`),
      request: '',
      response: ''
    }

    /** 声明接口请求请求参数类型 */
    if (interfaceModule.req) {
      try {
        interfaceFsContent.request = await compile(interfaceModule.req, interfaceFsContent.requestName, {
          bannerComment: `
            /** eslint-disabled */
            /** @ts-nocheck */
          `,
        })
      } catch (error) {
        console.log(chalk.red('[Log]:', `${name}RequestTypes生成失败`))
      }
    }

    /** 声明接口请求返回值类型 */
    if (interfaceModule.res) {
      try {
        interfaceFsContent.response = await compile(interfaceModule.res, interfaceFsContent.responseName, {
          bannerComment: `
            /** eslint-disabled */
            /** @ts-nocheck */
          `,
        })
        console.log(chalk.green('[Log]:', `类型${name}ResponseTypes生成成功`))
      } catch (error) {
        console.log(chalk.red('[Log]:', `类型${name}ResponseTypes生成失败`))
      }
    }

    const beforeInsertFsContent: string = template(InterfaceViews, interfaceFsContent)
    const insertFsPath: string = join(config.getYpiConfig().output, name)

    try {
      await outputFile(join(insertFsPath, 'index.d.ts'), beforeInsertFsContent.replace(new RegExp("&#34;", "gm"), '"'))
    } catch (error) {
      console.log(chalk.red('[Log]:', `${name}RequestTypes生成失败`))
    }
  }
}

/**
 * 
 * @param module 模块配置
 * @param isTs 是否需要类型声明
 */
const generateModuleLocalFile = async (module: ParseRequestModule, isTs?: boolean) => {
  /** 创建默认的请求模块文件 */
  await createRequestModuleFile(module)
  if (isTs) {
    try {
      await createRequestInterfaceModuleFile(module.name, module.interface)
    } catch (error) {
      throw error
    }
  }
}

export default generateModuleLocalFile
