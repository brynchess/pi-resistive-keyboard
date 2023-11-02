export function change_element (array = [], index = 0, buttonData) {
    const _array = [...array];
    _array[index] = buttonData;
    return _array
}