package org.livem.entitymeta.service.validation;

import org.livem.meta.Validation;

import java.util.Set;

public interface ValidationParser {
    Set<Validation> parserPerpertyValidation(javax.persistence.metamodel.Attribute attribute);
}
