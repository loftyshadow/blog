// @ts-ignore
import Counter from './components/Counter.vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
    ...DefaultTheme,
    enhanceApp({app}) {
        // 全局注册组件
        app.component('Counter', Counter)
    }
}
