
//  BUDGET CONTROLLER
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round( this.value / totalIncome * 100 );
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  function calculateTotal(type) {
    data.totals[type] =  data.allItems[type].reduce((previousValue, currentValue) => {
      return previousValue + currentValue.value
    }, 0);
  };

  var data = {
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

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

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
    },

    calculateBudget: function() {
      //  calculate total income and expenses
      calculateTotal('income');
      calculateTotal('expense');
      data.budget = data.totals.income - data.totals.expense;
      // budget = totalIncome - totalExpense;
      if (data.totals.income > 0) {
        data.percentage = Math.round( data.totals.expense / data.totals.income * 100 );
      } else {
        data.percentage = -1;
      }
      //  calculate the budget: income - expenses
      //  calculate the percentage of income that we spent
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalIncome: data.totals.income,
        totalExpenses: data.totals.expense,
        percentage: data.percentage
      };
    },

    deleteItem: function(type, id) {
      var ids, index;
      
      ids = data.allItems[type].map(function(item) {
        return item.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculatePercentages: function() {
      data.allItems.expense.forEach(function(item) {
        item.calcPercentage(data.totals.income);
      });
    },

    getPercentages: function() {
      var allPercentages = data.allItems.expense.map(function(item) {
        return item.getPercentage();
      });

      return allPercentages;
    },
    
    getData() {
      return data;
    }
  };
})();

//  USER INTERFACE CONTROLLER
var UIController = (function() {
  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expense__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    monthLabel: '.budget__title--month'
  };

  var formatNumber = function(num, type) {
    var numSplit, int, dec, sign;

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.');

    int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length);
    }
    dec = numSplit[1];

    return (type === 'expense' ? '-' : '+') + ' ' + int + '.' + dec;
  };

  return {
    getinput: function() {
      return {
        type : document.querySelector(DOMStrings.inputType).value,  //..Will be either inc or exp
        description : document.querySelector(DOMStrings.inputDescription).value,
        value : parseFloat( document.querySelector(DOMStrings.inputValue).value )
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;
      //  Create HTML string with placeholder text
      if (type === 'income') {
        element = DOMStrings.incomeContainer;
        html = `<div class="item clearfix" id="income-%obj.id%">
                <div class="item__description">%description%</div>
                <div class="right clearfix">
                <div class="item__value">%value%</div>
                <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
                </div>
                </div>`;

      } else if (type === 'expense') {
        element = DOMStrings.expensesContainer;
        html = `<div class="item clearfix" id="expense-%id%">
                <div class="item__description">%description%</div>
                <div class="right clearfix">
                <div class="item__value">%value%</div>
                <div class="item__percentage">%percentage%</div>
                <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
                </div>
                </div>`;

      }

      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

      //  Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);      
    },

    clearFields: function() {
      var fields, fieldsArray;
      fields = document.querySelectorAll(`${DOMStrings.inputDescription}, ${DOMStrings.inputValue}`);
      fieldsArray = Array.prototype.slice.call(fields);
      fieldsArray.forEach(function(item) {
        item.value = "";
      });
      fieldsArray[0].focus();
    },

    displayBudget: function(obj) {
      var type;
      obj.budget > 0 ? type = 'income' : type = 'expense';
      document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'income');
      document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExpenses, 'expense');

      if (parseFloat(obj.percentage) > -1) {
        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = '--';
      }

    },

    displayMonth: function() {
      var months, date;
      months = [
        'January', 'February', 'March',
        'April', 'May', 'June',
        'July', 'August', 'September',
        'October', 'November', 'December'
      ];
      date = new Date();
      document.querySelector(DOMStrings.monthLabel).textContent = months[ date.getMonth() ] + ' ' + date.getFullYear();
    },

    changeType: function() {

      var fields = document.querySelectorAll(
        DOMStrings.inputType + ',' +
        DOMStrings.inputDescription + ',' +
        DOMStrings.inputValue
      );

      Array.prototype.forEach.call(fields, function(item) {
        item.classList.toggle('red-focus');
      });

      document.querySelector(DOMStrings.inputButton).classList.toggle('red');
    },

    displayPercentages: function(percentages) {
      var percs = document.querySelectorAll(DOMStrings.expensesPercLabel);
      Array.prototype.forEach.call(percs, function(item, i) {
        percentages[i] > 0 ? item.textContent = percentages[i]
                           : item.textContent = '--';
      });
    },

    removeListItem: function(itemID) {
      document.getElementById(itemID).remove();
    },

    getDOMStrings: function() {
      return DOMStrings;
    }
  };
})();

//  GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
    
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
  };

  var updateBudget = function() {
    //  1. Calculate the budget;
    //  1. Return the budget;
    budgetCtrl.calculateBudget();
    var budget = budgetCtrl.getBudget();

    //  6. Display the budget on the UI;
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = function() {
    
    //  1. Calculate percentages
    budgetCtrl.calculatePercentages();

    //  2. Read percentages from the budget controller
    var percentages = budgetCtrl.getPercentages();

    //  3. Update the UI with the new percentages
    UICtrl.displayPercentages(percentages);

  };

  var ctrlAddItem = function() {
    var input, newItem;
    //  1. Get the field input data;
    input = UICtrl.getinput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //  2. Add the item to the budget controller;
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      //  3. Add the item to the UI;
      UICtrl.addListItem(newItem, input.type);

      //  4. Clear fields
      UICtrl.clearFields();

      //  5. Calculate and update budget
      updateBudget();

      //  6. Calculate and update percentages
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      //  1. Delete item from data structure
      budgetCtrl.deleteItem(type, ID);
      //  2. Delete item from the UI
      UICtrl.removeListItem(itemID);
      //  3. Recalc budget
      updateBudget();

      updatePercentages();
    }
  };

  return {
    init: function() {
      setupEventListeners();
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalIncome: 0,
        totalExpenses: 0,
        percentage: 0
      });
      console.log('Application is started!');
    }
  };
})(budgetController, UIController);

controller.init();