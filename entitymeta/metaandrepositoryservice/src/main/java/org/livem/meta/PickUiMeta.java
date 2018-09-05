package org.livem.meta;

import java.util.List;

public class PickUiMeta extends BaseUiMeta {
	private String pickEntityShortName;
	private Class<?> pickEntityType;

	private List<String> pickColumns;

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

	public List<String> getPickColumns() {
		return pickColumns;
	}

	public void setPickColumns(List<String> pickColumns) {
		this.pickColumns = pickColumns;
	}
}
