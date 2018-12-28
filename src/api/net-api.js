/**
 * Created by yangjie on 2018/12/28.
 */
import {_get, _post} from './net'
let addCondition_userid = sessionStorage.getItem('UserId');
export const getStudyPointDetail = (data, fn) => {
    let req = {
        url: `api/LearnPoint/GetDetail`
    };
    req.data = data;
    //return _postWithBaseUrl(req);
    _post(req, fn)
};

export const isTuanDaiMember = (data,fn) => {
    let req = {
        url: `api/PersonalCenter/PersonalCenter`
    }
    req.data = data;
    //return _postWithBaseUrl(req);
    _post(req, fn)
}

export const getGroupScore = (data, fn) => {
    let req = {
        url: `api/Course/GetMyScore/${addCondition_userid}`
        //url: `/ding/score/detail/${data.deptId}/${data.userId}`
    };
    req.data = data;
    //return _postWithBaseUrl(req);
    return _post(req, fn);
}