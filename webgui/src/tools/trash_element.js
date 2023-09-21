export function trash_element (array = [], index = 0) {
    const _array = [...array]
    _array.splice(index, 1)
    return _array
}