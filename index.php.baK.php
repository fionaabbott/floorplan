<?php
	$not_wfaa = FALSE;
	//Grab Location from URL
	if(isset($_GET["l"]) && ($_GET["l"] != "")) {
		$cube_location = $_GET["l"];
		
		$filename = $cube_location . ".png";
		//Make sure file exists
		if (file_exists($filename)) { 
			header("Location: https://www.supportuw.org/connect/floorplan/" . $filename);
		} 
		if (!file_exists($filename)) {
			//if there isn't an image, go to the maps for one of our three office locations
			switch ($cube_location) {
				case "1848":
					header("Location: http://map.wisc.edu/s/r8vhw7n2");
					break;
				case "1900":
					header("Location: http://map.wisc.edu/s/r8vhw7n2");
					break;
				case "650":
					header("Location: http://map.wisc.edu/s/7qlyk8ry");
					break;
				case "711":
					header("Location: http://map.wisc.edu/s/qogqzzf2");
					break;
			}	
			$not_wfaa = TRUE;
		}
		if ($not_wfaa) {
			//is the person on campus or unassigned? 
			//first, drop the office number and dash
			$cube_location = preg_replace('/[0-9]+/', '', $cube_location);
			$cube_location = trim($cube_location, "- ");
			switch ($cube_location) {
				case "Engineering Hall":
					header("Location: http://map.wisc.edu/s/t8w0uh14");
					break;
				case "Mechanical Engineering":
					header("Location: http://map.wisc.edu/s/az9nnst7");
					break;
				case "Grainger Hall":
					header("Location: http://map.wisc.edu/s/qp0ckpoc");
					break;
				default:
					echo "<img src='/connect/floorplan/sad_puppy.jpg'>";
					break;
			}
		}
		else {
			//if GET["l"] has a value but it doesn't match an image or predefined location, give them the puppy 
			echo "<img src='/connect/floorplan/sad_puppy.jpg'>";
		}
	}
	//if GET["l"] doesn't have a value, give them the puppy
	else {
		echo "<img src='/connect/floorplan/sad_puppy.jpg'>"; 
	}	
?>