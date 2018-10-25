import BudgetController from './budget';
import UIController from './ui';



const setupEventListeners = () => {
  const DOM = UICtrl.getDOMStrings();

  document.addEventListener('keypress', event => {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });

  document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
  document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
  document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
};

const updateBudget = () => {
  //  1. Calculate the budget
  //  2. Return the budget
  budgetCtrl.calculateBudget();
  const budget = budgetCtrl.getBudget();
  UICtrl.displayBudget(budget);
};

const updatePercentages = () => {
  //  1. Calculate percentages
  budgetCtrl.calculatePercentages();
  //  2. Read percentages from the budget controller
  const percentages = budgetCtrl.getPercentages();
  //  3. Update the UI with the new percentages
  UICtrl.displayPercentages(percentages);
};

const ctrlAddItem = () => {
  let input, newItem;
  //  1. Get the field input data
  input = UICtrl.getInput();

  if (
    input.description !== "" 
    && !isNaN(input.value)
    && input.value > 0
  ) {
    //  2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(
      input.type,
      input.description,
      input.value
    );

    //  3. Add the item to the UI
    UICtrl.addListItem(newItem, input.type);

    //  4. Clear fields
    UICtrl.clearFields();

    //  5. Calculate and update budget
    updateBudget();

    //  6. Calculate and update percentages
    updatePercentages();
  }
};

const ctrlDeleteItem = event => {
  let itemID, splitID, type, ID;

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

export class AppController {
  init() {
    setupEventListeners();
    UIController.displayMonth();
    UIController.displayBudget({
      budget: 0,
      totalIncome: 0,
      totalExpenses: 0,
      percentage: 0
    });
    console.log('Application is started!');
  };
};
