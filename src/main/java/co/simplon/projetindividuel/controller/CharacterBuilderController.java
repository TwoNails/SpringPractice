package co.simplon.projetindividuel.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.simplon.projetindividuel.model.Characters;
// import co.simplon.projetindividuel.model.Faction;
import co.simplon.projetindividuel.model.Role;
import co.simplon.projetindividuel.model.dto.CharacterDTO;


@RestController
@RequestMapping("/herobuilder")
public class CharacterBuilderController {
	
	public static int rolesIdCount;
	public static int classesIdCount;
	public static int playableCharacterIdCount;
	private List<Role> fakeDatabaseAllRoles;
	private List<String> fakeDatabaseAllClasses;
	private List<Characters> fakeDatabaseSavedCharacters;
	
	// 
	private List<Integer> modifiers = new ArrayList<Integer>();
	
	public CharacterBuilderController() {
		rolesIdCount = 0;
		classesIdCount = 0;
		playableCharacterIdCount = 0;
		
		fakeDatabaseAllRoles = (Arrays.asList(new Role("Human", 0, 0, 0, 0, 0, 0),
												new Role("Halfling", -2, 2, 0, 0, 0, 0),
												new Role("Gnome", -2, 0, 2, 0, 0, 0),
												new Role("Half-Orc", 2, 0, 0, 0, -2, -2),
												new Role("Dwarf", 0, 0, 2, 0, 0, -2),
												new Role("Half-Elf", 0, 0, 0, 0, 0, 0),
												new Role("Elf", 0, 2, -2, 0, 0, 0)));  

		fakeDatabaseAllClasses = Arrays.asList("Barbarian", "Bard", "Cleric", "Druid", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warrior", "Wizard");
		
		
		fakeDatabaseSavedCharacters = 
			new ArrayList<Characters>(Arrays.asList(new Characters(fakeDatabaseAllRoles.get(0), fakeDatabaseAllClasses.get(7), Arrays.asList(11, 14, 12, 13, 13, 14)),
													new Characters(fakeDatabaseAllRoles.get(0), fakeDatabaseAllClasses.get(6), Arrays.asList(15, 11, 12, 10, 13, 8)),
													new Characters(fakeDatabaseAllRoles.get(1), fakeDatabaseAllClasses.get(2), Arrays.asList(9, 14, 10, 12, 13, 15)),
													new Characters(fakeDatabaseAllRoles.get(1), fakeDatabaseAllClasses.get(7), Arrays.asList(11, 14, 12, 13, 13, 14)),
													new Characters(fakeDatabaseAllRoles.get(2), fakeDatabaseAllClasses.get(7), Arrays.asList(11, 14, 12, 13, 13, 14)),
													new Characters(fakeDatabaseAllRoles.get(2), fakeDatabaseAllClasses.get(7), Arrays.asList(11, 14, 12, 13, 13, 14)),
													new Characters(fakeDatabaseAllRoles.get(3), fakeDatabaseAllClasses.get(7), Arrays.asList(11, 14, 12, 13, 13, 14)),
													new Characters(fakeDatabaseAllRoles.get(3), fakeDatabaseAllClasses.get(7), Arrays.asList(11, 14, 12, 13, 13, 14)),
													new Characters(fakeDatabaseAllRoles.get(4), fakeDatabaseAllClasses.get(7), Arrays.asList(11, 14, 12, 13, 13, 14)),
													new Characters(fakeDatabaseAllRoles.get(5), fakeDatabaseAllClasses.get(7), Arrays.asList(11, 14, 12, 13, 13, 14)),
													new Characters(fakeDatabaseAllRoles.get(6), fakeDatabaseAllClasses.get(7), Arrays.asList(11, 14, 12, 13, 13, 14)),
													new Characters(fakeDatabaseAllRoles.get(6), fakeDatabaseAllClasses.get(7), Arrays.asList(11, 14, 12, 13, 13, 14)),
													new Characters(fakeDatabaseAllRoles.get(0), fakeDatabaseAllClasses.get(7), Arrays.asList(11, 14, 12, 13, 13, 14))));
												}
	
	@RequestMapping("/about")
	public String aboutThisPage() {
		return "This website allows you to easily build your own DnD 3.5 Character. Short on time ? Use one of our pre-existing Characters !";
	}
	
	@RequestMapping("/getroles")
	public List<String> getRoles(){
		List<String> species = new ArrayList<String>();
		for (Role spc : fakeDatabaseAllRoles) {
			species.add(spc.getName());
		}
		return species;
	}

	@RequestMapping("/getbonus")
	public List<Integer> getBonus(@RequestParam int id) {		 // TODO change all these attributes to a single List
		for (Role role : fakeDatabaseAllRoles) {
			if(role.getId() == id) {
				modifiers.clear();
				modifiers.add(role.getStreMod());
				modifiers.add(role.getDextMod());
				modifiers.add(role.getStamMod());
				modifiers.add(role.getIntlMod());
				modifiers.add(role.getWisdMod());
				modifiers.add(role.getChsmMod());
			}
		}
		return modifiers;
	}
	
	@RequestMapping("/getclasses")
	public List<String> getClasses(){
		List<String> classes = new ArrayList<String>();
		for (String str : fakeDatabaseAllClasses) {
			classes.add(str);
		}
		return classes;
	}	
	
	@RequestMapping("/characterautofill")
	public ResponseEntity<Characters> getCharStatsToFill(@RequestParam int id) {
		System.out.println("characterautofill called");
		if(id >= 0 && id < fakeDatabaseSavedCharacters.size()) {
			System.out.println("characterautofill success");
			return new ResponseEntity<Characters>(fakeDatabaseSavedCharacters.get(id), HttpStatus.OK);	
		} else {
			System.out.println("characterautofill failure");
			return new ResponseEntity<Characters>(HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(value = "/buildcharacter", method = RequestMethod.POST)
	public void updateCharDB(@RequestBody CharacterDTO charData){
		
		for (Role spe : fakeDatabaseAllRoles) {
			if(spe.getName().equals(charData.getRoleName())) {
				fakeDatabaseSavedCharacters.add(new Characters(spe, charData.getClasse(), charData.getAllStats()));
			}	
		}	
	}
	
	@PostMapping("/savecharacter")
	public ResponseEntity<HttpStatus> postController(
	  @RequestBody CharacterDTO chardto) {
		System.out.println(chardto.getClasse());
	  
		for (Role spe : fakeDatabaseAllRoles) {
			if(spe.getName().equals(chardto.getRoleName())) {
				fakeDatabaseSavedCharacters.add(new Characters(spe, chardto.getClasse(), chardto.getAllStats()));
			}	
		}
		System.out.println(fakeDatabaseSavedCharacters.get(fakeDatabaseSavedCharacters.size()).getClasse());
		
	    return ResponseEntity.ok(HttpStatus.CREATED);
	}
	
	@RequestMapping("/addcharacter")
	public ResponseEntity<HttpStatus> addCharacter( 	@RequestParam(value = "roleName") String role,
								@RequestParam(value = "classe") String classe,
								@RequestParam(value = "strData") Integer strData,
								@RequestParam(value = "dexData") Integer dexData,
								@RequestParam(value = "staData") Integer staStat,
								@RequestParam(value = "intData") Integer intData,
								@RequestParam(value = "wisData") Integer wisData,
								@RequestParam(value = "chaData") Integer chaData) {
		
		List<Integer> statData = Arrays.asList(strData, dexData, staStat, intData, wisData, chaData);
		for (Role spe : fakeDatabaseAllRoles) {
			if(spe.getName().equals(role)) {
				fakeDatabaseSavedCharacters.add(new Characters(spe, classe, statData));
			}	
		}
		return ResponseEntity.ok(HttpStatus.CREATED);			
	}
	
	
	@RequestMapping("/latestidadded")
	public int charDatabaseSize() {
		return fakeDatabaseSavedCharacters.size();
	}
	
	@RequestMapping("/throwdices")
	public List<Integer> stats(){
		List<Integer> dicesResults = new ArrayList<Integer>();	
		
		for(int i=0, c=6 ; i<c ; i++)
			dicesResults.add(oneStat());		
		return dicesResults;
	}
	
	private int oneStat() {
		List<Integer> throwOneStat =  new ArrayList<Integer>();
		for(int i=0, c=4 ; i<c ; i++) {
			throwOneStat.add(throwDice(6));
		}
		return trimThrow(throwOneStat);
	}
	
	
	/**
	 * Simulates a dice roll from the dice of your choice
	 * 
	 * @param faces nbr of faces on the dice
	 * @return result of the throw
	 */
	private int throwDice(int faces) {		// TODO : throw error when the nbr of faces is not coherant (5 or 7 faces for instance)
		return((int)((Math.random()*faces) +1)); 		// properly returns a number between 1 and 6 when called with 6 as arg.
			
	}
	
	/**
	 * Returns the sum of the List of Integers given as argument, minus the lower value found on the list.
	 * 
	 * @param throwToTrim an Array representing a certain amount of dices (n) thrown
	 * @return the sum of the (n-1) highest scoring dices
	 */
	private int trimThrow(List<Integer> throwToTrim) {
		int min = throwToTrim.get(0);
		int sum = 0;
		for (Integer intg : throwToTrim) {
			if(min > intg) {
				min = intg;
			}
			sum += intg;
		}	
		return sum-min;
	}
	
}
