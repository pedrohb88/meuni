import {
    SET_COLLEGE,
    GET_COLLEGE,
    ADD_COLLEGE_INFO,
    GET_COLLEGE_INFOS
} from '../actions/types';

const initialState = {
    college: null,
    info: null,
    loading: true,
    currentInfos: null,
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_COLLEGE_INFOS:
        return {
            ...state,
            currentInfos: payload
        }

        case ADD_COLLEGE_INFO:
            return {
                ...state,
                info: payload.college,
                currentInfos: payload.infos,
            }    

        case SET_COLLEGE:
            return {
                ...state,
                college: payload
            }
        case GET_COLLEGE:
            return {
                ...state,
                info: payload,
                loading: false
            }
    
        default:
            return state;
    }
};