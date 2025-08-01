import './assets/main.css'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@vant/touch-emulator'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from '../router'
import App from './App.vue'
import * as Pinia from 'pinia'
import wfc from './wfc/client/wfc'
import { useStore } from './stores/store'

const app = createApp(App)

wfc.init()

app.use(Pinia.createPinia())

const store = useStore()
store.init()

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus, {
  locale: zhCn // 设置为中文
})
app.mount('#app')
