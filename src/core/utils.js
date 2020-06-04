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

