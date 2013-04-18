package server.shared;

import java.util.HashMap;
import java.util.Map;

public class Tutorials {
	private Map<String, String> tutorials;
	public Tutorials(int num){
		tutorials=new HashMap<String,String>(num);
	}
	
	public void insert(String path, String name){
		tutorials.put(name, path);
	}
	
	public Map<String,String> getTutorials(){
		return tutorials;
	}
	
}
