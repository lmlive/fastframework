package org.livem.dao;

import java.util.List;

public class Page<T> {
    private long  totalCount;
    private int pages;
    private int pageSize;
    private int pageNo;
    private List<T> list;

    public long  getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long  totalCount) {
        this.totalCount = totalCount;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }
}
