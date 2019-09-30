/* eslint-disable no-console */
import { LightningElement, track, wire} from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import createAccount from '@salesforce/apex/createAcc.createAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AddAccount extends LightningElement {
    @track value;

    @track rec = {
        Name : NAME_FIELD,
        Industry : INDUSTRY_FIELD,
        Phone : PHONE_FIELD
    };

    @wire(getObjectInfo,  { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: INDUSTRY_FIELD})
    IndustryPicklistValues;

    handleNameChange(event) {
        this.rec.Name = event.detail.value;
        console.log("name1", this.rec.Name);
    }
    
    handleIndChange(event) {
        this.rec.Industry = event.detail.value;
        console.log("Industry",this.rec.industry);
    }
    
    handlePhnChange(event) {
        this.rec.Phone = event.detail.value;
        console.log("Phone", this.rec.Phone);
    }

    handleClick() {
        createAccount({ acc : this.rec })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if(this.message !== undefined) {
                    this.rec.Name = '';
                    this.rec.Industry = '';
                    this.rec.Phone = '';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Account created',
                            variant: 'success',
                        }),
                    );
                }
                
                console.log(JSON.stringify(result));
                console.log("result", this.message);
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
    }
}
