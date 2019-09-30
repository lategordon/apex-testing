import { LightningElement, track, wire} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
//import { createRecord } from 'lightning/uiRecordApi';
//import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import addAcct from '@salesforce/apex/addAccountController.addAcct';

export default class PicklistValuesDemo extends LightningElement {
    @track value;

    @track acctRecord = {
        Name : ACCOUNT_NAME,
        Industry : INDUSTRY_FIELD
    };

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: INDUSTRY_FIELD})
    IndustryPicklistValues;

    handleNameChange(event) {
        this.acctRecord.Name = event.detail.value;
    }

    handleIndustryChange(event){
        this.acctRecord.Industry = event.detail.value;
    }

    createAccount() {
        addAcct({objAccount: this.accRecord})
    }
}