import type { App, Directive } from 'vue'
import { vFoucs } from './v-focus'

const directivesList = {
  focus: vFoucs
}

export default {
  install(app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, (directivesList as { [key: string]: Directive })[key])
    })
  }
}
