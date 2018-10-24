import BudgetController from './budget';
import UIController from './ui';

class AppController {
  constructor(budgetCtrl, uiCtrl) {
    this.budgetCtrl = budgetCtrl;
    this.uiCtrl = uiCtrl;
  };

  setupEventListener() {
    const DOM = this.uiCtrl.
  }
};

AppController(
  new BudgetController(),
  new UIController()
).init();


