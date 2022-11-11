import Axios from 'axios';

class Api {
    constructor() {
        this.state = {
            isLoading   : false,
            url         : 'https://sorok1234.cafe24.com',
            path        : '/adm/api/',
            option  : {
                method: 'POST',
                headers: { 
                    Accept: '*/*',
                    'Content-Type': 'multipart/form-data',
                    'Cache-Control': 'no-cache',
                    'Accept-Encoding': 'gzip, deflate',
                    'cache-control': 'no-cache',
                    'Access-Control-Allow-Origin': '*', 
                    'Access-Control-Allow-Credentials': true,
                 },
                body: null,
            },
            dataSource: {},
        };
    }
    makeFormData(method = '', datas = {}) {
        let formdata = new FormData();
        formdata.append('method', method);
        for (let [key, value] of Object.entries(datas)) { formdata.append(key, value); }
        this.state.option.body = formdata;
    }
    send(method, datas, callback) {
        this.makeFormData(method, datas);
        return Axios.post(this.state.url + this.state.path, this.state.option.body, this.state.option.headers)
        .then((response) => {
            let responseJson    = response.data;
            let returnJson = { result: responseJson.result, message : responseJson.msg, data: responseJson.data };
            if(responseJson.result === 'false' && responseJson.msg)   console.log(method, responseJson.msg);
            if(typeof(callback) == 'function')      callback(returnJson);
            else                                    return returnJson;
        }).catch(function (error) { console.log("Axios catch!!! >>", method, error); });
    }
    
    axiosPost = async (url, body, stringify = true, method = 'post') => {
        try {
          const response = await Axios(url, {
            method,
            headers: {
              Accept: '*/*',
              'Content-Type': 'multipart/form-data',
              'Cache-Control': 'no-cache',
              'Accept-Encoding': 'gzip, deflate',
              'cache-control': 'no-cache',
              'Access-Control-Allow-Origin': '*', 
              'Access-Control-Allow-Credentials': true,
            },
            processData: false,
            contentType: false,
            mimeType: 'multipart/form-data',
            body: body,
          });
          const responseJson = await response.data;
          return responseJson;
        } catch (error) {
          return {
            code: 500,
            message: error,
          };
        }
      };
  
}

export default Api = new Api();