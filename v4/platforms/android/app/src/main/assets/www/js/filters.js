/* global angular */

angular.module('pmaEmergenciaFilters', []).filter('dateFormat', function() {
	return function(input) {
		if(!input) return "";
		input = new Date(input);
		var res = (input.getMonth()+1) + "/" + input.getDate() + "/" + input.getFullYear() + " ";
		var hour = input.getHours();
		var ampm = "AM";
		if(hour === 12) ampm = "PM";
		if(hour > 12){
			hour-=12;
			ampm = "PM";
		}
		var minute = input.getMinutes()+1;
		if(minute < 10) minute = "0" + minute;
		res += hour + ":" + minute + " " + ampm;
		return res;

	};
}).filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});;
