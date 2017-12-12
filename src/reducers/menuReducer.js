const initialState = {
    mainDish: null,
    beverage: null
}


const menuReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'UPDATE_SELECTION': {
            let updatedState = Object.assign({}, state);
            updatedState.mainDish = action.mainDish;
            updatedState.beverage = action.beverage;
            return updatedState;
        }
        default:
            return state
    }
}

export default menuReducer;