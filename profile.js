$(document).ready(function() {
  //$("div.tf-tabbed-container-tab:contains('Location')").click(function(){

  var url = window.location.href;

  //console.log("You clicked the location tab");
  var text = $(
    "div.tf-profile-field.tf-profile-fieldid-address > div.tf-profile-field-value"
  ).html();

  if (text !== undefined) {
    var seat = text.split("-")[1];
    var seatbits = seat.split("");
    var floor = text.split("-")[0];
    //https://connectdev.supportuw.org/content/28071/interactive-floor-maps?l=1848-3&s=348TD
    var link =
      "https://connectdev.supportuw.org/content/28071/interactive-floor-maps?l=" +
      floor +
      "-" +
      seatbits[0] +
      "&s=" +
      seat;
    console.log("text: " + text);
    $(
      "div.tf-profile-field.tf-profile-fieldid-address > div.tf-profile-field-value"
    ).html('<a href="' + link + '">' + text + "</a>");
    //var link = "https://connectdev.supportuw.org/content/28071/interactive-floor-maps?l=";
    //$( "div:contains('Desk/Primary Work Location')" + ".tf-profile-field-value").html('<a href="'+link+'?l='+text+'">'+text+'</a>');
  }

  //});
});
