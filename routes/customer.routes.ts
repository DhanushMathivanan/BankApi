import {Request, Response} from "express";
import { CustomerController }  from '../controller/customer.controller';

export class Routes {
    public customerController:CustomerController = new CustomerController();
    public routes(app): void {
        app.route('/')
        .get((req: Request, res: Response)=>{
            res.status(200).send({
                message: 'GET request successfull!!!!'
            })
        });

        app.route('/customers').get(this.customerController.getCustomers);
        app.route('/customers').post(this.customerController.createCustomer);
        app.route('/account/transfer').post(this.customerController.transferAmount);
        app.route('/account/balance').post(this.customerController.getAccountBalance);
        app.route('/account/transactionHistory').post(this.customerController.getTransactionHistory);
    }
}
