$(document).ready(function() {

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


/*
  employees_arr.sort(function (a, b) {
    return (a["firstName"] < b["firstName"]);
  });
*/
//token on dev
var token ="96C3CF52BEA2C736B8CB68CFF26EF77F0E476F151B93A91B13CC868C24B8F8E8A46A50CB6B8856813D8A3A1EC67A792F01ED822612B7030D6CFC62C155DBD4913606B3D2EBAE8061B5A29F392D9916D7A7E5D25BED8C0E349BFA662924B68338150B3EAD655344F0220BDA87A2F049368929CA00DAD1DAAB0A2384B1FD61FBE6";

//var token = "E421A33DDE1DD2390373D3C53D750EECB731A2810A02C80B6E9CED65B67AD7F0050B7CE5AE9FA0FC03FAA288E7515A53D2F0E2E02B50D4756461AA6B9EF05BE128BB1F38A241975785D09D1B1117A80B4C7C20D3A703A327ADE1D670BA032A482AC95B4E10EF2F7EAFEADFB54DB333A2DEAE03EF45A9B5DBAEBFFEF25C70607C";
  //loads initial location based on query string
  //var location = getQueryVariable("l");
  var employees_arr = [];
  var location = "650-1"; //set as initial location as page may not load with any query strings
  var building = "650"; //set as initial location as page may not load with any query strings
  var floor = "1"; //set as initial location as page may not load with any query strings
  var seat = false;
  var floater = false;
  //console.log(location);


  function isFloater(location) {
    if (location.search("TD") !== -1) {
      return true;
    }

    return false;
  }


  if (getQueryVariable("l") !== false) {
    location = getQueryVariable("l");
    var location_bits = location.split("-");

    if (isFloater(location) === true) {
      floater = true;
    }
    
    building = location_bits[0];
    if (location.search("Reception") !== -1) {
      floor = 1;
    } else {
      floor = location_bits[1].substring(0, 1);
    }

    if (location_bits[1].length > 1) {
      seat = location_bits[1];
    }
    
    location = building + "-" + floor;
  }

  
  //console.log("location: " + location);
  //console.log("building: "+building);
  //console.log("floor: " + floor);
  //console.log("seat: " + seat);

  //var url = "users.json";
  var url = "https://connectdev.supportuw.org/api/users?token=" + token;
  //var url = "https://connect.supportuw.org/api/users?token=" + token;
  
  $.getJSON(url, function (data) {
    //console.log(data);
    $.each(data, function (key, employee_info) {
      //console.log(employee_info);
      //console.log(location);
      //console.log(employee_info["addressLine1"]);
      if(employee_info["addressLine2"] != null){
        if (employee_info["addressLine2"].search(location) !== -1 || employee_info["addressLine2"].search("Reception") !== -1) {
          //floor = employee_info["addressLine1"].split("-")[0];
          //console.log("floor: "+floor);
          seat = employee_info["addressLine2"].split("-")[1];
  
          //console.log(employee_info['firstName']+" "+employee_info['lastName']+ " sits at address: "+employee_info['addressLine1']);
          //console.log("seat: "+seat);
          if (seat.charAt(0) == floor) {
            employees_arr.push(employee_info);
          } else if (floor == 1 && seat == "Reception" && building == "1848") {
            //console.log("seat: "+seat);
            employees_arr.push(employee_info);
          }
        }  
      }
    
    });
    
    
    employees_arr.sort(function (a, b) {
      var x = a["firstName"].toLowerCase();
      var y = b["firstName"].toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });

    //console.log(employees_arr);
    var datastr = "";

    $.each(employees_arr, function (key,employee_info,) {
      //console.log(employee_info['firstName']+" "+employee_info['lastName']+ " sits at address: "+employee_info['addressLine1']);
      
      seat = employee_info["addressLine2"].split("-")[1];
      datastr += employee_info['firstName'] + " " + employee_info['lastName'] + ":" + seat + ",";
      $("#employees").append(
        "<option value='" +
          seat +
          "'>" +
          employee_info["firstName"] +
          " " +
          employee_info["lastName"] +
          "</option>"
      );      

      //$("#employee_name").attr("data-all-emps", datastr);
      $("#emplist").val(datastr);
      
    });



  });

});
