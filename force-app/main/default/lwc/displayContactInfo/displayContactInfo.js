import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const CONTACTFIELDS = [
    'Contact.Name',
    'Contact.Email',
    'Contact.Phone',
    'Contact.Title',
    'Contact.MobilePhone'
];

export default class DisplayContactInfo extends LightningElement {
    @api recordId;
    @wire(getRecord,{recordId: '$recordId', fields:CONTACTFIELDS})
    contact;

    get name(){
        return this.contact.data.fields.Name.value;
    }
    get email(){
        return this.contact.data.fields.Email.value;
    }
    get phone(){
        return this.contact.data.fields.Phone.value;
    }
    get title(){
        return this.contact.data.fields.Title.value;
    }
    get mobile(){
        return this.contact.data.fields.MobilePhone.value;
    }
}