$(document).ready(function() {
  var svgfile ="https://stage.supportuw.org/connect/floorplan/loadfloor.php";

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }

  function makeEmployeeList() {
    var employees_arr = [];
    employees_arr.push({
      seat: employee_info["addressLine1"],
      name: employee_info["firstName"] + " " + employee_info["lastName"]
    });
  }

  var token =
    "96C3CF52BEA2C736B8CB68CFF26EF77F0E476F151B93A91B13CC868C24B8F8E8A46A50CB6B8856813D8A3A1EC67A792F01ED822612B7030D6CFC62C155DBD4913606B3D2EBAE8061B5A29F392D9916D7A7E5D25BED8C0E349BFA662924B68338150B3EAD655344F0220BDA87A2F049368929CA00DAD1DAAB0A2384B1FD61FBE6";
  //loads initial location based on query string
  //var location = getQueryVariable("l");
  var employees_arr = [];
  var location = "650-1"; //set as initial location as page may not load with any query strings
  var building = "650"; //set as initial location as page may not load with any query strings
  var floor = "1"; //set as initial location as page may not load with any query strings
  var seat = false;
  var floater = false;
  //console.log(location);

  if (getQueryVariable("l") !== false) {
    location = getQueryVariable("l");
    //console.log("location at line 38: " + location);
    if (location.search(/(1848|650)-\d{3}/) !== -1) {
      var location_bits = location.split("-");
      building = location_bits[0];
      seat = location_bits[1];
      floor = seat.substring(0, 1);
      location = building + "-" + floor;
    } else if (location.search(/(1848|650)-\d{1}/) !== -1) {
      var location_bits = location.split("-");
      building = location_bits[0];

      if (location.search("TD") !== -1) {
        floor = location_bits[1].substring(0, 1);
        location = building + "-" + floor;
        //console.log("Line 51 location: " + location);
        floater = true;
        
      } else {
        floor = location_bits[1];
      }
    } else {
      location = "650-1";
    }
  }

  /*
  console.log("location: " + location);
  console.log("building: "+building);
  console.log("floor: " + floor);
  console.log("seat: " + seat);
  */
 $.getJSON("https://connectdev.supportuw.org/api/users?token=", function(data) {
    //console.log("match: "+match);

    $.each(data, function(key, employee_info) {
      employees_arr.push(employee_info);   
      //console.log("address: "+employee_info["addressLine2"]);
      //console.log(employee_info["addressLine1"].search(location));

      if (employee_info["addressLine2"].search(location) !== -1) {
        //floor = employee_info["addressLine1"].split("-")[0];
        //console.log("floor: "+floor);
        seat = employee_info["addressLine2"].split("-")[1];

        //console.log(employee_info['firstName']+" "+employee_info['lastName']+ " sits at address: "+employee_info['addressLine1']);
        //console.log("seat: "+seat);
        if (seat.charAt(0) == floor) {
          //$("#employees").append("<option value='"+seat+"'>"+employee_info['firstName']+" "+employee_info['lastName']+" "+seat+"</option>");
          $("#employees").append(
            "<option value='" +
              seat +
              "'>" +
              employee_info["firstName"] +
              " " +
              employee_info["lastName"] +
              "</option>"
          );
          //$("#employees").append("<option value='"+seat+"'>"+seat+"</option>");
        }
      }
    });
  });
});
