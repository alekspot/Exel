import { $ } from '@core/dom' // импорт JQuery подобного интерфейса
import { Emitter } from '@core/Emitter'
import { StoreSubscriber } from '@core/StoreSubscriber'
import * as actions from '@/redux/actions'
import { preventDefault } from '@/core/utils'
export class Excel {
    constructor(options) {
        this.components = options.components || []
        this.store = options.store
        this.emitter = new Emitter()
        this.subscriber = new StoreSubscriber(this.store)
    }

    getRoot() { // Возвращает $ объект c добавленными компонентами
        const $root = $.create('div', 'excel')

        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }

        // Для каждого компонента создается element div
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)

            // Заполнение div содержимым
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })

        return $root
    }

    init() {
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault)
        }
        this.store.dispatch(actions.updateDate())
        this.subscriber.subscribeComponents(this.components)

        this.components.forEach(component => component.init());
    }

    destroy() {
        this.subscriber.unSubscribeFromStore()
        this.components.forEach(component => component.destroy())
    }
}
