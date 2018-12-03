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
  var token =
    "34E65427F4CC697CE997AFD16F5DFF880513F54E0ADF63CFF4154D3CFB4A13887231D167682BED295729EEEE6472D6174B1CAD0711624D45F65437B78CCC99B54A8407BA25CF0EDC5CCA141F0ABB6B22F2777D4F917BF2096B18C5997FDE9AA9DA5BC28538CCEBD62A576DF1D877CAD34F4A09D068224BC864372D37D8BDBB7A";

  var employees_arr = [];
  //var svgfile = "https://stage.supportuw.org/connect/floorplan/loadfloor.php";
  //var svgfile = "https://supportuw.org/connect/floorplan/loadfloor.php";
  var svgfile =
    "https://connectdev.supportuw.org/attachment/726612400000/28641/650-1.svg";
  var url = "https://connectdev.supportuw.org/api/users?token=" + token;

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

  //determine if we've got the right floor loaded

  if ($("#floormap").html() != "") {
    console.log("Floor plan is loaded");
  } else {
    //console.log("Floorplan is empty");
    //$("#floormap").load(svgfile + "?l=" + building + "-" + floor, function () {
    $("#floormap").load(svgfile, function() {
      $.getJSON(url, function (data) {
        function putValueBackFromPlaceholder() {
          var $this = $('#other');
          if ($this.val() === '') {
              $this.val($this.attr('placeholder'));
              $this.attr('placeholder','');
          }
      }
  
      $('#employeeList')
          .on('click', function(e) {
              var $this = $(this);
              var inpLeft = $this.offset().left;
              var inpWidth = $this.width();
              var clickedLeft = e.clientX;
              var clickedInInpLeft = clickedLeft - inpLeft;
              var arrowBtnWidth = 12;
              if ((inpWidth - clickedInInpLeft) < arrowBtnWidth ) {
                  $this.attr('placeholder',$this.val());
                  $this.val('');
              }
              else {
                  putValueBackFromPlaceholder();
              }
          })
          .on('mouseleave', putValueBackFromPlaceholder);
        //console.log(data);
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
              } else if (
                floor == 1 &&
                seat == "Reception" &&
                building == "1848"
              ) {
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
            cubicle +
            ",";
          $("#employees").append(
            "<option data-seat='" +
              cubicle +
              "' value='" +
              employee_info["firstName"] +
              " " +
              employee_info["lastName"] +
              "'>"
          );
        });
        if (seat !== false && floater === false) {
          $("#employee_name").html(
            $("option[data-seat='" + seat + "']").val() +
              " sits here at " +
              seat +
              "."
          );
        }
        if (seat !== false) {
          highlightSeat(seat);
          console.log($("option[data-seat='" + seat + "']").text());
          $("#employee_name").html(
            $("option[data-seat='" + seat + "']").val() +
              " sits here at " +
              seat +
              "."
          );
        } else if (seat === false && floater === true) {
          $("#employee_name").html(
            $("option[data-seat='" + seat + "']").val() +
              " does not have a permanently assigned location on this floor."
          );
        }

        $(".seat").click(function(event) {
          if (seat != "") {
            hideSeat(seat);
            floater = false;
            $("#employee_name").html("");
            $("title").text("");
          }
          seat = $(this).attr("data-seat");
          //console.log("name", $("option[data-seat='" + seat + "']").val());
          highlightSeat(seat);

          if ($("option[data-seat='" + seat + "']").val()) {
            $("#employee_name").html("");
            name = "";

            if ($("option[data-seat='" + seat + "']").length > 1) {
              $.each($("option[data-seat='" + seat + "']"), function(
                key,
                value
              ) {
                if (key <= $("option[data-seat='" + seat + "']").length - 1) {
                  name += $(this).text() + " and ";
                }
              });

              name = name.substring(0, name.length - 4);
              $("#employee_name").html(name + " sit here at " + seat + ".");
              //adds a tooltip
              $("title").text(name + " sit here at " + seat + ".");
            } else {
              name = $("option[data-seat='" + seat + "']").val();
              $("#employee_name").html(name + " sits here at " + seat + ".");
              //adds a tooltip
              $("title").text(name + " sits here at " + seat + ".");
            }
          } else {
            $("#employee_name").html(seat + " is not permanently assigned.");
            $("title").text(seat + " is not permanently assigned.");
          }
        });

        $(".seat").hover(
          function() {
            if ($(this).attr("data-seat") !== seat) {
              //console.log($(this).attr("data-seat"));
              $("title").text($(this).attr("data-seat"));
            } else {
              if ($("option[data-seat='" + seat + "']").val()) {
                $("title").text(
                  $("option[data-seat='" + seat + "']").val() +
                    " sits here at " +
                    seat +
                    "."
                );
              } else {
                $("title").text(seat + " is not permanently assigned.");
              }
            }
          },
          function() {
            $("title").text("");
          }
        );

        $("#employeeList").change(function () {
          //console.log("change event triggered");
          //console.log("employee name: ", $(this).val());
          floater = false;
          $("#employee_name").html("");

          if (seat != "") {
            hideSeat(seat);
          }
          seat = $("option[value='" + $(this).val() + "']").attr("data-seat");
          //console.log("seat: ", seat);

          if ($("#" + seat).length < 1) {
            floater = true;
          }
          //console.log(seat);
          if (!floater) {
            highlightSeat(seat);
            $("#employee_name").html(
              $(this).val() + " sits at " + seat + "."
            );
          } else {
            $("#employee_name").html(
              $(this).val() +
                " does not have a permanently assigned location on this floor."
            );
          }
        });
      });
    });
  }
});
