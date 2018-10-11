<?php
if (!isset($_SERVER['HTTP_ORIGIN'])) {
    // This is not cross-domain request
    exit;
}

$wildcard = FALSE; // Set $wildcard to TRUE if you do not plan to check or limit the domains
$credentials = FALSE; // Set $credentials to TRUE if expects credential requests (Cookies, Authentication, SSL certificates)
$allowedOrigins = array('https://connectdev.supportuw.org', 'https://connect.supportuw.org');
if (!in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins) && !$wildcard) {
    // Origin is not allowed
    exit;
}
$origin = $wildcard && !$credentials ? '*' : $_SERVER['HTTP_ORIGIN'];

header("Access-Control-Allow-Origin: " . $origin);
if ($credentials) {
    header("Access-Control-Allow-Credentials: true");
}
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin");
header('P3P: CP="CAO PSA OUR"'); // Makes IE to support cookies

// Handling the Preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { 
    exit;
}

// Response
//header("Content-Type: application/json; charset=utf-8");
//echo json_encode(array('status' => 'OK'));
$floor = "";

$floors = array("1848-1","1848-2","1848-3","1848-4","1848-B","650-1","650-3");

if(in_array($_REQUEST['l'],$floors)){
    switch($_REQUEST['l']){
        case "1848-1":
        echo "<p class='heading'>1848 University Avenue, First Floor</p>";
        break;

        case "1848-2":
        echo "<p class='heading'>1848 University Avenue, Second Floor</p>";
        break;

        case "1848-3":
        echo "<p class='heading'>1848 University Avenue, Third Floor</p>";
        break;

        case "1848-4":
        echo "<p class='heading'>1848 University Avenue, Fourth Floor</p>";
        break;

        case "1848-B":
        echo "<p class='heading'>1848 University Avenue, Fourth Basement</p>";
        break;

        case "650-1":
        echo "<p class='heading'>650 North Lake Street, First Floor</p>";
        break;

        case "650-3":
        echo "<p class='heading'>650 North Lake Street, Third Floor</p>";
        break;
    }
    include($_REQUEST['l']).".svg";
}else{

    echo '<img src="https://stage.supportuw.org/connect/floorplan/sad_puppy.jpg" />';

}


?>