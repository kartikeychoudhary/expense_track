export class ApplicationConstant {
  static CATEGORIES = [
    "ATM",
    "TRANSFER",
    "BILL",
    "CREDIT CARD BILL",
    "EMI",
    "ENTERTAINMENT",
    "FOOD",
    "GROCERIES",
    "LIQUOR",
    "MEDICAL",
    "FOOD",
    "SHOPPING",
    "RENT",
    "SALARY",
    "SERVICES",
    "SHOPPING",
    "SUBSCRIPTION",
    "TRAVEL",
    "WALLET"
  ];

  static MODE = [
    'CREDIT CARD',
    'IMPS',
    'NEFT',
    'UPI'
  ];

  static TYPE = ['DEBIT', 'CREDIT'];

  static MONTH_NAMES = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
  }

  static EVENTS = {
    SETTINGS_UPDATED: 'SETTINGS_UPDATED',
  }
}

export enum DeviceType {
  DESKTOP = 'DESKTOP',
  MOBILE = 'MOBILE',
  TABLET = 'TABLET'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  FOREST = 'forest',
  CYBERPUNK = 'cyberpunk',
  FANTASY = 'fantasy',
  BLACK = 'black',
  LUXURY = 'luxury',
  DRACULA = 'dracula',
  CMYK = 'cmyk',
  AUTUMN = 'autumn',
  BUSINESS = 'business',
  ACID = 'acid',
  LEMONADE = 'lemonade',
  NIGHT = 'night',
  COFFEE = 'coffee',
  WINTER = 'winter',
  RETRO = 'retro',
  SYNTHWAVE = 'synthwave',
  HALLOWEEN = 'halloween',
  GARDEN = 'garden',
  AQUA = 'aqua',
  LOFI = 'lofi',
  PASTEL = 'pastel',
  CORPORATE = 'corporate',
  VALENTINE = 'valentine',
  WIREFRAME = 'wireframe',
  CUPCAKE = 'cupcake',
  BUMBLEBEE = 'bumblebee',
  EMERALD = 'emerald',
  CARROT = 'carrot',
  SUNSET = 'sunset',
  NEUTRAL = 'neutral',
  GHOST = 'ghost',
  SLATE = 'slate'
}

export class CurrencySymbol {
  static symbols = {
    'INR': '₹',
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'CAD': 'C$'
  }
  static currentSymbol(currency: string): string {
    return this.symbols[currency] ? this.symbols[currency] : currency;
  }
}

export enum AccountTypes {
  BANK = 'BANK',
  CREDIT_CARD = 'CREDIT CARD',
  WALLET = 'WALLET',
  LOAN = 'LOAN'
}