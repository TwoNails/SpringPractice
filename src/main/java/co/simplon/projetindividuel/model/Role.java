package co.simplon.projetindividuel.model;

import co.simplon.projetindividuel.controller.CharacterBuilderController;

public class Role {
	private int id;
	private String name;
	
	private int streMod, dextMod, stamMod, intlMod, wisdMod, chsmMod;
	
	
	public Role(String name, int streMod, int dextMod, int stamMod, int intlMod, int wisdMod, int chsmMod) {
		this.id = 1 + CharacterBuilderController.rolesIdCount++ ;
		
		this.name= name;
		this.streMod = streMod;
		this.dextMod = dextMod;
		this.stamMod = stamMod;
		this.intlMod = intlMod;
		this.wisdMod = wisdMod;
		this.chsmMod = chsmMod;
	}

	public int getStreMod() {
		return streMod;
	}

	public int getDextMod() {
		return dextMod;
	}

	public int getStamMod() {
		return stamMod;
	}

	public int getIntlMod() {
		return intlMod;
	}

	public int getWisdMod() {
		return wisdMod;
	}

	public int getChsmMod() {
		return chsmMod;
	}

	public String getName() {
		return name;
	}

	public int getId() {
		return id;
	}
	
	
}
