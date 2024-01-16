import Theme from 'vitepress/theme'
import Counter from './components/Counter.vue'

export default {
    ...Theme,
    enhanceApp({app}) {
        app.component('Counter', Counter)
    }
}