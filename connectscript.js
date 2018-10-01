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

  function makeEmployeeList() {
    var employees_arr = [];
    employees_arr.push({
      seat: employee_info["addressLine1"],
      name: employee_info["firstName"] + " " + employee_info["lastName"]
    });
  }

  function highlightSeat(seat) {
    $("rect#" + seat).css("fill", "#C5050C");
    $("text#num" + seat).css("fill", "#FFFFFF");
    $("text#num" + seat).css("cursor", "pointer");
    $("rect#" + seat).css("cursor", "pointer")
  }

  function hideSeat(seat) {
    $("rect#" + seat).css("fill", "#FFFFFF");
    $("text#num" + seat).css("fill", "#000");
    $("text#num" + seat).css("cursor", "default");
		$("rect#" + seat).css("cursor", "default");
  }

  var employees_arr = [];
  var svgfile ="https://stage.supportuw.org/connect/floorplan/loadfloor.php";

  //loads initial location based on query string
  var location = getQueryVariable("l");
  var building = "";
  var floor = "";
  var seat = "";
  //console.log(location);

  if (location) {
    building = location.split("-")[0];
    floor = location.split("-")[1];

    if(seat = getQueryVariable("s")){
      highlightSeat(seat);
    }
    
  }

  $("#employees").change(function() {
    if (seat != "") {
      hideSeat(seat);
    }
    seat = $("select#employees option:selected").val();
    //console.log(seat);
    highlightSeat(seat);
  });

  //determine if we've got the right floor loaded

  if ($("#floormap").html() != "") {
    console.log("Floor plan is loaded");
  } else {
    //console.log("Floorplan is empty");
    $("#floormap").load(svgfile+"?l="+location, function() {
      //console.log(seat);
      $(".seat").hover(
        function() {
          if(seat != ""){
            hideSeat(seat);
          }
          seat = $(this).attr("data-seat");
          //$("rect.seat").css("fill", "#FFFFFF");
          highlightSeat(seat);

          if ($("option[value='" + seat + "']").text()) {
            $("#employee_name").html(
              $("option[value='" + seat + "']").text() + " sits here."
            );
          } else {
            $("#employee_name").html("This seat is currently unoccupied.");
          }

          //console.log($("option[value='"+seat+"']").text());
          //$(seat).css("opacity",".5");
          //console.log($("#employees")).html();
          //var emp = getEmployee(employees_arr,seat);
          //console.log(emp);
        },
        function() {
          hideSeat(seat);
          $("#employee_name").html("");
        }
      );
    });
  }

  var token =
    "96C3CF52BEA2C736B8CB68CFF26EF77F0E476F151B93A91B13CC868C24B8F8E8A46A50CB6B8856813D8A3A1EC67A792F01ED822612B7030D6CFC62C155DBD4913606B3D2EBAE8061B5A29F392D9916D7A7E5D25BED8C0E349BFA662924B68338150B3EAD655344F0220BDA87A2F049368929CA00DAD1DAAB0A2384B1FD61FBE6";

  $.getJSON("https://connectdev.supportuw.org/api/users?token=", function(data) {
    var match = "/"+location+"/";
    console.log("match: ",match);

    $.each(data, function(key, employee_info) {
      employees_arr.push(employee_info);   

      if (employee_info["addressLine1"].match(match)) {
        floor = employee_info["addressLine1"].split("-")[0];
        seat = employee_info["addressLine1"].split("-")[1];
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

  Object.size = function(obj) {
    var size = 0;
    key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
      return size;
    }
  };

  //console.log(employees_arr.length);
  //console.log(emp);
});
