import {TABLE_RESIZE, CHANGE_TEXT, CURRENT_STYLES, APPLY_STYLE, CHANGE_TITLE} from './types'

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

export function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        data
    }
}
