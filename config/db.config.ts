import * as mysql from 'mysql';
import * as SqlConnection from 'sequelize';

 

export class SequelizeConfig {
    private sequelize: SqlConnection.Sequelize;
     public setConnection() {
        this.sequelize = new SqlConnection.Sequelize('bank', 'root', 'Bekool@321', {
                    host: 'localhost',
                    logging: true,
                    dialect: 'mysql'
                });
                console.log('Db Connected..................');
    }
    public getSequelize() {
        return this.sequelize;
    }
}
export const sequelize = new SequelizeConfig();


// export class DBConfig {

//     const dbConn = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'Bekool@321',
//         database: 'bank'
//     });
    
//     // dbConn.connect( function () {
//     //     if (err) throw err;
//     //         console.log("Database Connected");
//     // })
// }

