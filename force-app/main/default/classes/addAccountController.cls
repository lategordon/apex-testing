public with sharing class addAccountController {
    public addAccountController() {
        

    }

    @AuraEnabled
        public static void addAcct(Account objAccount){
            insert objAccount;
        }
}
