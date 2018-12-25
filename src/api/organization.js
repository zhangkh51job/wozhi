import {_get} from './index'

let addCondition_userid = sessionStorage.getItem('UserId');
// 获取组织列表
export const getOrganizationList = (data) => {
  let req = {
    //url: `/api/ding/score/org/list`
    url: `/api/ding/score/org/list/${addCondition_userid}`
  }
  req.data = {};
  return _get(req);
}

// 选择组织获取人员信息
export const getOrgScore = (data) => {
  let req = {
    //url: `/api/ding/score/org/${data.year}/${data.quarter}/${data.dept}`
    url: `/api/ding/score/org/${data.year}/${data.quarter}/${data.dept}/${addCondition_userid}`
  }
  req.data = {};
  return _get(req);
};

export const hasOrganization = () => {
  let req = {
    url: `/api/score/isHaveOrganization/${addCondition_userid}`
  }
  req.data = {};
  return _get(req);
};
