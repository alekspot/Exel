import { $ } from '@core/dom' // импорт JQuery подобного интерфейса
import { showTime } from '@core/utils'
export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
    }

    getRoot() { // Возвращает $ объект c добавленными компонентами
        const $root = $.create('div', 'excel')

        // Для каждого компонента создается element div
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el)

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
}
