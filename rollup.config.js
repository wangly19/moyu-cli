import json from '@rollup/plugin-json'
import { cleandir } from 'rollup-plugin-cleandir'
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs'
import alias from '@rollup/plugin-alias'

export default {
  input: [
    './package/entry/index.ts',
    './package/entry/cli.ts'
  ],
  output: {
    dir: './dist',
    format: 'cjs'
  },
  plugins: [
    /** 清除dist文件 */
    cleandir('./dist'),

    /** JSON 解析 */
    json(),

    /** env shell  */
    preserveShebangs(),

    /** 别名 */
    alias({
      entries: [
        { find: '@/', replacement: './package/' },
        { find: '~/', replacement: './' }
      ]
    }),


  ]
}