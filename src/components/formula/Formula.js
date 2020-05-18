import { ExcelComponent } from '@/core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel-formula'

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        })
    }
    toHTML() {
        return `
            <div class="formula-info">fx</div>
            <div contenteditable spellcheck="false" class="formula-input"></div>
        `
    }

    onInput(event) {
        console.log(this.$root)
    }

    onClick(event) {
        console.log(event)
    }
}
