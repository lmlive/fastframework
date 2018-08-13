package org.livem.meta;

import java.util.List;
import java.util.Set;

public class BaseUiMeta {

    /**
     * 修改entity时候是否提供编辑界面
     */
    private boolean updateAble = true;
    /**
     * 新增entity时候界面是否提供录入
     */
    private boolean insertAble = true;

    /**
     * entity明细是否显示此字段
     */
    private boolean visable = true;
    /*
     * updateAble,insertAble 为false时候是否以只读形式显示
     * */
    private boolean disAsReadOnly = false;

    /**
     * ui 类型
     */
    private UIType uiType;
    /**
     * 验证属性
     */
    private Set<Validation> validMeta;

    public boolean isUpdateAble() {
        return updateAble;
    }

    public void setUpdateAble(boolean updateAble) {
        this.updateAble = updateAble;
    }

    public boolean isInsertAble() {
        return insertAble;
    }

    public void setInsertAble(boolean insertAble) {
        this.insertAble = insertAble;
    }

    public boolean isVisable() {
        return visable;
    }

    public void setVisable(boolean visable) {
        this.visable = visable;
    }


    public UIType getUiType() {
        return uiType;
    }

    public void setUiType(UIType uiType) {
        this.uiType = uiType;
    }

    public boolean isDisAsReadOnly() {
        return disAsReadOnly;
    }

    public void setDisAsReadOnly(boolean disAsReadOnly) {
        this.disAsReadOnly = disAsReadOnly;
    }

    public Set<Validation> getValidMeta() {
        return validMeta;
    }

    public void setValidMeta(Set<Validation> validMeta) {
        this.validMeta = validMeta;
    }
}
