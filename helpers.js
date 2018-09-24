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

}

