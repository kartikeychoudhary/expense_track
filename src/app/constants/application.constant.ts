export class ApplicationConstant {
  static readonly STRINGS = class {
    static readonly APP_NAME = 'Expense Tracker';
    static readonly APP_VERSION = '0.0.1';
    static readonly APP_AUTHOR = 'Kartikey Choudhary';
    static readonly APP_AUTHOR_EMAIL = 'kartikey31choudhary@gmail.com';

    static readonly TRANSACTION = class {
      static readonly TITLE = 'Transaction';
      static readonly ADD = 'Add Transaction';
      static readonly EDIT = 'Edit Transaction';
      static readonly DELETE = 'Delete Transaction';
      static readonly VIEW = 'View Transaction';
      static readonly LIST = 'Transaction List';
      static readonly NO_TRANSACTION = 'No Transactions Found!';
      static readonly LOAD_TRANSACTION_FAILED = 'Failed to load transactions!';
      static readonly LOAD_TRANSACTION_SUCCESS = 'Transactions loaded successfully!';
      static readonly ADD_TRANSACTION_FAILED = 'Failed to add transaction!';
      static readonly ADD_TRANSACTION_SUCCESS = 'Transaction added successfully!';
      static readonly EDIT_TRANSACTION_FAILED = 'Failed to edit transaction!';
      static readonly EDIT_TRANSACTION_SUCCESS = 'Transaction edited successfully!';
      static readonly DELETE_TRANSACTION_FAILED = 'Failed to delete transaction!';
      static readonly DELETE_TRANSACTION_SUCCESS = 'Transaction deleted successfully!';
    }

    static readonly TASK = class {
      static readonly TITLE = 'Task';
      static readonly ADD = 'Add Task';
      static readonly EDIT = 'Edit Task';
      static readonly DELETE = 'Delete Task';
      static readonly VIEW = 'View Task';
      static readonly LIST = 'Task List';
      static readonly NO_TASK = 'No Tasks Found!';
      static readonly LOAD_TASK_FAILED = 'Failed to load tasks!';
      static readonly LOAD_TASK_SUCCESS = 'Tasks loaded successfully!';
      static readonly ADD_TASK_FAILED = 'Failed to add task!';
      static readonly ADD_TASK_SUCCESS = 'Task added successfully!';
      static readonly EDIT_TASK_FAILED = 'Failed to edit task!';
      static readonly EDIT_TASK_SUCCESS = 'Task edited successfully!';
      static readonly DELETE_TASK_FAILED = 'Failed to delete task!';
      static readonly DELETE_TASK_SUCCESS = 'Task deleted successfully!';
      static readonly DELETE_TASK_PARTIAL_SUCCESS = 'Tasks deleted partially!';
      static readonly TASK_COMPLETED = 'Task completed successfully!';
      static readonly TASK_CONVERTED = 'Task converted successfully!';
      static readonly TASK_FAILED = 'Task failed!';
      static readonly TASK_STARTED = 'Task started successfully!';
      static readonly TASK_START_FAILED = 'Task failed to start!';
      static readonly TASK_CONVERT_FAILED = 'Task failed to convert!';
      static readonly TASK_GENAI_SUCCESS = 'Task send to genai successfully!';
      static readonly TASK_GENAI_FAILED = 'Task failed to send to genai!';
    }

    static readonly SETTINGS = class {
      static readonly TITLE = 'Settings';
      static readonly THEME = 'Theme';
      static readonly CURRENCY = 'Currency';
      static readonly ACCOUNTS = 'Accounts';
      static readonly CATEGORIES = 'Categories';
      static readonly MODE = 'Mode';
      static readonly TYPE = 'Type';
      static readonly IMPORT = 'Import';
      static readonly EXPORT = 'Export';
      static readonly IMPORT_SUCCESS = 'Account import successful!';
      static readonly IMPORT_FAILED = 'Account import failed!';
      static readonly ACCOUNT_ADDED = 'Account added successfully!';
      static readonly ACCOUNT_UPDATED = 'Account updated successfully!';
      static readonly ACCOUNT_DELETED = 'Account deleted successfully!';
      static readonly SETTINGS_UPDATED = 'Settings updated successfully!';
      static readonly SETTINGS_UPDATE_FAILED = 'Settings update failed!';
      static readonly PASSWORD_CHANGED = 'Password changed successfully!';
      static readonly PASSWORD_CHANGE_FAILED = 'Password change failed!';
    }
  }
  static readonly NOTIFICATION = class {
    static readonly TIMEOUT = 3000; // 3 seconds;
  }

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
export enum NOTIFICATION_TYPES {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO'
};

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

export enum ChartTypes {
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
  DONUT = 'donut',
  AREA = 'area',
  COLUMN = 'column',
  RADIAL = 'radial'
}