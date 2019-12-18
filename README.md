# Spring Boot Practice Project #

#### Front End ####





#### Back End ####

###### controller package | 1 file ######
	- CharacterBuilderController.java

###### model package | 1 folder, 2 files ######
	- package dto (data transfer objects) 
	I ended up not using it, even though at some point it worked, some errors elsewhere in the code made me try another way that did work.
	- Characters.java
	- Role.java

##### Endpoints #####

The controller address is /herobuilder.

Its constructor builds 3 fake databases. One of them stores the playable roles (DnD races) as Objects.

	- /about : returns a couple of sentences as a String.
	- /getroles : returns a list of String, one for each role stored in the pseudo database.
	- /getclasses : return a list of String, one for each classe stored in the pseudo database.
	- /getbonus (RequestParam id, the id of a role) : return a list of integers, representing the bonus/malus to stats offered by a given role.
	- /characterautofill (RequestParam id, the id of a Character): return a serialized Character Java Object.
	- /addcharacter (Rquest 8 (ugh...) parameters) : stores a new Character in the fake database. The latest and only successfull experiment, which excuses its clumsyness, hopefully. I initally designed endpoints using RequestBody and failed. Time ticking pushed me towards less elegant solutions.
	- /throwdices : returns a list of 6 integers representing each the result a throwing 4 dices and keeping the 3 best results.
	
	

