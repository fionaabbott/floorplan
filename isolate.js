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

  function highlightSeat(seat) {
    $("rect#" + seat).css("fill", "#C5050C");
    // $("rect#" + seat).css("stroke", "#000");
    $("text#num" + seat).css("fill", "#FFFFFF");
    $("text#num" + seat).css("cursor", "pointer");
    $("rect#" + seat).css("cursor", "pointer");
  }

  function hideSeat(seat) {
    if (seat != "Reception") {
      $("rect#" + seat).css("fill", "none");
    } else {
      $("rect#" + seat).css("fill", "#fff");
    }

    //$("rect#" + seat).css("stroke", "#000");
    $("text#num" + seat).css("fill", "#000");
    $("text#num" + seat).css("cursor", "default");
    $("rect#" + seat).css("cursor", "default");
  }
  //$("#employees").css("border", "1px solid black");
  //console.log($("#employees"));
  //console.log($("#employee_name").attr("id"));
  //console.log($("#employee_name").attr("id"));
  //console.log($("#emplist").val());
  //var employees_arr = $("#employees").attr("data-all-emps").split(",");
  //var svgfile = "https://stage.supportuw.org/connect/floorplan/loadfloor.php";
  //var svgfile = "https://supportuw.org/connect/floorplan/loadfloor.php";
  var svgfile =
    "https://connectdev.supportuw.org/attachment/726612400000/28641/650-1.svg";
  var token =
    "96C3CF52BEA2C736B8CB68CFF26EF77F0E476F151B93A91B13CC868C24B8F8E8A46A50CB6B8856813D8A3A1EC67A792F01ED822612B7030D6CFC62C155DBD4913606B3D2EBAE8061B5A29F392D9916D7A7E5D25BED8C0E349BFA662924B68338150B3EAD655344F0220BDA87A2F049368929CA00DAD1DAAB0A2384B1FD61FBE6";
  var url = "https://connectdev.supportuw.org/api/users?token=" + token;
  //loads initial location based on query string
  //var location = getQueryVariable("l");
  var location = "650-1"; //set as initial location as page may not load with any query strings
  var building = "650"; //set as initial location as page may not load with any query strings
  var floor = "1"; //set as initial location as page may not load with any query strings
  var seat = false;
  var floater = false;
  var name = "";
  var employees_arr = [];
  var employee_name = "";
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

    console.log(seat);

    location = building + "-" + floor;

    switch (location) {
      case "650-1":
        svgfile =
          "https://connectdev.supportuw.org/attachment/726612400000/28641/650-1.svg";
        break;
      case "650-3":
        svgfile =
          "https://connectdev.supportuw.org/attachment/744692700000/28643/650-3.svg";
        break;
      case "1848-1":
        svgfile =
          "https://connectdev.supportuw.org/attachment/726738100000/28646/1848-1.svg";
        break;
      case "1848-2":
        svgfile =
          "https://connectdev.supportuw.org/attachment/726788500000/28647/1848-2.svg";
        break;
      case "1848-3":
        svgfile =
          "https://connectdev.supportuw.org/attachment/726737830000/28644/1848-3.svg";
        break;
      case "1848-4":
        svgfile =
          "https://connectdev.supportuw.org/attachment/726737970000/28645/1848-4.svg";
        break;
      case "1848-B":
        svgfile =
          "https://connectdev.supportuw.org/attachment/726735930000/28642/1848-B.svg";
        break;
      case "1SP-9":
        svgfile =
          "https://connectdev.supportuw.org/attachment/831926000000/28664/1SP.svg";
        break;
      default:
        svgfile =
          "https://connectdev.supportuw.org/attachment/726612400000/28641/650-1.svg";
    }
  }

  //console.log("location: " + location);
  //console.log("building: " + building);
  //console.log("floor: " + floor);
  //console.log("seat: " + seat);

  //console.log($("#employees"));
  //console.log("Hello!");
  //make the employee dropdown
  $.getJSON(url, function(data) {
    var cubicle = "";
    $.each(data, function(key, employee_info) {
      //console.log(employee_info);
      //console.log(location);
      //console.log(employee_info["addressLine1"]);
      if (employee_info["addressLine2"] != null) {
        if (
          employee_info["addressLine2"].search(location) !== -1 ||
          employee_info["addressLine2"].search("Reception") !== -1
        ) {
          //floor = employee_info["addressLine1"].split("-")[0];
          //console.log("floor: "+floor);
          cubicle = employee_info["addressLine2"].split("-")[1];

          //console.log(employee_info['firstName']+" "+employee_info['lastName']+ " sits at address: "+employee_info['addressLine1']);
          //console.log("seat: "+seat);
          if (cubicle.charAt(0) == floor) {
            employees_arr.push(employee_info);
          } else if (floor == 1 && seat == "Reception" && building == "1848") {
            //console.log("seat: "+seat);
            employees_arr.push(employee_info);
          }
        }
      }
    });

    employees_arr.sort(function(a, b) {
      var x = a["firstName"].toLowerCase();
      var y = b["firstName"].toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });

    //console.log(employees_arr);
    var datastr = "";

    $.each(employees_arr, function(key, employee_info) {
      //console.log(employee_info['firstName']+" "+employee_info['lastName']+ " sits at address: "+employee_info['addressLine1']);

      cubicle = employee_info["addressLine2"].split("-")[1];
      datastr +=
        employee_info["firstName"] +
        " " +
        employee_info["lastName"] +
        ":" +
        seat +
        ",";
      $("#employees").append(
        "<option value='" +
          cubicle +
          "'>" +
          employee_info["firstName"] +
          " " +
          employee_info["lastName"] +
          "</option>"
      );

      //$("#employee_name").attr("data-all-emps", datastr);
      $("#emplist").val(datastr);
    });

    console.log(seat);
    if (seat !== false && floater === false) {
      $("#employee_name").html(
        $("option[value='" + seat + "']").text() + " sits here at " + seat + "."
      );
    }
  });

  //determine if we've got the right floor loaded
  //console.log("seat: " + seat);
  //console.log(employees_arr);
  employee_name = function(employees_arr) {
    console.log(employees_arr);
    console.log(employees_arr.length);
    for (var i = 0; i < employees_arr.length; i++) {
      console.log("addressLine2: " + employees_arr[i]["addressLine2"]);
      console.log("hi!");
      if (employees_arr[i]["addressLine2"].split("-")[1] == seat) {
        return employees_arr[i]["addressLine2"].split("-")[1];
      }
    }
    return "Not found";
  };

  //console.log("employee name: " + employee_name(employees_arr));
  /*
  if (seat !== false && floater === false) {
    $("#employee_name").html(
      $("option[value='" + seat + "']").text() + " sits here at " + seat + "."
    );
  }
*/
  console.log(employees_arr);
  for (var i = 0; i < employees_arr.length; i++) {
    console.log(employees_arr[i]);
  }

  $("#employees").each(function() {
    console.log($("#employees option").val());
  });
});
