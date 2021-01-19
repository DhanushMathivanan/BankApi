export const SelectQuery = {
    getCustomers: "Select * from customer",
    getAccountsByIds: `select account.AccountId, bank.account.Amount, bank.account.CustomerId,bank.customer.CustomerName from bank.account 
    join bank.customer on bank.customer.CustomerId =  bank.account.CustomerId
    where accountid in (:AccountIds)`,
    getAccountBalance: `select Amount from account where accountid= :AccountId`,
    getTransactionHistoryByAccount: `select AccountId,FromAccountId,ToAccount,Credited,Debitted,CreatedOn as Date from History where AccountId= :AccountId`,
}