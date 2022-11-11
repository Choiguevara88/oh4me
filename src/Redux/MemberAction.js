import Api from "../Api"
export const MEMBER_LOGIN = 'member/MEMBER_LOGIN';
export const MEMBER_INFO = 'member/MEMBER_INFO';

export default {
    login: async (data) => async(dispatch) => {
        try{
            await Api.send('member_validNick', data, (args)=>{  
                if(args.result) {
                    dispatch({
                        type: MEMBER_LOGIN,
                        payload: args.arrItems
                    });
                    return {
                        state   : true,
                        nick    : args.arrItems.nick,
                        idx     : args.arrItems.idx
                    }
                } else {
                    dispatch({
                        type: MEMBER_LOGIN,
                        payload: null
                    });
                    return {state:false, msg: args.message, nick:''}
                }
            });
        } catch(e) {
            return {state:false, msg:'', nick:''}
        }        
    },
}