package org.lm.testapp;

import org.hibernate.resource.transaction.backend.jdbc.internal.JdbcResourceLocalTransactionCoordinatorImpl;
import org.hibernate.resource.transaction.backend.jdbc.spi.JdbcResourceTransactionAccess;
import org.hibernate.resource.transaction.spi.TransactionCoordinatorBuilder;
import org.hibernate.resource.transaction.spi.TransactionCoordinatorOwner;

public class CustTransCoordinator extends JdbcResourceLocalTransactionCoordinatorImpl {
    CustTransCoordinator(TransactionCoordinatorBuilder transactionCoordinatorBuilder, TransactionCoordinatorOwner owner, JdbcResourceTransactionAccess jdbcResourceTransactionAccess) {
        super(transactionCoordinatorBuilder, owner, jdbcResourceTransactionAccess);
    }


}
