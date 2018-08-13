package org.livem.meta;

public class PickUiMeta extends BaseUiMeta {
	private String pickEntityShortName;
	private Class<?> pickEntityType;

	private boolean multiPick=false;
	
	public boolean isMultiPick() {
		return multiPick;
	}
	public void setMultiPick(boolean multiPick) {
		this.multiPick = multiPick;
	}
	
	 public String getPickEntityShortName() {
		return pickEntityShortName;
	}
	 public void setPickEntityShortName(String pickEntityShortName) {
		this.pickEntityShortName = pickEntityShortName;
	}

	public Class<?> getPickEntityType() {
		return pickEntityType;
	}

	public void setPickEntityType(Class<?> pickEntityType) {
		this.pickEntityType = pickEntityType;
	}

}
