export const updateSelection = (mainDish, beverage) => {
    return {
        type: 'UPDATE_SELECTION',
        mainDish,
        beverage
    }
}