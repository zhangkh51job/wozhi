/**
 * Created by yangjie on 2019/3/8.
 */
import {filterScore, studyType} from './api/score';

const filterScoreWrap1 = () =>{
    console.log('a1');
    filterScore({
        deptId:0,
        userId:'1317F6C3DEB24F35A82E6776DCDBFC9B',
        begDate: '2018-1-1  23:59:59',
        endDate :'2019-1-1  23:59:59'
        ,studyType: ''
    })
    console.log('a2');
}

const filterScoreWrap2 = () =>{
    console.log('b1');
    filterScore({
        deptId:0,
        userId:'1317F6C3DEB24F35A82E6776DCDBFC9B',
        begDate: '2017-1-1  23:59:59',
        endDate :'2018-1-1  23:59:59'
        ,studyType: ''
    })
    console.log('b2');
}

const switchLoading = async (funs, end) => {
    for(var i = 0, leni = funs.length;i < leni;i++){
        await funs[i].call();
    }
    end.call();
}

switchLoading([filterScoreWrap1, filterScoreWrap2], ()=>{
    console.log('end')
})