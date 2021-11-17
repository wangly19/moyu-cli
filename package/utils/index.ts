
import chalk from 'chalk'

/**
 * 失败的提示文本信息
 * @param log 提示文本
 */
export const errLog = (log: string ) => {
  console.log(chalk.bgRed.black('ERROR：'), chalk.red(log))
}


/**
 * 成功的提示文本信息
 * @param log 提示文本
 */
export const successLog = (log: string) => {
  console.log(chalk.bgGreen.black('SUCCESS：'), chalk.green(log))
}


/**
 * 
 * @param method 请求方式
 * @param path 
 * @returns 
 */
export const transFormFunctionName = (method: string, path: string) => {
  const names: string[] = path.split('/').map(s => s.charAt(0).toUpperCase() + s.slice(1).replace(/\{\|\}/g,''))
  return `${method.toLowerCase()}${names.join('')}`
}


export const createErrorLog = () => {
  
}