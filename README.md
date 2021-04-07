# 🚛 Vancation: Vanlife pocket map

**Vancation is an app for people living or travelling in their campervan or car. 🚙🚛🚚
Vanlifers pinpoint suitable parking spots on the map, selecting its qualities such as 'quiet', 'safe' and 'near green space'
These markers are saved for other users to see and modify.**

### Developer MVP goals:　 💻

The MVP (minimum viable product) of this project will allow a user to create, view, update and delete markers set on Google maps.
They will be able to centre the map to their own location, click on existing markers or create their own, saving some details with it.
Users will check applicable qualities of the location of the marker on a checkbox list and be able to save it to the database.

### Technologies & tools:　 ✎

For this app, I am using React.js with hooks on the front end with a Node.js server on the backend. The PostgreSQL database is deployed on Heroku with CI/CD.
For the map, I brought in the Google maps API with some other functions such as reverse geocoding to lookup an address from the latitude and longitude values. I have never used Google maps API before, so this is a fun challenge! 🌎

## How to use:

### Add a new parking spot:

1. click the exact point of the parking spot on the map.
2. click 'get address' in the panel on the right hand side/below (desktop/mobile)
3. click 'next' and check the boxes of the features this parking spot has to offer.
4. click 'save'.
5. REFRESH the page to view your new parking spot!

### View parking spots:

1. choose an area you would like to visit on the map.
2. click a blue camper van icon image
3. click 'x' to DELETE this van parking spot (please don't delete them all :D)
4. click 'details' to view the address and details in the panel to the side/below.

Enjoy scouting out Vancation parking spots!
