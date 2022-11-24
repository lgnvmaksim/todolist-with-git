import {FilteredType} from "../App";

export const FilterReducer = (state: FilteredType, action: changeFilterACType) => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return action.payload.filteredValue
        }
        default:
            return state
    }
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (filteredValue: FilteredType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            filteredValue
        }

    } as const
}