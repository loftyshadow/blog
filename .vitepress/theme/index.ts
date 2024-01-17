import Counter from './components/Counter.vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
    ...DefaultTheme,
    enhanceApp({app}) {
        app.component('Counter', Counter)
    }
}