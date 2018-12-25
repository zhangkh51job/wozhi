/**
 * Created by yangjie on 2018/12/11.
 */
export function transformTime(year, quarter){
  let begDate, endDate, endDatee;
  switch (quarter){
    case 0:
      begDate = year+'-01-01 00:00:00';
      endDate = year+'-12-31 23:59:59';
      break;
    case 1:
      begDate = year+'-01-01 00:00:00';
      //endDatee = new Date(new Date(begDate).getTime() + 3*30*24*3600*1000);
      endDate = year+'-03-31 23:59:59';
      break;
    case 2:
      begDate = year+'-04-01 00:00:00';
      //endDatee = new Date(new Date(begDate).getTime() + 3*30*24*3600*1000);
      endDate = year+'-06-30 23:59:59';
      break;
    case 3:
      begDate = year+'-07-01 00:00:00';
      //endDatee = new Date(new Date(begDate).getTime() + 3*30*24*3600*1000);
      endDate = year+'-09-30 23:59:59';
      break;
    case 4:
      begDate = year+'-10-01 00:00:00';
      //endDatee = new Date(new Date(begDate).getTime() + 3*30*24*3600*1000);
      endDate = year+'-12-31 23:59:59';
      break;
  }

  return {
    begDate,
    endDate
  }
}
