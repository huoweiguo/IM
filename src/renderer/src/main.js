import './assets/main.css'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@vant/touch-emulator'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from '../router'
import App from './App.vue'
import { isElectron } from './platform'
import wfc from './wfc/client/wfc'
import CustomMessageConfig from './wfc_custom_message/customMessageConfig'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// init
{
  // pc
  if (isElectron()) {
    let href = window.location.href
    let path = href.substring(href.indexOf('#') + 1)
    console.log('init', href, path)
    if (path === '/' /*login*/ || path.startsWith('/home') || href.indexOf('#') === -1) {
      wfc.init()
      CustomMessageConfig.registerCustomMessages()
    } else {
      wfc.attach()
    }
    // web
  } else {
    wfc.init()
    CustomMessageConfig.registerCustomMessages()
  }
}
// init end

app.use(router)
app.use(ElementPlus, {
  locale: zhCn // 设置为中文
})
app.mount('#app')
