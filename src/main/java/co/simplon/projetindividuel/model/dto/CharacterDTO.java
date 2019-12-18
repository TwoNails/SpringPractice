package co.simplon.projetindividuel.model.dto;

import java.util.List;

public class CharacterDTO {
	
	private String roleName;
	private String classe;
	private List<Integer> allStats;
	
	
	
	public CharacterDTO(String roleName, String classe, List<Integer> allStats) {
		this.roleName = roleName;
		this.classe = classe;
		this.allStats = allStats;
	}
	
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getClasse() {
		return classe;
	}
	public void setClasse(String classe) {
		this.classe = classe;
	}
	public List<Integer> getAllStats() {
		return allStats;
	}
	public void setAllStats(List<Integer> allStats) {
		this.allStats = allStats;
	}
	
	
}
