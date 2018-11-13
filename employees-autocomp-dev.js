$(document).ready(function() {
  //token on dev
  var token =
    "96C3CF52BEA2C736B8CB68CFF26EF77F0E476F151B93A91B13CC868C24B8F8E8A46A50CB6B8856813D8A3A1EC67A792F01ED822612B7030D6CFC62C155DBD4913606B3D2EBAE8061B5A29F392D9916D7A7E5D25BED8C0E349BFA662924B68338150B3EAD655344F0220BDA87A2F049368929CA00DAD1DAAB0A2384B1FD61FBE6";
  //var token = "E421A33DDE1DD2390373D3C53D750EECB731A2810A02C80B6E9CED65B67AD7F0050B7CE5AE9FA0FC03FAA288E7515A53D2F0E2E02B50D4756461AA6B9EF05BE128BB1F38A241975785D09D1B1117A80B4C7C20D3A703A327ADE1D670BA032A482AC95B4E10EF2F7EAFEADFB54DB333A2DEAE03EF45A9B5DBAEBFFEF25C70607C";
  //loads initial location based on query string
  //var location = getQueryVariable("l");
  var employees_arr = [];

  var url = "https://connectdev.supportuw.org/api/users?token=" + token;
  var userURL = "";
  //var url = "https://connect.supportuw.org/api/users?token=" + token;

  $.getJSON(url, {


  }, function (data) {
    //$.each(data, function(key, employee_info) {

    /*
          if (employee_info["addressLine2"] != null) {
            userURL = "https://connectdev.supportuw.org/api/users/" + employee_info['userId'] + "/customfields?token=" + token;
            $.getJSON(userURL, function (userData) {
              $.each(userData, function (key, user_info) {
                //console.log(user_info);
                if (user_info["name"] == "Address") {
                  //console.log(user_info["value"]);
                  employee_info["link"] = user_info["value"];
                  var test = employee_info["link"].match(/href="([^\'\"]+)/g);
    
                  if (test) {
                    
                    test = test.toString();
                    employee_info["link"] = test.substring(6);
                  }
                  
                }
              });
            });
    */

    //employees_arr.push(employee_info);

    //}
    data.sort(function(a, b){
      var x = a["firstName"].toLowerCase();
      var y = b["firstName"].toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });

    $.each(data, function (key, employee_info) {
      //make api call to get user link
    });
    console.log(data);
    });


    });

    //console.log(employees_arr);
    $.each(employees_arr, function(key, employee_info) {
      //console.log(employee_info['firstName']+" "+employee_info['lastName']+ " sits at address: "+employee_info['addressLine1']);
        //var link = "https://connectdev.supportuw.org/content/28071/interactive-floor-maps?l=";
        //cubicle = employee_info["addressLine2"];
      //link += cubicle;
      console.log(employee_info);
      console.log(key);
      console.log(employees_arr[key]["link"]);

      //$("#empList").append(
        //"<option data-url=\""+employee_info["link"]+"\" value='"+ employee_info["firstName"] + " " + employee_info["lastName"] + "'></option>"
     // );

      });
      
    $("#empAutoComp").change(function () {
      //console.log(employees_arr);
          window.location=$("option[value='"+$(this).val()+"']").attr("data-url");
      });

  //});
});
