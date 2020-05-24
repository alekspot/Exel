class Dom { // Оборачивает нативные node-элементы интерфейсом в стиле JQuery
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, fn) {
        this.$el.addEventListener(eventType, fn)
    }

    off(eventType, fn) {
        this.$el.removeEventListener(eventType, fn)
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    get data() {
        return this.$el.dataset
    }

    findAll(selector) {
        return Array.from(this.$el.querySelectorAll(selector)).map($)
    }

    css(styles) {
        for (const key in styles) {
            if ({}.hasOwnProperty.call(styles, key)) {
                this.$el.style[key] = styles[key]
                console.log(key);
            }
        }
    }
}

export function $($el) {
    return new Dom($el)
}
// Создает $ объект с классом
$.create = (tagname, classes = '') => {
    const el = document.createElement(tagname)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}
