export class Account {
    private _id:string;
    private _name:string;
    private _balance:number;
    private _type:string;
    private _mode:string;
    private _icon:string;
    private _color:string;
    private _description:string;
    private _is_active:boolean;
    private _is_default:boolean;
    private _is_deleted:boolean;

    constructor(
        id: string = '',
        name: string = '',
        balance: number = 0,
        type: string = '',
        mode: string = '',
        icon: string = '',
        color: string = '',
        description: string = '',
        is_active: boolean = true,
        is_default: boolean = false,
        is_deleted: boolean = false
    ) {
        this._id = id;
        this._name = name;
        this._balance = balance;
        this._type = type;
        this._mode = mode;
        this._icon = icon;
        this._color = color;
        this._description = description;
        this._is_active = is_active;
        this._is_default = is_default;
        this._is_deleted = is_deleted;
    }

    // Getters
    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get balance(): number {
        return this._balance;
    }

    get type(): string {
        return this._type;
    }

    get mode(): string {
        return this._mode;
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

    get is_active(): boolean {
        return this._is_active;
    }

    get is_default(): boolean {
        return this._is_default;
    }

    get is_deleted(): boolean {
        return this._is_deleted;
    }

    // Setters
    set id(value: string) {
        this._id = value;
    }

    set name(value: string) {
        this._name = value;
    }

    set balance(value: number) {
        this._balance = value;
    }

    set type(value: string) {
        this._type = value;
    }

    set mode(value: string) {
        this._mode = value;
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

    set is_active(value: boolean) {
        this._is_active = value;
    }

    set is_default(value: boolean) {
        this._is_default = value;
    }

    set is_deleted(value: boolean) {
        this._is_deleted = value;
    }
}
