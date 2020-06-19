export function capitalize(str) {
    if (typeof str !== 'string') {
        return ''
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function showTime(fn, thisArg = this) {
    const name = fn.name + '()'
    fn = fn.bind(thisArg)
    fn = new Proxy(fn, {
        apply: (target, thisArg, args) => {
            console.time(name);
            const result = target(...args);
            console.timeEnd(name);
            return result
        }
    });
    return fn
}

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}


export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function camelCaseToDash( str ) {
    return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
        .map(key => `${camelCaseToDash(key)}: ${styles[key]}`)
        .join(';')
}
