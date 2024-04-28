import { defineConfig } from 'unocss'
import { presetWind, presetAttributify } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerCompileClass from '@unocss/transformer-compile-class'

export default defineConfig({
  shortcuts: {},
  theme: {
    colors: {
      primary: '#fc0'
    }
  },
  rules: [],
  variants: [],
  transformers: [transformerDirectives(), transformerVariantGroup(), transformerCompileClass()],
  presets: [
    presetWind(),
    presetAttributify({
      /** 前缀 */
      prefix: 'un-',
      /** 是否强制使用 */
      prefixedOnly: false
    })
  ]
})
