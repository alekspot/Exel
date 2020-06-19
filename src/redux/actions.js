import {TABLE_RESIZE, CHANGE_TEXT, CURRENT_STYLES, APPLY_STYLE} from './types'

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function changeText(text) {
    return {
        type: CHANGE_TEXT,
        data: text
    }
}

export function changeStyles(data) {
    return {
        type: CURRENT_STYLES,
        data
    }
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}
