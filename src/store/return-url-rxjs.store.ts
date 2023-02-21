import {DataRxJs} from "./data-rxjs.store";


class ReturnUrlRxJs extends DataRxJs<string> {
    constructor(public returnUrl: string){
        super(returnUrl);
    }
}


export const returnUrlRxJs = new ReturnUrlRxJs("http://localhost:3000/login");