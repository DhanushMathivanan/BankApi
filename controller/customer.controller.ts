import { Request, Response } from 'express';
import { CustomerManger } from "../datamanger/customer.manager";
import { SqlMangaer } from '../helpers/sql.manager';

export class CustomerController{

public async getCustomers (req: Request, res: Response) {
    try{
        const customers = await new  CustomerManger().getCustomers();
        res.status(200).json(customers);
    }catch(err) {
        console.error(err);
    }
  
};

public async createCustomer(req: Request, res: Response) {
    try {
        if(req.body.Amount < 500 ) {
            res.status(400).json({message: "Initial Amount Should not be less than 500"});
            res.end();
           } else {
            const customer =  await new CustomerManger().createCustomer(req.body);
            res.status(200).json({message: "Customer Created Successfully!!!!"});
           }
    } catch(err) {
        console.error(err);
    }
    
}    

public async transferAmount(req: Request, res: Response) {
    try {
        const message = await new CustomerManger().transferAmount([req.body.FromAccount,req.body.ToAccount],req.body.AmountToTransfer,req.body.WithInBank);
        if (message === "Insufficient Fund") {
            res.status(400).json({message: "Insufficient Fund"});
        }else {
        res.status(200).json({message: "Transferred Successfully!!!!!"});
        }

    }catch(err) {
        console.error(err);
    }
}

public async getAccountBalance(req: Request, res: Response) {
    try{
        const balance = await new CustomerManger().getAccountBalance(req.body.AccountId);
        res.status(200).json({message: `Available Balance: ${balance[0].Amount}`});
    }catch(err){
        console.error(err);
    }
}
public async getTransactionHistory(req: Request, res: Response) {
    try{
        const history = await new CustomerManger().getTransactionHistory(req.body.AccountId);
        res.status(200).json(history);
    }catch(err){
        console.error(err);
    }
}

}
