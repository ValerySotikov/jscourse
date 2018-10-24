
//---------------------------INNER MODULE STRUCTURE---------------------------
class DataField {
  constructor({ id, description, value }) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };
};

class Expense extends DataField {
  constructor({ id, description, value }) {
    super(id, description, value);
  };

  calcPercentage(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round( this.value / totalIncome * 100 );
    } else {
      this.percentage = -1;
    }
  };

  getPercentage() {
    return this.percentage;
  };
};

class Income extends DataField {
  constructor({ id, description, value }) {
    super(id, description, value)
  }
};

let data = {
  allItems: {
    expense:[],
    income:[]
  },
  totals: {
    expense: 0,
    income: 0
  },
  budget: 0,
  percentage: -1
};

const calculateTotal = type => {
  data.totals[type] = data.allItems[type].reduce((prev, curr) => {
    return prev + curr;
  }, 0);
}


//---------------------------EXTERNAL MODULE INTERFACE---------------------------
export class BudgetController {
  additem(type, des, val) {
    let newItem, ID;

    //  Create new ID
    if (data.allItems[type].length > 0) {
      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
    } else {
      ID = 0;
    }

    //  Creating item based on the type
    if (type === 'expense') {
      newItem = new Expense(ID, des, val);
    } else if (type === 'income') {
      newItem = new Income(ID, des, val);
    }

    //  Adding item to the array
    data.allItems[type].push(newItem);
    data.totals[type] += val;

    //  Return created element
    return newItem;
  };

  calculateBudget() {
    data.allItems.expense.forEach(el => {
      el.calcPercentage(data.totals.income);
    });
  };

  calculatePercentages() {
    data.allItems.expense.forEach(el => {
      el.calcPercentage(data.totals.income);
    });
  };

  deleteItem(type, id) {
    let ids, index;

    ids = data.allItems[type].map(el => {
      return el.id;
    });

    index = ids.indexOf(id);

    if (index !== -1) {
      data.allItems[type].splice(index, 1);
    }
  };

  getBudget() {
    return {
      budget: data.budget,
      totalIncome: data.totals.income,
      totalExpenses: data.totals.expense,
      percentage: data.percentage
    };
  };

  getData() {
    return data;
  };

  getPercentages() {
    return data.allItems.expense.map(el => {
      return el.getPercentage();
    });
  };
};