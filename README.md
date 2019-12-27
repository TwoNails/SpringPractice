# Spring Boot Practice Project #

A school project where the goal was to have our first full stack webpage / small app. Database was optionnal this time. Considering I went for something slightly richer in term of features than what was asked as deliverables, I opted not to do one.

I went for a Character Builder Tool for the old - but gold - D&D 3.5

The user can select from 7 roles (races) and 11 classes, roll some dices to get 6 values to allocate to its different stats and see everything automatically updated.

He can then send his character to the API, where it'll be stored on a List.
The user also have the option to autofill every field to use one of our pre-built characters as its own (he still has to come up with a cool name for his guy though).

## Front End ##

index.html, style.css and main.js are the only front-end files.

Most of the styling is done through boostrap classes. There's a lot of elements though so even with the help of its classes the responsiveness is unsatisfying and definitely needs further tweaking.

In this project main.js is actually quite substantial. Even if I left the back end deal with the - actually pretty light - calculations, the fact that many HTML elements have to be updated, and in a specific order, whenever the user changes a single parameter, requires the use of several update functions.

#### What it looks like : ####

![alt-text](https://i.imgur.com/W9wvdJx.png)

## Back End ##

The back end of the project is essentially a REST API, with the database simulated (everything is stored on Lists inside the controller). JDBC would have been an option if I had cut a couple of features to have the time to work on it.

###### controller package | 1 file ######
- CharacterBuilderController.java

###### model package | 1 folder, 2 files ######
- package dto (data transfer objects) 

I ended up not using it, even though at some point it worked, some errors elsewhere in the code made me try another way that did work.
- Characters.java
- Role.java

#### Endpoints ####

The controller address is /herobuilder.

Its constructor builds 3 fake databases. One of them stores the playable roles (DnD races) as Objects.

- ###### /about : returns a couple of sentences as a String. ###### 
- ###### /getroles : returns a list of String, one for each role stored in the pseudo database. ######
- ###### /getclasses : return a list of String, one for each classe stored in the pseudo database. ######
- ###### /getbonus (RequestParam id, the id of a role) : return a list of integers, representing the bonus/malus to stats offered by a given role. ######
- ###### /characterautofill (RequestParam id, the id of a Character): return a serialized Character Java Object. ######
- ###### /addcharacter (Request 8 (ugh...) parameters) : stores a new Character in the fake database. The latest and only successfull experiment, which excuses its clumsyness, hopefully. I initally designed endpoints using RequestBody and failed. Time ticking pushed me towards less elegant solutions. ######
- ###### /throwdices : returns a list of 6 integers representing each the result a throwing 4 dices and keeping the 3 best results. ######
	
### What I would like to do ###

I'd really like to have a toggle option to select a female character.

Other than that, having more rules of the game plugged into the API would be the next logical step. The Players Rule Book is just gigantic and having everything listed on a single webpage would be awesome. 
Something essential would be an equipment and skills section. Gifts and spells would also be a nice plus.

Working on the esthetics, and on the responsivity, especially for phone screens (as of right now it's completely broken).

And it would be better if this project used an actual database.
	
	

