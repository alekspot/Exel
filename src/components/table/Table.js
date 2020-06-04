import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize'
import { shouldResize, isCell, matrix, nextSelector } from '@/components/table/table.functions'
import { TableSelection } from '@/components/table/TableSelection'
import { showTime } from '@core/utils'
import {$} from '@core/dom'
export class Table extends ExcelComponent {
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown']
        })
        this.rowsCount = 4;
    }
    static className = 'excel-table';

    toHTML() {
        return showTime(createTable)(this.rowsCount)
    }
    prepare() {
        console.log('prepare')
    }
    init() {
        super.init()
        this.selection = new TableSelection(this.$root)
        const $cell = this.$root.find('[data-id = "0:0"]')
        this.selection.select($cell)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $firstTarget = $(event.target)
            this.selection.select($firstTarget)

            document.onmouseup = (e) => {
                const $lastTarget = $(e.target);

                if ($lastTarget.id() !== $firstTarget.id()) {
                    const $cells = matrix($lastTarget, $firstTarget).map(id => this.$root.find(`[data-id="${id}"]`));
                    this.selection.selectGroup($cells)
                }
                document.onmouseup = null
            }
        }
    }
    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp'
        ]
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            console.log(this.colsCount)
            const id = this.selection.selected.id(true)
            const findedId = nextSelector(key, id, this.rowsCount, this.colsCount)
            console.log({findedId})
            const $next = this.$root.find(findedId)
            this.selection.select($next)
        }
    }

    get colsCount() {
        return this.$root.findAll(`[data-type="resizable"][data-col]`).length
    }
}

