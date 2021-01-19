export const InsertQuery = {
    createCustomer: `Insert into customer (CustomerName,CustomerInitial,WithInBank,CreatedOn) values
    (:CustomerName,:CustomerInitial,:WithInBank,now())`,
    createAccount: `Insert into account (CustomerId,Amount,WithInBank,CreatedOn) values
    (:CustomerId,:Amount,:WithInBank,now())`,
    createTransactionHistory: `Insert into history (AccountId,FromAccountId,ToAccount,Credited,Debitted,CreatedOn) values 
    (:AccountId,:FromAccountId,:ToAccount,:Credited,:Debitted,now())`,

} 