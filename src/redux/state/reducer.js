import {
    INITIALIZED,
    USER,
    PRODUCTS,
    NOTIFICATION,
    SCHEDULES,
    INSURANCE
} from '../state/types'


const initialState = {
    initialized: false,
    products: [],
    viewedProduct: [],
    User: null,
    Notification: {
        status: false
    },
    Schedues:[],
    Insurance:[]
}





const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        case USER:
            return {
                ...state,
                User: action.payload,
            }

        case PRODUCTS:
            return {
                ...state,
                products: action.payload,
            }

            case SCHEDULES:
                return {
                    ...state,
                    Schedues: action.payload,
                }

                case INSURANCE:
                return {
                    ...state,
                    Insurance: action.payload,
                }

        case NOTIFICATION:
            return {
                ...state,
                Notification: action.payload,
            }

        default: return state
    }
}

export default reducer