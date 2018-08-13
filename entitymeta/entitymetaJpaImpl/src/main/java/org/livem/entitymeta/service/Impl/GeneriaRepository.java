package org.livem.entitymeta.service.Impl;

import org.livem.dao.Query2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface GeneriaRepository<T,ID> extends JpaRepository<T,ID>{
  public Page<T> findByQuery(Query2 query, Pageable page);
  
  public Object findOneByQuery(Query2 query);
  
   
}
