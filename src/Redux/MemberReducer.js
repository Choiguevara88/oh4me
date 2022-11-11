import {
    MEMBER_LOGIN,
    MEMBER_INFO,
} from './MemberAction';

const initialState = {    
    user : null, // 회원정보
};

export default (
    state = initialState,
    { type, payload, count=1 }
) => {
    switch(type) {
        case MEMBER_LOGIN  : return { ...state, user : payload, };
        case MEMBER_INFO   : return { ...state, user : payload, };
        default : return state;
    }
}
