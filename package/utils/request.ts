import got, { OptionsOfTextResponseBody } from "got"
import moyuConfig, {  } from "@/config"

const request = (path: string, options?: OptionsOfTextResponseBody) => {
  const url: string = `${moyuConfig.getYpiConfig().url}${path}`
  return got(url, options)
}

export default request