import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITALIZE_FORM';

const MEMBER_LOGIN = 'auth/MEMBER_LOGIN';

export const sampleAction = createAction(SAMPLE_ACTION);
export const changeField = createAction(CHANGE_FIELD, ({form, key, value})=>({form, key, value}))
export const initializeForm = createAction(INITIALIZE_FORM, form => form);

const initialState = {
    login : { nick : '', passwd : ''},
    register : {nick : '', passwd : '', passwd2 : ''},
};

const auth = handleActions({
    [SAMPLE_ACTION]     : (state, action) => state,
    [CHANGE_FIELD]      : (state, {payload:{form, key, value}}) => 
        produce(state, draft => {
            draft[form][key] = value;
        }),
    [INITIALIZE_FORM]   : (state, {payload:form}) => ({
        ...state,
        [form] : initialState[form],
    })
}, initialState);

export default auth;