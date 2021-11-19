// import { compile,  } from 'json-schema-to-typescript'

// json schema生成声明文件
export async function jsonSchemaToDts(json: any, title: string) {
  try {
    // transformJSONSchema(json)
    // await compile(json, title, {
    //   bannerComment: "/* tslint:disable */"
    // })
    
  } catch (error) {
    throw error
  }
  
}


// const transformJSONSchema = (body: InterRequestBodyOther) => {
//   Object.keys(body).forEach((key) => {
//     const item = body[key]
//     const keyName = key[0].toLocaleUpperCase() + key.substring(1, key.length)
//     console.log(keyName)
//     if (item?.properties && item.type === 'object') {
//       item.title = keyName
//     }

//     if (item.properties) {
//       transformJSONSchema(item.properties)
//     }

//     if (item.items && item.items.type === 'object') {
//       item.items.title = keyName
//       transformJSONSchema(item.items)
//     }
//   })
// }