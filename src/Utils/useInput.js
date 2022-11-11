import { useReducer } from 'react';
import {phoneFormat, onlyNumber, cutString} from './index';

function reducer(state, action) {    
    switch(action.name) {
        case "hp" : action.value = phoneFormat(action.value); break;
        case "birthday" : action.value = onlyNumber(action.value); break;
        case "authnum" :  action.value = onlyNumber(action.value); break;
        case "agree0" : if(!action.checked) action.value= '';break;
        case "agree1" : if(!action.checked) action.value= '';break;
        case "agree2" : if(!action.checked) action.value= '';break;
        case "subject" : action.value = cutString(action.value, 100, false); break;
        case "content" : action.value = cutString(action.value, 1000, false); break;
        default : break;
    }    
    return {
        ...state,
        [action.name]:action.value,
    };
}

export default function useInput(initialForm) {
    const [state, dispatch] = useReducer(reducer, initialForm);
    const onChange = e => { dispatch(e.target); }
    return [state, onChange];
};