// see jason wattmore website on how this is implemented

export class Alert {
    type : AlertType;
    message : string;
    alertId: string;
    keepAfterRouteChange : boolean;

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