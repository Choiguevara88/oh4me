import { createContext, useContext, useReducer } from 'react';

const initialState = {
    info            : null,
    loggedin        : false,
    selMenu         : 0,
    card9           : [],
    card8           : [],    
    selCard3        : [],
    selCate         : '',
    catList         : [],
    communityList   : [],
    communityPage   : 1,
    communityPageLimit: false,
    mentoringList   : [],
    mentoringPage   : 1,
    mentoringPageLimit: false,
    pushList : [],
    pushPage : 1,
    pushPageLimit : false,
    bbsList : [],
    bbsPage : 1,
    bbsPageLimit : false,
    token           : '',

    
}

const reducer = (state, action) => {
    
    let index   = "";
    let copy    = "";

    switch(action.type) {
        case "TOKEN"    : return { ...state, token : action.info }
        case "LOGIN"    : return { ...state, loggedin:true, info: action.info }
        case "LOGOUT"   : return { ...state, info: null, loggedin: false, selMenu: 0, card9: [], card8: [], elCard3: [], selCate: '', catList: [], communityList: [], communityPage: 1, communityPageLimit: false, mentoringList: [], mentoringPage: 1, mentoringPageLimit: false, pushList: [], pushPage: 1, pushPageLimit: false, }
        case "SELMENU"  : return { ...state, selMenu: action.info }
        case "SELCARD3" : return { ...state, selCard3: action.info }
        case "CATLIST"  : return { ...state, catList: action.info }
        case "SELCAT"   : return { ...state, selCat: action.info }
        case "COMMUNITY" : return { ...state, communityList: action.info }
        case "COMMUNITYPAGE" : return { ...state, communityPage: action.info }
        case "COMMUNITYPAGELIMIT" : return { ...state, communityPageLimit: action.info }
        case "MENTORING" : return { ...state, mentoringList: action.info }
        case "MENTORINGPAGE" : return { ...state, mentoringPage: action.info }
        case "MENTORINGPAGELIMIT" : return { ...state, mentoringPageLimit: action.info }
        case "PUSH" : return { ...state, pushList: action.info }
        case "PUSHPAGE" : return { ...state, pushPage: action.info }
        case "PUSHPAGELIMIT" : return { ...state, pushPageLimit: action.info }   
        case "CARD9" : return {...state, card9: action.info}
        case "CARD8" : return {...state, card8: action.info}
        case "BBS" : return {...state, bbsList: action.info}
        case "BBSPAGE" : return { ...state, bbsPage: action.info }
        case "BBSPAGELIMIT" : return { ...state, bbsPageLimit: action.info }
        
        case "REFRESHCOMMUNITY" : 
            index   = state.communityList.findIndex((a)=>{return a.idx === action.info.idx});
            copy    = [...state.communityList];
            copy[index] = action.info;
        return { ...state, communityList: copy }
        
        case "DELETECOMMUNITY" : 
            index   = state.communityList.findIndex((a)=>{return a.idx === action.info.idx});
            copy    = [...state.communityList];
            let tmp = copy.filter(e => e.idx !== action.info.idx) 
        return { ...state, communityList: tmp }


        case "REFRESHMENTORING" : 
            index   = state.mentoringList.findIndex((a)=>{return a.idx === action.info.idx});
            copy    = [...state.mentoringList];
            copy[index] = action.info;
            
        return { ...state, mentoringList: copy }
        
        case "DELETEMENTORING" : 
            index   = state.mentoringList.findIndex((a)=>{return a.idx === action.info.idx});
            copy    = [...state.mentoringList];
            let tmp2 = copy.filter(e => e.idx !== action.info.idx) 
        return { ...state, mentoringList: tmp2 }

        case "REFRESHBBS" : 
            index   = state.bbsList.findIndex((a)=>{return a.idx === action.info.idx});
            copy    = [...state.bbsList];
            copy[index] = action.info;
        return { ...state, bbsList: copy }
        
        case "DELETEBBS" : 
            index   = state.bbsList.findIndex((a)=>{return a.idx === action.info.idx});
            copy    = [...state.bbsList];
            let tmp3 = copy.filter(e => e.idx !== action.info.idx) 
        return { ...state, bbsList: tmp3 }        


        default : return state;
    }
}

const MemberStateContext = createContext(null);
const MemberDispatchContext = createContext(null)

export const MemberProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MemberStateContext.Provider value={state}>
            <MemberDispatchContext.Provider value={dispatch}>
                {children}
            </MemberDispatchContext.Provider>
        </MemberStateContext.Provider>
    )    
}

export const useMemberState = () => {
    const state = useContext(MemberStateContext);
    if(!state) throw new Error("MemberStateError");
    return state;
}

export const useMemberDispatch = () => {
    const dispatch = useContext(MemberDispatchContext);
    if(!dispatch) throw new Error("MemberDispatchError");
    return dispatch;
}