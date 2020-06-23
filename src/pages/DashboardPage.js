import { Page } from '@/core/Page';
import { $ } from '@core/dom'
import {createRecordsTable} from './dashboard.functions'

export class DashboardPage extends Page {
    getRoot() {
        const now = Date.now().toString()
        return $.create('div', 'dashboard').html(`
        
        <div class="dashboard-header">
            <h1>Excel Dashboard</h1>
        </div>

        <div class="dashboard-new">
            <div class="dashboard-view">

            
                 <a href="#excel/${now}" class="dashboard-create">Новая таблица</a>
             </div>
        </div>

        <div class="dashboard-table dashboard-view">
            ${createRecordsTable()}
        </div>
        `)
    }
}
