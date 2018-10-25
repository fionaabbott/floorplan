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

  var employees_arr = [];
  //var svgfile = "https://stage.supportuw.org/connect/floorplan/loadfloor.php";
  //var svgfile = "https://supportuw.org/connect/floorplan/loadfloor.php";
  var svgfile = "https://connect.supportuw.org/attachment/708487500000/37247/650-1.svg";

  //loads initial location based on query string
  //var location = getQueryVariable("l");
  var location = "650-1"; //set as initial location as page may not load with any query strings
  var building = "650"; //set as initial location as page may not load with any query strings
  var floor = "1"; //set as initial location as page may not load with any query strings
  var seat = false;
  var floater = false;
  var name = "";
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
    
    switch (location) {
      case "650-1":
      svgfile = "https://connectdev.supportuw.org/attachment/726612400000/28641/650-1.svg";
        break;
      case "650-3":
      svgfile = "https://connectdev.supportuw.org/attachment/744692700000/28643/650-3.svg";
        break;
      case "1848-1":
      svgfile = "https://connectdev.supportuw.org/attachment/726738100000/28646/1848-1.svg";
        break;
      case "1848-2":
      svgfile = "https://connectdev.supportuw.org/attachment/726788500000/28647/1848-2.svg";
        break;
      case "1848-3":
      svgfile = "https://connectdev.supportuw.org/attachment/726737830000/28644/1848-3.svg";
        break;
      case "1848-4":
      svgfile = "https://connectdev.supportuw.org/attachment/726737970000/28645/1848-4.svg";
        break;
      case "1848-B":
      svgfile = "https://connectdev.supportuw.org/attachment/726735930000/28642/1848-B.svg";
        break;
    }
  }

  //console.log("location: " + location);
  //console.log("building: " + building);
  //console.log("floor: " + floor);
  //console.log("seat: " + seat);

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
    //$("#floormap").load(svgfile + "?l=" + building + "-" + floor, function () {
    $("#floormap").load(svgfile,function(){
      //console.log("location: "+location);

      if ((seat !== false) & (floater === false)) {
        highlightSeat(seat);
        console.log($("option[value='" + seat + "']").text());
        $("#employee_name").html(
          $("option[value='" + seat + "']").text() +
          " sits here at " +
          seat +
          "."
        );
      } else if ((seat !== false) & (floater === true)) {
        $("#employee_name").html(
          $("option[value='" + seat + "']").text() +
          " does not have a permanently assigned location on this floor."
        );
      }

      $(".seat").click(function (event) {
        //alert("Hi!");
        //alert(event.currentTarget);
        if (seat != "") {
          hideSeat(seat);
          floater = false;
          $("#employee_name").html("");
          $("title").text("");
        }
        seat = $(this).attr("data-seat");
        highlightSeat(seat);
        //console.log($("option[value='" + seat + "']").length);


        if ($("option[value='" + seat + "']").text()) {
          $("#employee_name").html("");
          name = "";

          if ($("option[value='" + seat + "']").length > 1) {
            //console.log($("option[value='" + seat + "']").text());
            $.each($("option[value='" + seat + "']"), function (key, value) {
              if (key <= $("option[value='" + seat + "']").length - 1) {
                name += $(this).text() + " and ";
              }
              
              //console.log(key + ": " + $(this).text());
            });

            name = name.substring(0, name.length - 4);
            //name = $("option[value='" + seat + "']").text();
            //console.log($("option[value='" + seat + "']"));
            $("#employee_name").html(name + " sit here at " + seat + ".");
            //adds a tooltip
            //$("rect#"+seat).append("<title>"+$("option[value='" + seat + "']").text() + " sits here.</title>");
            $("title").text(name + " sit here at " + seat + ".");
            
          } else {
            name = $("option[value='" + seat + "']").text();
            $("#employee_name").html(name + " sits here at " + seat + ".");
            //adds a tooltip
            //$("rect#"+seat).append("<title>"+$("option[value='" + seat + "']").text() + " sits here.</title>");
            $("title").text(name +" sits here at " +seat +".");
          }

          


        } else {
          $("#employee_name").html(seat + " is not permanently assigned.");
          $("title").text(seat + " is not permanently assigned.");
        }
      });

      //$("[class!='seat']").hover(function () {
      //$("title").text("");
      //});

      $(".seat").hover(function () {
        if ($(this).attr("data-seat") !== seat) {
          //console.log($(this).attr("data-seat"));
          $("title").text($(this).attr("data-seat"));
        } else {
          if ($("option[value='" + seat + "']").text()) {
            $("title").text($("option[value='" + seat + "']").text() + " sits here at " + seat + ".");
          } else {
            $("title").text(seat + " is not permanently assigned.");
          }
          
        }
      }, function () {
        $("title").text("");
      });

    });
  }

});
