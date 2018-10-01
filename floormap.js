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
    $("text#num" + seat).css("fill", "#FFFFFF");
    $("text#num" + seat).css("cursor", "pointer");
    $("rect#" + seat).css("cursor", "pointer");
  }

  function hideSeat(seat) {
    $("rect#" + seat).css("fill", "#fff");
    $("text#num" + seat).css("fill", "#000");
    $("text#num" + seat).css("cursor", "default");
    $("rect#" + seat).css("cursor", "default");
  }

  var employees_arr = [];
  var svgfile = "https://stage.supportuw.org/connect/floorplan/loadfloor.php";

  //loads initial location based on query string
  //var location = getQueryVariable("l");
  var location = "650-1"; //set as initial location as page may not load with any query strings
  var building = "650"; //set as initial location as page may not load with any query strings
  var floor = "1"; //set as initial location as page may not load with any query strings
  var seat = false;
  var floater = false;
  //console.log(location);

  if (getQueryVariable("l") !== false) {
    location = getQueryVariable("l");
    if (location.search(/(1848|650)-\d{3}/) !== -1) {
      var location_bits = location.split("-");
      building = location_bits[0];
      seat = location_bits[1];
      floor = seat.substring(0,1);
    } else if (location.search(/(1848|650)-\d{1}/) !== -1) {
      var location_bits = location.split("-");
      building = location_bits[0];

      if (location.search("TD") !== -1) {       
        floater = true;
        floor = location_bits[1].substring(0, 1);
        seat = location_bits[1];
        location = building + "-" + floor;
      } else {
        floor = location_bits[1];
      }
      
    } else {
      location = "650-1";
    }
  }

  console.log("location: " + location);
  console.log("building: "+building);
  console.log("floor: " + floor);
  console.log("seat: " + seat);

  $("#employees").change(function() {
    floater = false;
    $("#employee_name").html("");

    if (seat != "") {
      hideSeat(seat);
    }
    seat = $("select#employees option:selected").val();
    if ($("#" + seat).length < 1) {
      floater = true;
    }
    //console.log(seat);
    if (!floater) {
      highlightSeat(seat);
      $("#employee_name").html(
        $("select#employees option:selected").text() + " sits at " + seat + "."
      );
    } else {
      $("#employee_name").html(
        $("select#employees option:selected").text() +
          " does not have a permanently assigned location on this floor."
      );
    }
  });

  //determine if we've got the right floor loaded

  if ($("#floormap").html() != "") {
    //console.log("Floor plan is loaded");
  } else {
    //console.log("Floorplan is empty");
    $("#floormap").load(svgfile + "?l=" + building + "-" + floor, function() {
      //console.log("location: "+location);

      if (seat !== false & floater === false) {
        highlightSeat(seat);
        $("#employee_name").html(
          $("option[value='" + seat + "']").text() +
            " sits here at " +
            seat +
            "."
        );
      } else if (seat !== false & floater === true) {
        $("#employee_name").html(
          $("option[value='" + seat + "']").text() + " does not have a permanently assigned location on this floor."
        );        
      }

      //console.log(seat);
      $("rect.seat,path.seat").hover(
        function() {
          if (seat != "") {
            hideSeat(seat);
            floater = false;
            $("#employee_name").html("");
          }
          seat = $(this).attr("data-seat");
          //console.log(this);
          highlightSeat(seat);

          if ($("option[value='" + seat + "']").text()) {
            $("#employee_name").html(
              $("option[value='" + seat + "']").text() +
                " sits here at " +
                seat +
                "."
            );

            //adds a tooltip
            //$("rect#"+seat).append("<title>"+$("option[value='" + seat + "']").text() + " sits here.</title>");
            $("title").text(
              $("option[value='" + seat + "']").text() +
                " sits here at " +
                seat +
                "."
            );
          } else {
            $("#employee_name").html(seat + " is not permanently assigned.");
            $("title").text(seat + " is not permanently assigned.");
          }
        },
        function() {
          hideSeat(seat);
          $("#employee_name").html("");
          $("title").text("");
        }
      );
    });
  }

  //console.log(employees_arr.length);
  //console.log(emp);
});
