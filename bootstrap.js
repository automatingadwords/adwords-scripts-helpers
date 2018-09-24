var url = "https://raw.githubusercontent.com/automatingadwords/adwords-scripts-helpers/master/helpers.js";
var content = UrlFetchApp.fetch(url).getContentText();
eval(content);

var url = "https://raw.githubusercontent.com/automatingadwords/adwords-scripts-helpers/master/settings.js";
var content = UrlFetchApp.fetch(url).getContentText();
eval(content);

