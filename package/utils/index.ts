import chalk from "chalk";

/**
 * 失败的提示文本信息
 * @param log 提示文本
 */
export const errLog = (log: string) => {
  console.log(chalk.bgRed.black("ERROR："), chalk.red(log));
};

/**
 * 成功的提示文本信息
 * @param log 提示文本
 */
export const successLog = (log: string) => {
  console.log(chalk.bgGreen.black("SUCCESS："), chalk.green(log));
};

/**
 * 格式化函数名称
 * @param method 请求方式
 * @param path
 * @returns
 */
export const transFormFunctionName = (method: string, path: string) => {
  const names: string[] = path.split("/").filter((s) => s !== '').map((s) => {
    const name = s.replace(/{|}/g, '')
    return name.charAt(0).toUpperCase() + name.slice(1) || ''
  });
  return `${method.toLowerCase()}${names.join("")}`;
};

export const createErrorLog = () => {};
