// see jason wattmore website on how this is implemented

export class Alert {
    id?:string;
    type? : AlertType;
    message : string;
    autoClose? : boolean;
    alertId: string;
    keepAfterRouteChange? : boolean;
    fade? : boolean;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }

}


export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}

export class AlertOptions {
    id?: string;
    autoclose? : boolean;
    keepAfterRouteChange? : boolean;

}