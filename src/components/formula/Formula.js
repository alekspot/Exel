import { ExcelComponent } from '@/core/ExcelComponent';
import {$} from '@core/dom'
export class Formula extends ExcelComponent {
    static className = 'excel-formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }

    init() {
        super.init()
        this.$formula = this.$root.find('#formula')
        this.$on('table:select', $cell => this.$formula.text($cell.text()))
        this.$on('table:input', $cell => this.$formula.text($cell.text()))

        // this.$subscribe(state => {
        //     this.$formula.text(state.currentText)
        // })
    }
    toHTML() {
        return `
            <div class="formula-info">fx</div>
            <div id="formula" contenteditable spellcheck="false" class="formula-input"></div>
        `
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }

    onClick(event) {
        // alert(5)
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:done', 'focus')
        }
    }

    storeChanged(changes) {
        this.$formula.text(changes.currentText)
    }
}
