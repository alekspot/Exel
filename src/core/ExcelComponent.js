import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubscribers = []

        this.prepare()
    }
    // Настраиваем компонент до init()
    prepare() {}

    toHTML() {
        return ''
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    // Инициализируем компонент
    // Добавляем DOM слушателей
    init() {
        this.initDomListeners()
    }

    // Удаляем компонент
    // Чистим слушатели
    destroy() {
        this.removeDomListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }

    // Сюда приходят только изменения по тем полям, на которые мы подписались
    storeChanged(changes) {
        console.log('changes', changes)
    }

    isWatching(key) {
        return this.subscribe.includes(key)
    }
}
