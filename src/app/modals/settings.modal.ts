import { Theme } from "../constants/application.constant";
import { Account } from "./account.modal";

export class Settings {
    private _settingsId:string;
    private _theme:Theme;
    private _currency:string;
    private _accounts:Account[];
    private _categories:string[];
    private _mode:string[];
    private _type:string[];
    constructor(
        settingsId:string = null,
        theme: Theme = Theme.LIGHT,
        currency: string = 'INR',
        accounts: Account[] = [],
        categories: string[] = [],
        mode: string[] = [],
        type: string[] = []
    ) {
        this._theme = theme;
        this._currency = currency;
        this._accounts = accounts;
        this._categories = categories;
        this._mode = mode;
        this._type = type;
        this._settingsId = settingsId;
    }

    // Getters
    get theme(): Theme {
        return this._theme;
    }

    get currency(): string {
        return this._currency;
    }

    get accounts(): Account[] {
        return this._accounts;
    }

    get categories(): string[] {
        return this._categories;
    }

    get mode(): string[] {
        return this._mode;
    }

    get type(): string[] {
        return this._type;
    }

    // Setters
    set theme(value: Theme) {
        this._theme = value;
    }

    set currency(value: string) {
        this._currency = value;
    }

    set accounts(value: Account[]) {
        this._accounts = value;
    }

    set categories(value: string[]) {
        this._categories = value;
    }

    set mode(value: string[]) {
        this._mode = value;
    }

    set type(value: string[]) {
        this._type = value;
    }

    get settingsId():string {
        return this._settingsId;
    }

    set settingsId(value:string) {
        this._settingsId = value;
    }

    getSettingsDTO(){
        const settingsDTO = {
            theme:this._theme,
            currency:this._currency,
            categories:this._categories,
            mode:this._mode,
            type:this._type,
            accounts:this._accounts.map(account => account instanceof Account ? account.accountDTO() : account)
        }
        if(this._settingsId){
            settingsDTO['settingsId'] = this._settingsId;
        }
        return settingsDTO;
    }
}
