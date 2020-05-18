import { $ } from '@core/dom' // импорт JQuery подобного интерфейса

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

            // window[`c${component.name}`] = component
            // Заполнение div содержимым
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        console.log(this.components)
        return $root
    }

    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(component => {
            component.init()
        });
    }
}
