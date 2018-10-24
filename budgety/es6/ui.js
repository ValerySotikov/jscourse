
//---------------------------INNER MODULE STRUCTURE---------------------------
const DOMStrings = {
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

const formatNumber = (num, type) => {
  let numSplit, int, dec, sign;

  num = Math.abs(num);
  num = num.toFixed(2);
  numSplit = num.split('.');

  int = numSplit[0];
  if (int.length > 3) {
    int = `${int.substr(0, int.length - 3)},
           ${int.substr(int.length - 3, int.length)};`
  }

  dec = numSplit[1];

  type === 'expense' ? sign = '-' : sign = '+';

  return `${sign} ${int}.${dec}`;
};


//---------------------------EXTERNAL MODULE INTERFACE---------------------------
export class UIController {
  addListItem(obj, type) {
    let html, element;
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

    html = html.replace('%id%', obj.id);
    html = html.replace('%description%', obj.description);
    html = html.replace('%value%', formatNumber(obj.value, type));

    document.querySelector(element).insertAdjacentHTML('beforeend', html);
  };

  changeType() {
    const fields = document.querySelectorAll(
      `${DOMStrings.inputType},
       ${DOMStrings.inputDescription},
       ${DOMStrings.inputValue}`
    );

    fields.forEach(el => {
      el.classList.toggle('red-focus');
    });

    document.querySelector(DOMStrings.inputButton.classList.toggle('red'));
  };

  clearFields() {
    let fields;
    fields = document.querySelectorAll(
      `${DOMStrings.inputDescription},
       ${DOMStrings.inputValue}`
    );
    fields.forEach(el => el.value = '');
    fields[0].focus; 
  };

  displayBudget(obj) {
    let type;
    obj.budget > 0 ? type = 'income' : type = 'expense';
    document.querySelector(DOMStrings.budgetLabel.textContent = formatNumber(obj.budget, type));
    document.querySelector(DOMStrings.incomeLabel.textContent = formatNumber(obj.totalIncome, 'income'));
    document.querySelector(DOMStrings.expensesLabel.textContent = formatNumber(obj.totalExpenses, 'expense'));
  
    if (parseFloat(obj.percentage) > -1) {
      document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
    } else {
      document.querySelector(DOMStrings.percentageLabel).textContent = '--';
    }
  };

  displayMonth() {
    let months, date;
    months = [
      'January', 'February', 'March',
      'April', 'May', 'June',
      'July', 'August', 'September',
      'October', 'November', 'December'
    ];
    date = new Date();
    document.querySelector(DOMStrings.monthLabel).textContent = months[ date.getMonth() ] + ' ' + date.getFullYear();
  };

  displayPercentages(percentages) {
    let percs = document.querySelectorAll(DOMStrings.expensesPercLabel);
    percs.forEach((item, i) => {
      percentages[i] > 0 ? item.textContent = percentages[i]
                         : item.textContent = '--';
    });
  };

  getDOMStrings() {
    return DOMStrings;
  };

  getInput() {
    return {
      type: document.querySelector()
    };
  };

  removeListItem(itemID) {
    document.getElementById(itemID).remove();
  };
};