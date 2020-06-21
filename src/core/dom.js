class Dom {
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

    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
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

    id(parsed) {
        if (parsed) {
            const splited = this.id().split(':')
            const [row, col] = splited.map(item => Number(item))
            return {row, col}
        }
        return this.data.id
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        return Array.from(this.$el.querySelectorAll(selector)).map($)
    }

    css(styles = {}) {
        for (const key in styles) {
            if ({}.hasOwnProperty.call(styles, key)) {
                this.$el.style[key] = styles[key]
            }
        }
    }

    getStyles(styles=[]) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s]
            return res
        }, {})
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    focus() {
        this.$el.focus()
        return this
    }
    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
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
