export const UpdateQuery = {
    updateFromAmount: `update account set amount=:FromAmount where accountid=:FromAccountId`,
    updateToAmount:`update account set amount=:ToAmount where accountid=:ToAccountId;`

};