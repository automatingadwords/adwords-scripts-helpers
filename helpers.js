function Helper () {
  
  /**
  * Check if a string is a number, used when grabbing numbers from the sheet
  * If the string contains anything but numbers and a full stop (.) it returns false
  * @param {number as a string}
  * @returns {bool}
  **/
  this.isNumber = function(n) {
    n = n.trim();
    var digits = n.split("")
    for(var d in digits){
      if(digits[d]=="."){continue}
      if(isNaN(digits[d])){
        return false
      }
    }
    return true
  };


    /**
       * Return the column number of the logs column
       * @param {google sheet} control/settings sheet 
       * @return {number} - Logs column
       **/
  this.getLogsColumn = function (controlSheet){
    var col = 5
    var LOGS_COLUMN = 0;
    while(String(controlSheet.getRange(3, col).getValue())){
      LOGS_COLUMN = controlSheet.getRange(3, col).getValue() == "Logs" ? col : 0;
      if(LOGS_COLUMN>0){break;}
      col++;
    } 
    return LOGS_COLUMN;
  }
  
  
  /**
       * Turn an array of logs into a numbered string
       * @param {array} logs 
       * @return {String} - Logs
       **/
  this.stringifyLogs = function (logs){
    var s = ""
    for(var l in logs){
      s+=(parseInt(l)+1) + ") ";
      s+=logs[l]+ " ";
    }
    return s
  }
  
  /**
       * Get AdWords Formatted date for n days back
       * @param {int} d - Numer of days to go back for start/end date
       * @return {String} - Formatted date yyyyMMdd
       **/
  this.getAdWordsFormattedDate = function (d, format){
    var date = new Date();
    date.setDate(date.getDate() - d);
    return Utilities.formatDate(date,AdWordsApp.currentAccount().getTimeZone(),format);
  }
  
  this.round = function (num,n) {    
    return +(Math.round(num + "e+"+n)  + "e-"+n);
  }

}

