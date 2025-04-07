export class Transaction {
    id?: number;
    amount?: number;
    account?: string;
    description?: string;
    tags?: string[];
    type?: string;
    splits?: string[];
    splitsOwner?: string[];
    transactionMode?: string;
    audited?: string;
    category?: string;
    spendAt?: string;
    deleted?:boolean;
    disableForCharts?: boolean;
    createdDate?: number;

    getType(type:string){
        switch(type){
            case 'debit': return 'DEBIT';
            case 'spent': return 'DEBIT';
            case 'credit': return 'CREDIT';
            default: return '';
        }
    }

    getMode(type:string){
        switch(type){
            case 'upi': return 'UPI';
            case 'nift': return 'NIFT';
            case 'imps': return 'IMPS';
            default: if(type.includes('credit')){return 'CREDIT_CARD'}
                else if(type.includes('debit')){return 'DEBIT_CARD'}
                else {return ''}
        }
    }
 
    getCategory(type:string){

    }

    constructor(params:any){
        this.id = params?.id; 
        let cost = params?.price ? params?.price : params?.amount; 
        if(typeof cost === 'string'){
            cost = cost.replaceAll(',', '');
            try{
                const newCost = parseInt(cost)
                this.amount = newCost;
            }catch(e){}
        }else{
            this.amount = cost;
        }
        this.account = params?.account; 
        this.description = params?.description; 
        this.tags = params?.tags ? params?.tags : []; 
        this.type = params?.type ? this.getType(params.type.toLowerCase()) : '' 
        this.splits = params?.splits; 
        this.splitsOwner = params?.splitsOwner; 
        this.transactionMode = params?.mode ? this.getMode(params.mode.toLowerCase()) :params?.transactionMode; 
        this.audited = params?.audited; 
        this.category = params?.category; 
        this.spendAt = params?.spendAt; 
        this.deleted = params?.deleted;
        this.disableForCharts = params?.disableForCharts;
        this.createdDate = params?.createdDate;
        if(params?.accountName && params?.accountType){
            this.description = params?.accountType + ' ' + params.accountName;
        }
        if(params?.date){
            this.tags.push(params?.date);
        }
    }
}