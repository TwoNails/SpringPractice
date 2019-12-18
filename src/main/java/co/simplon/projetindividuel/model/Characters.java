package co.simplon.projetindividuel.model;

import java.util.List;

import co.simplon.projetindividuel.controller.CharacterBuilderController;

public class Characters {
	
	private int id;

	private Role role;
	private String roleName;
	private String classe;
	
	private int stre, dext, stam, intl, wisd, chsm;		// entered as args for the constructor : primary stats
	
	private int hp, def; 								// calculated, based on the species and the primary stats
	
	public Characters(Role role, String classe, List<Integer> stats) {
		
		this.id = CharacterBuilderController.playableCharacterIdCount++ ;
		
		this.role = role;
		this.roleName = this.role.getName();
		this.classe = classe;
		
		this.stre = stats.get(0) + role.getStreMod();
		this.dext = stats.get(1) + role.getDextMod();
		this.stam = stats.get(2) + role.getStamMod();
		this.intl = stats.get(3) + role.getIntlMod();
		this.wisd = stats.get(4) + role.getWisdMod();
		this.chsm = stats.get(5) + role.getChsmMod();
		
		switch(classe) {
		case "Sorcerer" :
		case "Wizard" :
			this.hp = 4 + getMod(stre);
			break;
		case "Bard" :
		case "Rogue" :
			this.hp = 6 + getMod(stre);
			break;
		case "Cleric" :
		case "Druid" :
		case "Monk" :
		case "Ranger" :
			this.hp = 8 + getMod(stre);
			break;
		case "Warrior" :
		case "Paladin" :
			this.hp = 10 + getMod(stre);
		case "Barabrian" :
			this.hp = 12 + getMod(stre);
		}
		
		this.def = 10 + getMod(dext);
	}


	public Role getSpecies() {
		return role;
	}

	public int getStre() {
		return stre;
	}

	public int getDext() {
		return dext;
	}

	public int getStam() {
		return stam;
	}

	public int getIntl() {
		return intl;
	}

	public int getWisd() {
		return wisd;
	}

	public int getChsm() {
		return chsm;
	}


	public String getClasse() {
		return classe;
	}


	public int getDef() {
		return def;
	}

	public int getHp() {
		return hp;
	}

	public String getRoleName() {
		return roleName;
	}	
	
	private int getMod(int statValue) {	
		return (int) Math.floor((statValue - 10) / 2);
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}
	
}
