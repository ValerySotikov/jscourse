
//  BUDGET CONTROLLER
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
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
        totalExpences: data.totals.expense,
        percentage: data.percentage
      };
    },

    testing: function() {
      console.log(data);
    }
  };
})();

//  USER INTERFACE CONTROLLER
var UIController = (function() {
  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn'
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
      var html;
      //  Create HTML string with placeholder text
      if (type === 'income') {

        html = `<div class="item clearfix" id="income-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                <div class="item__value">+${obj.value}</div>
                <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
                </div>
                </div>`;

      } else if (type === 'expense') {
        var percentage = Math.round( parseFloat(obj.value) / parseFloat( document.querySelector('.budget__income--value').textContent ) * 100 );
        html = `<div class="item clearfix" id="expense-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                <div class="item__value">-${obj.value}</div>
                <div class="item__percentage">${percentage}%</div>
                <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
                </div>
                </div>`;

      }

      document.querySelector(`.${type}__list`).insertAdjacentHTML('beforeend', html);      
      //  Replace the placeholder text with some actual data
      //  Insert the HTML into the DOM
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

    displayChanges: function(budget) {
      document.querySelector('.budget__value').textContent = budget.budget;
      document.querySelector('.budget__income--value').textContent = '+' + budget.totalIncome;
      document.querySelector('.budget__expenses--value').textContent = budget.totalExpense;
      document.querySelector('.budget__expenses--percentage').textContent = budget.percentage + '%';
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
  };

  var updateBudget = function() {
    //  1. Calculate the budget;
    //  1. Return the budget;
    budgetCtrl.calculateBudget();
    var budget = budgetCtrl.getBudget();
    console.log(budget);

    //  6. Display the budget on the UI;
    UICtrl.displayChanges(budget);
  }

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
    }
  };

  return {
    init: function() {
      setupEventListeners();
      console.log('Application is started!');
    }
  };
})(budgetController, UIController);

controller.init();