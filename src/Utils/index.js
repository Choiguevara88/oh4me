import useInput from "./useInput";

export const validateEmail = (email) => {
    const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9A-z]+\.[A-z]{0,3}$/;
    return regex.test(email);
};

export const validatePhone = (phone) => {
    const regex = /(01[016789])[-](\d{4}|\d{3})[-]\d{4}$/g;
    return regex.test(phone);
};

export const dateFormat = (text) => {
    return text
    .replace(/[^0-9]/g, '')
    .replace(/^([0-9]{4})([0-9]{2})([0-9]{2})$/,'$1-$2-$3')
    .replace('--', '-');
}

export const validateDate = (text) => {
    const regex = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/; 
    return regex.test(text);
}


export const removeWhitespace = (text) => {
    const regex = /\s/g;
    return text.replace(regex, '');
};

export const phoneFormat = (phone) => {
    return phone
        .replace(/[^0-9]/g, '')
        .replace(
        /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
        '$1-$2-$3'
        )
        .replace('--', '-');
};
export const onlyNumber = (num) => {
    return num.toString().replace(/[^0-9]/g,'');
}

export const nickFormat = (text) => {
    const regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    return text.replace(regex, '');
};
export const validPassword = (text) => {
    // const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,99}$/;	// 정규식(숫자+영문+특수기호 8~99)
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/;	// 정규식(숫자+영문 6~20)
    return regex.test(text);
}

export const validMail = (text) => {
    const regex = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    return regex.test(text);
}

export const randomNum = (i) => {
    let str = '';
    let i_ = 1;

    for (i_; i_ <= i; i_++) {
        str += Math.floor(Math.random() * 10);
    }

    return str;
};

export const numberFormat = (num) => {
    if(num !== "") {
        num = num.toString().replace(/[^0-9]/g,'') * 1;
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
};

export const priceFormat = (num) => {
    if(num === "")  return "";
    if(num === 0) return "가격문의";

    num = num.toString().replace(/[^0-9]/g,'') * 1;
    // if((num) >= 20000000) num = 20000000;

    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " 원";
};

export const priceFormat2 = (num) => {
    if(num === "")  return "";

    num = num.toString().replace(/[^0-9]/g,'') * 1;
    // if((num) >= 20000000) num = 20000000;
    if(num !== 0) return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " 원";
    else         return "취소";
};

export const numberMoneyFormat = (num) => {

    if(num === 0) return "가격문의";
    if (num >= 1000000 && num % 10000 === 0) {
        let newNum = num / 10000;
        return newNum + ' 만원';
    } else {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 원';
    }

};

export const validBirth = (num) => {
    const regex = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return regex.test(num);
}

export const cutString = (text, textLength = 30, dot=true) => {
    // let chgText = text.replace(/(?:\r\n|\r|\n)/g, ' ').replace(/(\s\s)/g, ' ');
    let chgText = text;
    if (chgText.length > textLength)    {
        chgText = chgText.substr(0, textLength);
        if(dot) chgText += '...';
    }
    
    return chgText;
};

export const stripTags = (str_code) => {
    let ptn2 = /<\/?[^>]*>/gi;
    return str_code.replace(ptn2, '');
};

export const textLengthOverCut = (txt, len, lastTxt) => {
    if (len === '' || len === null) {
        // 기본값
        len = 20;
    }
    if (lastTxt === '' || lastTxt === null) {
        // 기본값
        lastTxt = '...';
    }
    if (txt.length > len) {
        txt = txt.substr(0, len) + lastTxt;
    }
    return txt;
};

export const regExp = (str) => {  
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
    if(reg.test(str)) return str.replace(reg, "");    
    else              return str;
}

export {useInput};