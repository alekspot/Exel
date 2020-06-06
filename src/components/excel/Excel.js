import { $ } from '@core/dom' // импорт JQuery подобного интерфейса
import { showTime } from '@core/utils'
import { Emitter } from '@core/Emitter'
export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
        this.emitter = new Emitter()
    }

    getRoot() { // Возвращает $ объект c добавленными компонентами
        const $root = $.create('div', 'excel')

        const componentOptions = {
            emitter: this.emitter
        }

        // Для каждого компонента создается element div
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)

            // Заполнение div содержимым
            showTime($el.html, $el)(component.toHTML())
            showTime($root.append, this)($el)
            return component
        })

        return $root
    }

    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(component => {
            component.init()
        });
    }

    destroy() {
        this.components.forEach(component => component.destroy())
    }
}
