# README #

The "Mapa de Leyendas de Mexico" is a way to transmit our culture, traditions and stories. Fostering the interest of our community for those tales that have been around us for many generations.

https://mapadeleyendas.com/

##*Mapa de Leyendas*
##Inspiration
Inspire  by the amazing stories that have been part of our mexican culture for generations and the tales we grew up with. Personally, the team is a huge fan of the supernatural and horror stories, plus the multi-disciplinary technological tools. 

##What it does
It is an interactive map with many multi platform resources which take you to the approximate location where the spooky stories that we re-discovered happened. The main goal of this project is to cultivate the interest of our community for those tales that have been around us for generations, promote the habit of reading and finally the use of technological tools at our disposal. This map helps us preserve our Mexican culture and spread it to newer generations.

##How we build it
We gathered some of the most iconic horror stories of our country, and we put together a group of talented artists to film, edit, narrate and write our content, together with the technological support of the map we create a route where an illustrated ghost takes you to the approximate location where the stories took place. 

We started by putting single markers on the map, but when we realize that not all the horror stories happened in a specific location, since many took place in forests, rivers, roads or describing multiple location types, decided to implement a path with animated symbols using a multi layer svg image. That was the hardest technical challenge for us, creating many poly lines with animated routes coexisting on an area, it was especially challenging using the SVG path notation from a multi layer and multi color image. 
It was also especially difficult to locate the zone, road, street, haunted house or exact location where the stories took place, we search on the web for news, videos, blogs or social media, because many of the places where stories took place were demolished, improved or are not accessible in the present. After we found the approximate location, we tried to represent the story into a single route using Google Earth.


##Challenges we ran into

The challenging part of this project was to filtrate the content, since we have many stories and have our artists to deliver the stories on time for our Day of the Death, also looking for free videos and material to make our videos, since there is not many stock portraying the Mexican community. 

##Accomplishments that we’re proud of 
We have received really good feedback, people have really liked our map and have shared it with their own communities. They follow the updates our map have and are constantly waiting for new content. Lately, we even got some requests from people wanting it to be a part of this project by telling the spooky stories their ancestors have shared with them.

##What we learned 
We learned the power of community and team work, everything we had made so far has been a team effort, from people who simple love Mexican tales and what to share it across the globe. 

##What’s next for _Mapa de Leyendas México_
Our next steps are to create even more content and add more stories from the different parts of our country, we want to stop using stock videos and film more original and accurate audiovisual products. We will love to have events and make presentations of our map and take our project closely to the community to enjoy the experience live.


### How do I get set up? ###

The project runs in a simple PHP server with PHP 7+, it doesn't require any special configuration or initial setup, just start PHP Server

1. Start the PHP Server
2. Google Maps Key associated to the project are allowed in localhost with the next ports: 80,88,8080,8088
3. Open the file index.php located in root directory
4. Choose any state in Mexico to see the available stories
4. The project will redirect to the stories.php file with the information of the selected state in Mexico
5. The stories will show up as a ghost walking around the map
6. Click on the ghost icon that represent each story to open a dialog
7. Read, listen or watch the video with an original adaptation of the horror story
8. Close the dialog to choose another story

All the stories information and files are on data directory, each subdirectory represents a state of Mexico.
* leyendas.csv
* leyendas.json
* [story].geojson
* [story].kml


### Who do I talk to? ###

* Juan Francisco Gerardo Hernandez (j.francisco.gerardo.hernandez@gmail.com)
