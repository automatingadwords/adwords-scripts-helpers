//uses helpers.js

function Setting () {
  
  this.processSetting = function (key, value, HEADER,controlSheet){
   var type = HEADER[key]
   if(key=="ROW_NUM"){
     return value;
   }
   var h = new Helper();
   switch(type){
     case "number":
        if(h.isNumber(value)){
          return value
        }else{
          throw("Error: Expected a number but recieved " +value+". Please check the settings")
        }
        return value
        break;
     case "label":
       return [controlSheet.getRange(3,Object.keys(HEADER).indexOf(key)+1).getValue(),value]
       break;
     case "normal":
       return value
       break;
     case "bool":
       return value == "Yes" ? true : false;
       break;
     case "csv":
       var ret =  value.split(",")
       ret = ret[0]==""&&ret.length==1?[]:ret;
       if(ret.length==0){
         return [];
       }else{
         for(var r in ret){
           ret[r] = String(ret[r]).trim() 
         }
       }
       return ret;
       break;
     default:
       throw("error setting type "+type+" not recognised for "+key)
 
   }
 }


  this.scanForAccounts = function(HEADER_TYPES) {
   var map = {};
   var controlSheet = SpreadsheetApp.openByUrl(INPUT_SHEET_URL).getSheetByName(INPUT_TAB_NAME)
   var data = SpreadsheetApp.openByUrl(INPUT_SHEET_URL).getSheetByName(INPUT_TAB_NAME).getDataRange().getValues();
   data.shift();
   data.shift();
   data.shift();
    
   var HEADER = Object.keys(HEADER_TYPES)
 
   var LOGS_COLUMN = 0;
   var col = 5
   while(controlSheet.getRange(3, col).getValue()){
     LOGS_COLUMN = controlSheet.getRange(3, col).getValue() == "Logs" ? col : 0;
     if(LOGS_COLUMN>0){break;}
     col++;
   }
 
   for(var k in data) {
     //if "run script" is not set to "yes", continue.
     var idColumn = HEADER.indexOf("ID")
     var flagColumn = HEADER.indexOf("FLAG")

     if(data[k][idColumn] == '' || data[k][flagColumn].toLowerCase() != 'yes') { continue; }
     var rowNum = parseInt(k,10) + 4;
     var id = data[k][0];
     var rowId = id+"/"+rowNum;
     map[id] = map[id]  || {}
     map[id][rowId] = { 'ROW_NUM': (parseInt(k,10) + 4) };
     for(var j in HEADER) {
       if(HEADER[j] == "LOGS_COLUMN"){
         map[id][rowId][HEADER[j]] = LOGS_COLUMN;
         continue;
       }
       map[id][rowId][HEADER[j]] = data[k][j];
     }    
   }
 
   for(var id in map){
     for(var rowId in map[id]){
       for(var key in map[id][rowId]){
         map[id][rowId][key] = this.processSetting(key,map[id][rowId][key], HEADER_TYPES, controlSheet)
       }
     }
   }
   return map;
 }
 

 this.parseDateRange = function(SETTINGS) {
    var YESTERDAY = h.getAdWordsFormattedDate(1, 'yyyyMMdd');
    SETTINGS.DATE_RANGE = '20000101,' + YESTERDAY;
  
    if(SETTINGS.DATE_RANGE_LITERAL == 'LAST_N_DAYS') {
      SETTINGS.DATE_RANGE =  h.getAdWordsFormattedDate(SETTINGS.N, 'yyyyMMdd') + ',' + YESTERDAY;
    }
  
    if(SETTINGS.DATE_RANGE_LITERAL == 'LAST_N_MONTHS') {
      var now = new Date(Utilities.formatDate(new Date(), AdWordsApp.currentAccount().getTimeZone(), 'MMM dd, yyyy HH:mm:ss'));
      now.setHours(12);
      now.setDate(0);
  
      var TO = Utilities.formatDate(now, 'PST', 'yyyyMMdd');
      now.setDate(1);
  
      var counter = 1;
      while(counter < SETTINGS.N) {
        now.setMonth(now.getMonth()-1);
        counter++;
      }
  
      var FROM = Utilities.formatDate(now, 'PST', 'yyyyMMdd');
      SETTINGS.DATE_RANGE =  FROM + ',' + TO;
    }
  
  }
 
 

  
}
