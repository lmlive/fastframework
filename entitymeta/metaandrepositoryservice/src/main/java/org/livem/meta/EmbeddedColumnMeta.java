package org.livem.meta;

import java.util.List;

public class EmbeddedColumnMeta extends  ColumnMeta{
    private List<ColumnMeta> subColumns;

    public List<ColumnMeta> getSubColumns() {
        return subColumns;
    }

    public void setSubColumns(List<ColumnMeta> subColumns) {
        this.subColumns = subColumns;
    }
}
