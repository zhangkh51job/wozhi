/*import {_get, _post, _postWithBaseUrl} from './index'

export const goToSignin = ( param ) => {
    let req = {
        url: `api/LearnPoint/GetDetail`
    };
    req.data = param;
    return _post(req)
}

export const signin = ( param ) => {
    let req = {
        url: `api/LearnPoint/GetDetail`
    };
    req.data = param;
    return _post(req)
}*/

import {_get, _post} from './net';
export const goToSignIn = (data, fn) => {
    let req = {
        url: `/api/signIn/goToSignin`
    };
    req.data = data;
    //return _postWithBaseUrl(req);
    _post(req, fn)
};

export const signin = (data,fn) => {
    let req = {
        url: `/api/signInfo/signin`
    }
    req.data = data;
    //return _postWithBaseUrl(req);
    _post(req, fn)
}


