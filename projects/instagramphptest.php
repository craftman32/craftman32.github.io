<html>
<head>
	<title>Practice With Instagram API</title>
	<?php
		if(!empty($_GET['location'])){
			$location = $_GET['location'];
			$maps_url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode($location);
			$maps_json = file_get_contents($maps_url);
			$maps_array = json_decode($maps_json, true);

			$lat = $maps_array['results'][0]['geometry']['location']['lat'];
			$lng = $maps_array['results'][0]['geometry']['location']['lng'];

			$instagram_url = 'https://api.instagram.com/v1/media/search?lat=' . $lat . '&lng=' . $lng . '&client_id=38f894bb615f4494851c7f87891cb085';
			$instagram_json = file_get_contents($instagram_url);
			$instagram_array = json_decode($instagram_json, true);
		}
	?>
</head>
<body>
	<form action="">
		<input type="text" name="location">
		<input type="submit">
	</form>
	<br/>

	<?php
		if(!empty($instagram_array)){
			foreach ($instagram_array['data'] as $image) {
				echo '<a target="_blank" href="' . $image['link'] . '"><img src="' . $image['images']['low_resolution']['url'] . '" alt=""/></a>';
			}
		}
	?>
</body>
</html>