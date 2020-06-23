export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.selected = null
    }

    select($el) {
        this.clear()
        this.group.push($el)
        $el.focus().addClass(TableSelection.className)
        this.selected = $el
    }

    selectGroup($group = []) {
        this.group = $group
        this.group.forEach($cell => $cell.css({ background: '#0866f14d' }))
    }

    clear() {
        this.group.forEach($c => $c.removeClass('selected'))
        this.group.forEach($cell => $cell.css({ background: null }))
        this.group = []
        this.selected = null
    }

    get selectedIds() {
        return this.group.map($el => $el.id())
    }

    applyStyle(style) {
        this.group.forEach($el => $el.css(style))
    }
}


