# 🚛 Vancation: Vanlife pocket map [IN DEVELOPMENT]

 **Vancation is an app for people living or travelling in their campervan or car. 🚙🚛🚚
 Vanlifers pinpoint suitable parking spots on the map, selecting its qualities such as 'quiet', 'safe' and 'near green space'
 These markers are saved for other users to see and modify.**
 
### Developer MVP goals:　💻
The MVP (minimum viable product) of this project will allow a user to create, view, update and delete markers set on Google maps.
They will be able to centre the map to their own location, click on existing markers or create their own, saving some details with it.
Users will check applicable qualities of the location of the marker on a checkbox list and be able to save it to the database. 

### Developer tools:　✎
For this app, I am using React.js with hooks on the front end with a Node.js server on the backend. The PostgreSQL database is deployed on Heroku with CI/CD. 
For the map, I brought in the Google maps API with some other functions such as reverse geocoding to lookup an address from the latitude and longitude values. I have never used Google maps API before, so this is a fun challenge! 🌎
