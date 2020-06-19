import { ExcelComponent } from '@/core/ExcelComponent'

export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args)
    }
    get template() {
        return JSON.stringify(this.state, null, 2)
    }
    initState(initState = {}) {
        this.state = {...initState}
    }

    setState(newState) {
        this.state = {...this.state, ...newState}
        this.$root.html(this.template)
    }
}
