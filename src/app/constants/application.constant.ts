export class ApplicationConstant {
  static CATEGORIES = [
  "ATM",
  "BANK TRANSFER",
  "BILL",
  "CHALLAN",
  "CHARGES",
  "CREDIT CARD BILL",
  "EMI",
  "ENTERTAINMENT",
  "ENTERTAINMENT MOVIE",
  "FOOD",
  "GROCERIES",
  "GROMMING",
  "LIQUOR",
  "MAINTENANCE",
  "MEDICAL",
  "MEDICINES",
  "ONLINE FOOD",
  "ONLINE SHOPPING",
  "RECHARGE INTERNET",
  "RECHARGE MOBILE",
  "REFUND",
  "RENT ON GOODS",
  "SALARY",
  "SERVICES",
  "SHOPPING",
  "SHOPPPING",
  "SUBSCRIPTION",
  "TRAVEL",
  "WALLET"
];

  static MODE = [
    'ATM',
    'CARD',
    'CHARGES',
    'CREDIT CARD',
    'IMPS',
    'NEFT',
    'UPI',
  ];

  static TYPE = ['DEBIT', 'CREDIT'];

  static MONTH_NAMES = {
    0:'Jan', 
    1:'Feb', 
    2:'Mar', 
    3:'Apr', 
    4:'May', 
    5:'Jun', 
    6:'Jul', 
    7:'Aug', 
    8:'Sep', 
    9:'Oct', 
    10:'Nov', 
    11:'Dec', 
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
  static currentSymbol(currency: string):string {
    return this.symbols[currency] ? this.symbols[currency] : currency;
  }
}
