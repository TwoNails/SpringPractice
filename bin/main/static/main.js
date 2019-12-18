	// used to store data received from our API
	var listeRoles = [];								// stores the roles, is called immediately
	var listeClasses = [];								// stores the classes, is called immediately
	var listeBonus = [0, 0, 0, 0, 0, 0];				// stores the bonus for a given role, is called when the user select a role
	var statsRolls = [];								// stores the stat values, is called when the user decides to roll his stats
	var charObjToSave = {};								// stores the 
	
	// used to store data about the currently built character
	var currentRole = "";
	var currentClasse = "";
	var selectedValue = 0;



	// tools to deal with stat attributions
	var defaultValue = 10;

	var stat1attributed = 0, // will be treated as false later on
		stat2attributed = 0, 
		stat3attributed = 0, 
		stat4attributed = 0, 
		stat5attributed = 0, 
		stat6attributed = 0;
	
	var dropdownAllocation;

	for(let i = 0, c = 6 ; i<c ; i++){
		dropdownAllocation = document.getElementsByClassName("dropdownAllStats")[i];

		var allocateStr = document.createElement("button"), 
			allocateDex = document.createElement("button"),
			allocateSta = document.createElement("button"),
			allocateInt = document.createElement("button"),
			allocateWis = document.createElement("button"),
			allocateCha = document.createElement("button");

		allocateStr.textContent = "Strength";
		allocateStr.className = "dropdown-item";
		allocateStr.type = "button";	
		allocateStr.addEventListener("click", function(e){		updateSelectedValue(e);
																allocate("Strength");});
		
		allocateDex.textContent = "Dexterity";
		allocateDex.className = "dropdown-item";
		allocateDex.type = "button";
		allocateDex.addEventListener("click", function(e){		updateSelectedValue(e);
																allocate("Dexterity");});
		
		allocateSta.textContent = "Stamina";
		allocateSta.className = "dropdown-item";
		allocateSta.type = "button";
		allocateSta.addEventListener("click", function(e){		updateSelectedValue(e);
																allocate("Stamina");});
		
		allocateInt.textContent = "Intelligence";
		allocateInt.className = "dropdown-item";
		allocateInt.type = "button";
		allocateInt.addEventListener("click", function(e){		updateSelectedValue(e);
																allocate("Intelligence");});
		
		allocateWis.textContent = "Wisdom";
		allocateWis.className = "dropdown-item";
		allocateWis.type = "button";
		allocateWis.addEventListener("click", function(e){		updateSelectedValue(e);
																allocate("Wisdom");});
		
		allocateCha.textContent = "Charisma";
		allocateCha.className = "dropdown-item";
		allocateCha.type = "button";
		allocateCha.addEventListener("click", function(e){		updateSelectedValue(e);
																allocate("Charisma");});
		
		dropdownAllocation.appendChild(allocateStr);
		dropdownAllocation.appendChild(allocateDex);
		dropdownAllocation.appendChild(allocateSta);
		dropdownAllocation.appendChild(allocateInt);
		dropdownAllocation.appendChild(allocateWis);
		dropdownAllocation.appendChild(allocateCha);
	}

	function updateSelectedValue(event){
		console.log("method supposed to launch has launched");

		console.log("value we're about to store in selectedValue : " + event.target.parentNode.parentNode.getElementsByClassName("rdmStat")[0].textContent);
		selectedValue = event.target.parentNode.parentNode.getElementsByClassName("rdmStat")[0].textContent;
	}
	
	// change the innerText of the statAttribute span (situated under the Allocated stats text on the page)
	function allocate(stat){		
		switch(stat){
			case "Strength" : 
				document.getElementById("strAttribute").textContent = selectedValue;
			break;
			case "Dexterity" : 
				document.getElementById("dexAttribute").textContent = selectedValue;
			break;
			case "Stamina" : 
				document.getElementById("staAttribute").textContent = selectedValue;
			break;
			case "Intelligence" : 
				document.getElementById("intAttribute").textContent = selectedValue;
			break;
			case "Wisdom" : 
				document.getElementById("wisAttribute").textContent = selectedValue;
			break;
			case "Charisma" : 
				document.getElementById("chaAttribute").textContent = selectedValue;
			break;
			default :
			break;
		}

		updateTotals();
		updateModifiers();
		updateHp();
		updateDef();
	} 
	document.getElementById("goStats").addEventListener("click", rollStats);

	function rollStats(){
		$.ajax({
			url: "http://localhost:8080/herobuilder/throwdices"
		  }).then(function (data) {
			statsRolls = data;
		  }).then(displayStats);
	}

	function displayStats(){
		document.getElementById("rdmStat1").textContent = addZeroFirstDigit(statsRolls[0]+'');
		document.getElementById("rdmStat2").textContent = addZeroFirstDigit(statsRolls[1]+'');
		document.getElementById("rdmStat3").textContent = addZeroFirstDigit(statsRolls[2]+'');
		document.getElementById("rdmStat4").textContent = addZeroFirstDigit(statsRolls[3]+'');
		document.getElementById("rdmStat5").textContent = addZeroFirstDigit(statsRolls[4]+'');
		document.getElementById("rdmStat6").textContent = addZeroFirstDigit(statsRolls[5]+'');
	}

	function addZeroFirstDigit(intToString){
		if(intToString.length == 1){
			intToString = "0" + intToString;
		}
		return intToString
	}
	

	// calls the about endpoint, which send back simple String
	$.ajax({
		url: "http://localhost:8080/herobuilder/about"
	  }).then(function (data) {
		  currentHeader = data;
		  displayHeader(currentHeader);
	  });

	// display the results in the header
	function displayHeader(someText){
		document.getElementById("headercontent").innerHTML = someText;
	}

	// calls the getroles endpoint, which send back a list of Strings each representing one of the roles of the game.
	$.ajax({
	  url: "http://localhost:8080/herobuilder/getroles"
	}).then(function (data) {
		listeRoles = data;
	  	chargerMenuRoles();
	});
	
	// fills the matching dropdown. 
	function chargerMenuRoles() {
		listeRoles.forEach(function (item) {
		    var newDroplistItem = document.createElement("button");
		    newDroplistItem.className = "dropdown-item";
		    newDroplistItem.type = "button";
		    newDroplistItem.textContent = item;
		    newDroplistItem.addEventListener("click", function(event){updateRoleRelated(event);});  	    
		    document.getElementById("dropdownRolesButton").appendChild(newDroplistItem);
		});
	}
	
	// calls the getclasses endpoint, which send back a list of Strings each representing one of the classes of the game.
	$.ajax({
		url: "http://localhost:8080/herobuilder/getclasses"
	  }).then(function (data) {
		  listeClasses = data;
		chargerMenuClasses();
	  });
	  
	// fills the matching dropdown. 
	  function chargerMenuClasses() {
		  listeClasses.forEach(function (item) {
		  var newDroplistItem = document.createElement("button");
		  newDroplistItem.className = "dropdown-item";
		  newDroplistItem.type = "button";
		  newDroplistItem.textContent = item;
		  newDroplistItem.addEventListener("click", function(event){updateClasseRelated(event);});  
		  document.getElementById("dropdownClassesButton").appendChild(newDroplistItem);
		});
	  }

	// UPDATE FUNCTIONS ------------------------------------------------------------------------------------------------------------------------------------------------------------------
	  
	  // 1. Role update functions
	  
	function updateRoleRelated(e){
		if(currentRole!=e.target.innerText){
			currentRole = e.target.innerText;
			updateRoleCard();
			searchBonus();		// will call update Bonus and all the subsquent update functions
		}
	}
	
	function updateRoleCard() {		
	  let cardTitle = document.getElementById("titreRole");
	  let cardBody = document.getElementById("dataRole");

	  cardTitle.innerHTML = '<span class="font-weight-bold">' + currentRole + "</span>";
	  
		switch(currentRole){
			case "Human" :
				cardBody.innerHTML = '<img src="img/rolepics/roleHuman.png" class="card-img-top" alt="">'
				break;
			case "Halfling" :
				cardBody.innerHTML = '<img src="img/rolepics/roleHalfling.png" class="card-img-top" alt="">'
				break;
			case "Gnome" :
				cardBody.innerHTML = '<img src="img/rolepics/roleGnome.png" class="card-img-top" alt="">'
				break;
			case "Half-Orc" :
				cardBody.innerHTML = '<img src="img/rolepics/roleHalforc.png" class="card-img-top" alt="">'
				break;
			case "Dwarf" :
				cardBody.innerHTML = '<img src="img/rolepics/roleDwarf.png" class="card-img-top" alt="">'
				break;
			case "Half-Elf" :
				cardBody.innerHTML = '<img src="img/rolepics/roleHalfelf.png" class="card-img-top" alt="">'
				break;
			case "Elf" :
				cardBody.innerHTML = '<img src="img/rolepics/roleElf.png" class="card-img-top" alt="">'
				break;
			default :
				cardBody.innerHTML = '<img src="img/rolepics/default.png" class="card-img-top" alt="">'
				break;
	  	}	  
	}
	
	function updateBonus(){

		document.getElementById("strBonus").textContent = addPlus(listeBonus[0]);
		document.getElementById("dexBonus").textContent = addPlus(listeBonus[1]);
		document.getElementById("staBonus").textContent = addPlus(listeBonus[2]);
		document.getElementById("intBonus").textContent = addPlus(listeBonus[3]);
		document.getElementById("wisBonus").textContent = addPlus(listeBonus[4]);
		document.getElementById("chaBonus").textContent = addPlus(listeBonus[5]);
		
		updateTotals();
	}
	
	function addPlus(bonus){
		if(bonus > 0){
			bonus = "+" + bonus;
		}
		return bonus
	}

	function updateTotals(){

		document.getElementById("strTotal").textContent = parseInt(document.getElementById("strAttribute").textContent) + parseInt(document.getElementById("strBonus").textContent);
		document.getElementById("dexTotal").textContent = parseInt(document.getElementById("dexAttribute").textContent) + parseInt(document.getElementById("dexBonus").textContent);
		document.getElementById("staTotal").textContent = parseInt(document.getElementById("staAttribute").textContent) + parseInt(document.getElementById("staBonus").textContent);
		document.getElementById("intTotal").textContent = parseInt(document.getElementById("intAttribute").textContent) + parseInt(document.getElementById("intBonus").textContent);
		document.getElementById("wisTotal").textContent = parseInt(document.getElementById("wisAttribute").textContent) + parseInt(document.getElementById("wisBonus").textContent);
		document.getElementById("chaTotal").textContent = parseInt(document.getElementById("chaAttribute").textContent) + parseInt(document.getElementById("chaBonus").textContent);
	}

	function removePreviousBonusFromTotal(){

		document.getElementById("strTotal").textContent = parseInt(document.getElementById("strTotal").textContent) - listeBonus[0];
		document.getElementById("dexTotal").textContent = parseInt(document.getElementById("dexTotal").textContent) - listeBonus[1];
		document.getElementById("staTotal").textContent = parseInt(document.getElementById("staTotal").textContent) - listeBonus[2];
		document.getElementById("intTotal").textContent = parseInt(document.getElementById("intTotal").textContent) - listeBonus[3];
		document.getElementById("wisTotal").textContent = parseInt(document.getElementById("wisTotal").textContent) - listeBonus[4];
		document.getElementById("chaTotal").textContent = parseInt(document.getElementById("chaTotal").textContent) - listeBonus[5];
	}
	
	function searchBonus(){
		removePreviousBonusFromTotal();
		let classeId = "";
		
		switch(currentRole){
			case "Human" : classeId = 1;
				break;
			case "Halfling" : classeId = 2;
				break;
			case "Gnome" : classeId = 3;
				break;
			case "Half-Orc" : classeId = 4;
				break;
			case "Dwarf" : classeId = 5;
				break;
			case "Half-Elf" : classeId = 6;
				break;
			case "Elf" : classeId = 7;
				break;
			default :
				break;
	  	}
		
		urlBonus = "http://localhost:8080/herobuilder/getbonus?id=" + classeId;
		console.log("url called : " + urlBonus);
		$.ajax({
			url: urlBonus
		  }).then(function (data) {
			  listeBonus = data;
		  }).then(updateBonus).then(updateModifiers).then(updateHp).then(updateDef);
	}
	
	// 2. Classe update functions
	  
	function updateClasseRelated(e){
		currentClasse = e.target.innerText;
		updateClasseCard();
		updateHp();
		//updateDef();
	}
	
	function updateClasseCard() {		
		  let cardTitle = document.getElementById("titreClasse");
		  let cardBody = document.getElementById("dataClasse");

		  cardTitle.innerHTML = '<span class="font-weight-bold">' + currentClasse + "</span>";
		  
			switch(currentClasse){
				case "Barbarian" :
					// cardBody.innerHTML = '<div class="humanPic"></div>'; (see style.css) not working trying something else
					cardBody.innerHTML = '<img src="img/classepics/classBarbarian.jpg" class="card-img-top" alt="">'
					break;
				case "Bard" :
					cardBody.innerHTML = '<img src="img/classepics/classBard.jpg" class="card-img-top" alt="">'
					break;
				case "Cleric" :
					cardBody.innerHTML = '<img src="img/classepics/classCleric.jpg" class="card-img-top" alt="">'
					break;
				case "Druid" :
					cardBody.innerHTML = '<img src="img/classepics/classDruid.jpg" class="card-img-top" alt="">'
					break;
				case "Monk" :
					cardBody.innerHTML = '<img src="img/classepics/classMonk.jpg" class="card-img-top" alt="">'
					break;
				case "Paladin" :
					cardBody.innerHTML = '<img src="img/classepics/classPaladin.jpg" class="card-img-top" alt="">'
					break;
				case "Ranger" :
					cardBody.innerHTML = '<img src="img/classepics/classRanger.jpg" class="card-img-top" alt="">'
					break;
				case "Rogue" :
					cardBody.innerHTML = '<img src="img/classepics/classRogue.jpg" class="card-img-top" alt="">'
					break;
				case "Sorcerer" :
					cardBody.innerHTML = '<img src="img/classepics/classSorcerer.jpg" class="card-img-top" alt="">'
					break;
				case "Warrior" :
					cardBody.innerHTML = '<img src="img/classepics/classWarrior.jpg" class="card-img-top" alt="">'
					break;
				case "Wizard" :
					cardBody.innerHTML = '<img src="img/classepics/classWizard.jpg" class="card-img-top" alt="">'
					break;
				default :
					cardBody.innerHTML = '<img src="img/classepics/default.png" class="card-img-top" alt="">'
					break;
		  	}	  
		}

		// update modifiers

				/* 	addPlus concatenes a '+' text symbol if the value of the expression is strictly positive
					getModFromStat converts a stat into its corresponding modifier [ Math.floor((stat-10)/2) ]
				*/
		function updateModifiers(){

			document.getElementById("strModifier").textContent = addPlus(getModFromStat(parseInt(document.getElementById("strTotal").textContent))); 
			document.getElementById("dexModifier").textContent = addPlus(getModFromStat(parseInt(document.getElementById("dexTotal").textContent)));
			document.getElementById("staModifier").textContent = addPlus(getModFromStat(parseInt(document.getElementById("staTotal").textContent)));
			document.getElementById("intModifier").textContent = addPlus(getModFromStat(parseInt(document.getElementById("intTotal").textContent)));
			document.getElementById("wisModifier").textContent = addPlus(getModFromStat(parseInt(document.getElementById("wisTotal").textContent)));
			document.getElementById("chaModifier").textContent = addPlus(getModFromStat(parseInt(document.getElementById("chaTotal").textContent)));
		}

		function getModFromStat(stat){
			return Math.floor((stat-10)/2);
		}

		// update HP & Def

		function updateHp(){
			console.log("updateHP called with currentClasse = " + currentClasse + " and staModifier = " + document.getElementById("staModifier").textContent);
			console.log("staModifier parseInted is equal to " + parseInt(document.getElementById("staModifier").textContent));
			let baseHp = 0;
			switch(currentClasse){
				case "Sorcerer" :
				case "Wizard" :
					baseHp = 4;
				break;
				case "Bard" :
				case "Rogue" :
					baseHp = 6;
				break;
				case "Cleric" :
				case "Druid" :
				case "Monk" :
				case "Ranger" :
					baseHp = 8;
				break;
				case "Warrior" :
				case "Paladin" :
					baseHp = 10;
				break;
				case "Barbarian" :
					baseHp = 12;
				break;
				default :
					baseHp = 6;
				break;
		  	}
			document.getElementById("hpField").textContent = (baseHp + parseInt(document.getElementById("staModifier").textContent));
		}

		function updateDef(){
			// alert("function updateDef called !");
			let baseDef = 10;	
			document.getElementById("defField").textContent = (baseDef + parseInt(document.getElementById("dexModifier").textContent));
		}



		// AUTOFILL REQUEST

		document.getElementById("autofillButton").addEventListener("click", autofillRequest);


		function autofillRequest(){
			let isIdOk = function(){
				if(document.getElementById("inputId").value==""){
					alert("Please make sure you entered an ID")
					return false
				}
				return true;
			};

			if(isIdOk()){
				urlCharByID = "http://localhost:8080/herobuilder/characterautofill?id=" + document.getElementById("inputId").value;

				$.ajax({
					url: urlCharByID
				  }).then(function (data) {
					
					  console.log("data received ! Building a " + data["roleName"] + " " +data["classe"]);

					  currentRole = data["roleName"];
					  currentClasse = data["classe"];
					  updateRoleCard();
					  updateClasseCard();
					  listeBonus[0] = data["species"][streMod];
					  listeBonus[1] = data["species"][dextMod];
					  listeBonus[2] = data["species"][stamMod];
					  listeBonus[3] = data["species"][intlMod];
					  listeBonus[4] = data["species"][wisdMod];
					  listeBonus[5] = data["species"][chsmMod];

				  }).fail(errorTreatment).then(updateBonus).then(updateModifiers).then(updateHp).then(updateDef);		// then(updateBonus).then(updateModifiers).then(updateHp).then(updateDef);
			}
		}

		function errorTreatment(){
			alert("There is no Character with this ID currently on the database");
		}

		// SAVE CHARACTER POST REQUEST

		// I'm not really proud of this one ended up - sending all the parameters one by one instead of sending a serialized object
		// But I was getting desesperate so I was happy this solution worked.

		document.getElementById("saveCharButton").addEventListener("click", function(){
			if(currentRole==""||currentClasse==""){
				alert("Select at least a role and a class before saving your character");
			} else {
				saveCharacter();
			}
		});

		function saveCharacter(){

			let currentStr = parseInt(document.getElementById("strTotal").textContent);
			let currentDex = parseInt(document.getElementById("strTotal").textContent);
			let currentSta = parseInt(document.getElementById("strTotal").textContent);
			let currentInt = parseInt(document.getElementById("strTotal").textContent);
			let currentWis = parseInt(document.getElementById("strTotal").textContent);
			let currentCha = parseInt(document.getElementById("strTotal").textContent);

			$.post("http://localhost:8080/herobuilder/addcharacter", {
				roleName : currentRole,
				classe : currentClasse,
				strData : currentStr,
				dexData : currentDex,
				staData : currentSta,
				intData : currentInt,
				wisData : currentWis,
				chaData	: currentCha
			});
				
		}





