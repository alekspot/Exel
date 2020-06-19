export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer({ ...initialState }, { type: '__INIT__' })
    let listeners = []
    return {
        subscribe(fn) {
            listeners.push(fn)
            return {
                unsubscribe() {
                    listeners = listeners.filter(listener => listener !== fn)
                }
            }
        },

        dispatch(action) {
            state = rootReducer(state, action)
            listeners.forEach(listener => listener(state))
            console.log({[action.type]: state})
        },

        getState() {
            return JSON.parse(JSON.stringify(state))
        }
    }
}

// Reducer - чистая функция котоая проверяет на совпадение action type и если он есть меняет state


function createS(rootReducer, initialState) {
    const state = rootReducer(initialState, {type: '__INIT__'})
    const listeners = []

    return {
        dispatch(action) {
            const state = rootReducer(state, action)
            listeners.forEach(l => l(state))
        },

        subscribe(fn) {
            this.listeners.push(fn)
            return {
                unsubscribe: listeners.filter(l => l !== fn)
            }
        },

        getState() {
            return state
        }
    }
}


const createSto = (rootReducer, initialState) => {
    const state = rootReducer(initialState, {type: '__INIT__'})
    const listenres = []
    return {
        dispatch(action) {
            const state = rootReducer(state, action)
            listenres.forEach(l => l(state))
            console.log({AppState: state})
        },
        subscribe(fn) {
            listenres.push(fn)
            return {uns: listenres.filter(l => l !== fn)}
        },
        getState() {}
    }
}

