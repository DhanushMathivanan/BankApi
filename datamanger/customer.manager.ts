import { AccessDeniedError } from 'sequelize/types';
import {ICustomer} from '../entities';
import { SqlMangaer } from '../helpers/sql.manager';
import {SelectQuery, InsertQuery, UpdateQuery} from '../queries';

export class CustomerManger {

    public async getCustomers() {
        const customers = await new SqlMangaer().Get(SelectQuery.getCustomers);
        return customers;
       
    }

    public async createCustomer(customer: ICustomer) {
          const customerCount = await new SqlMangaer().Insert(InsertQuery.createCustomer,customer);
          customer.CustomerId = customerCount[0];
          if(customer.WithInBank === false) {
            customer.Amount = null;
          }
          await new SqlMangaer().Insert(InsertQuery.createAccount,customer);
          return "Inserted";
    }

    public async transferAmount(AcocuntIds: any, Amount: number, WithInBank: boolean) {
        const customers = await new SqlMangaer().Get(SelectQuery.getAccountsByIds, {AccountIds: AcocuntIds});
        const fromAccountArray = customers.filter(ele => ele.AccountId === AcocuntIds[0]);
        const toAccountArray = customers.filter(ele => ele.AccountId === AcocuntIds[1]);
        if ( parseInt(fromAccountArray[0].Amount,0)<Amount) {
            return "Insufficient Fund";
        }else {
            const fromAmount = parseInt(fromAccountArray[0].Amount,0) - Amount;
            const toAmount = parseInt(toAccountArray[0].Amount,0) + Amount;
            await new SqlMangaer().Update(UpdateQuery.updateFromAmount, 
                {
                    FromAmount: fromAmount, 
                    FromAccountId: fromAccountArray[0].AccountId, 
                });
            await new SqlMangaer().Insert(InsertQuery.createTransactionHistory, {
                AccountId: fromAccountArray[0].AccountId,
                FromAccountId: fromAccountArray[0].AccountId,
                ToAccount: toAccountArray[0].AccountId,
                Credited: null,
                Debitted: Amount
            });
                if(WithInBank === true) {
                    await new SqlMangaer().Update(UpdateQuery.updateToAmount, 
                        {
                            ToAmount: toAmount, 
                            ToAccountId: toAccountArray[0].AccountId  
                        });
                    await new SqlMangaer().Insert(InsertQuery.createTransactionHistory, {
                        AccountId: toAccountArray[0].AccountId,
                        FromAccountId: fromAccountArray[0].AccountId,
                        ToAccount: null,
                        Credited: Amount,
                        Debitted: null
                    });
                }
            return "Transferred Successfully!!!!!";

        }
    }
    public async getAccountBalance (AccountId: number) {
        const balance =  await new SqlMangaer().Get(SelectQuery.getAccountBalance, {AccountId: AccountId });
        return balance;

    }
    public async getTransactionHistory (AccountId: number) {
        const history =  await new SqlMangaer().Get(SelectQuery.getTransactionHistoryByAccount, {AccountId: AccountId });
        return history;

    }

}