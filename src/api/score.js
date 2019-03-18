import {_get, _post, _postWithBaseUrl} from './index'

// 获取我的学分
let addCondition_userid = sessionStorage.getItem('UserId');
export const getScore = (data) => {
  let req = {
    //url: `/api/ding/score/statics/${data.year}/${data.quarter}/${data.userId}`
    url: `/api/ding/score/statics/${data.year}/${data.quarter}/${data.userId}/${addCondition_userid}`
  }
  req.data = {};
  return _get(req);
}

// 筛选
export const filterScore = (data) => {
  let req = {
    url: `/api/ding/score/detail/${data.deptId}/${data.userId}/${addCondition_userid}`
    //url: `/ding/score/detail/${data.deptId}/${data.userId}`
  };
  req.data = {
    begDate: data.begDate,
    endDate: data.endDate
  };
  if (data.studyType) {
    req.data.studyType = data.studyType.join(',')
  }
  return _get(req);
}

// 获取学分类型表
export const studyType = (data) => {
  let req = {
    url: `/api/ding/score/settings/${addCondition_userid}`
    //url: '/ding/settings'
  }
  req.data = {};
  return _get(req);
}

export const validateUser = (data) => {
  let req = {
    url: `/api/score/validation/${data.userId}//${addCondition_userid}`
    //url: `/ding/score/detail/${data.deptId}/${data.userId}`
  };
  return _get(req);
};

export const getGroupScore = (data) => {
  let req = {
    url: `api/Course/GetMyScore/${addCondition_userid}`
    //url: `/ding/score/detail/${data.deptId}/${data.userId}`
  };
  req.data = data;
  return _postWithBaseUrl(req);
  //return _post(req);
}

export const getStudyPointDetail = (data, fn) => {
  let req = {
    url: `api/LearnPoint/GetDetail`
  };
  req.data = data;
  return _postWithBaseUrl(req);
  //_post(req, fn)
};

export const isTuanDaiMember = (data,fn) => {
  let req = {
    url: `api/PersonalCenter/PersonalCenter`
  }
  req.data = data;
  return _postWithBaseUrl(req);
  //_post(req, fn)
}

