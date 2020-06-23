import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize'
import { shouldResize, isCell, matrix, nextSelector } from '@/components/table/table.functions'
import { TableSelection } from '@/components/table/TableSelection'
import {$} from '@core/dom'
import {parse} from '@core/parse'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'

export class Table extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
        this.rowsCount = 20;
    }
    static className = 'excel-table';

    toHTML() {
        return createTable(this.rowsCount, this.store.getState())
    }
    prepare() {
        this.selection = new TableSelection(this.$root)
    }
    init() {
        super.init()

        this.selectCell(this.$root.find('[data-id = "0:0"]'))


        this.$on('formula:input', value => {
            this.selection.selected
                .attr('data-value', value)
                .text(parse(value))
            this.updateTextInStore(value)
        })

        this.$on('formula:done', () => this.selection.selected.focus())
        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            throw new Error('Resize error')
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $firstTarget = $(event.target)
            this.selectCell($firstTarget)

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
            const id = this.selection.selected.id(true)
            const findedId = nextSelector(key, id, this.rowsCount, this.colsCount)
            const $next = this.$root.find(findedId)

            this.selectCell($next)
        }
    }

    get colsCount() {
        return this.$root.findAll(`[data-type="resizable"][data-col]`).length
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.selected.id(),
            value
        }))
    }
    onInput(event) {
        this.updateTextInStore($(event.target).text())
    }

    destroy() {
        super.destroy()
    }
}

