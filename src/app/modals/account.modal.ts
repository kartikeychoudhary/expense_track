export class Account {
    private _accountId:string;
    private _uniqueName:string;
    private _balance:number;
    private _type:string;
    private _issuer:string;
    private _icon:string;
    private _color:string;
    private _description:string;

    constructor(
        uniqueName: string = '',
        balance: number = 0,
        type: string = '',
        mode: string = '',
        icon: string = '',
        color: string = '',
        description: string = '',
    ) {
        this._uniqueName = uniqueName;
        this._balance = balance;
        this._type = type;
        this._issuer = mode;
        this._icon = icon;
        this._color = color;
        this._description = description;
    }

    // Getters
    get id(): string {
        return this._accountId;
    }

    get uniqueName(): string {
        return this._uniqueName;
    }

    get balance(): number {
        return this._balance;
    }

    get type(): string {
        return this._type;
    }

    get issuer(): string {
        return this._issuer;
    }

    get icon(): string {
        return this._icon;
    }

    get color(): string {
        return this._color;
    }

    get description(): string {
        return this._description;
    }

    // Setters
    set id(value: string) {
        this._accountId = value;
    }

    set uniqueName(value: string) {
        this._uniqueName = value;
    }

    set balance(value: number) {
        this._balance = value;
    }

    set type(value: string) {
        this._type = value;
    }

    set issuer(value: string) {
        this._issuer = value;
    }

    set icon(value: string) {
        this._icon = value;
    }

    set color(value: string) {
        this._color = value;
    }

    set description(value: string) {
        this._description = value;
    }

    public accountDTO(){
        const dto = {
            uniqueuniqueName: this._uniqueName,
            balance: this._balance,
            type: this._type,
            issuer: this._issuer,
            icon: this._icon,
            color: this._color,
            description: this._description
        }
        return dto;
    }
}
