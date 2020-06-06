export class Emitter {
    constructor() {
        this.listeners = {}
    }

    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => this.listeners[event].filter(listener => listener !== fn)
    }

    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => listener(...args))
        return true
    }
}

// const emitter = new Emitter()

// const unsub = emitter.subscribe('test', msg => console.log(msg))

// emitter.emit('test', 'My msg very long')
