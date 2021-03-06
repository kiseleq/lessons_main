'use strict';

const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const btnStart = document.getElementById('start'),
    btnCancel = document.getElementById('cancel'),
    incomeAdd = document.getElementsByTagName('button')[0],
    expensesAdd = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncome = document.querySelectorAll('.additional_income-item'),

    resBudgetMonth = document.getElementsByClassName('result-total')[0],
    resBudgetDay = document.getElementsByClassName('result-total')[1],
    resExpensesMonth = document.getElementsByClassName('result-total')[2],
    resAdditionIncome = document.getElementsByClassName('result-total')[3],
    resAdditionExp = document.getElementsByClassName('result-total')[4],
    resIncomePeriod = document.getElementsByClassName('result-total')[5],
    resTargetMonth = document.getElementsByClassName('result-total')[6],
    
    salaryAmount = document.querySelector('.salary-amount'),
    adIncomeTitle = document.querySelector('input.income-title'),
    adIncomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('input.expenses-title'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),

    //часть скрытых
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositBank = document.querySelector('.deposit-bank'),

    titlePeriodAmount = document.querySelector('.period-amount'),
    adExpensesTitle = document.querySelector('.additional_expenses-item');
    

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');
    

class AppData {
    constructor(){
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.accumulatedMonth = 0;
        this.incomeMonth = 0;
    }

};

AppData.prototype.isNumberSalary = () => { 
    return +salaryAmount.value == '';
 };

 AppData.prototype.isNumberPercent = function ()  { 
    
    if (depositPercent.value > 0 && depositPercent.value < 100) {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
    }else if (depositPercent.value === null){
        console.log(typeof(depositPercent.value));
        this.moneyDeposit = 0;
        this.percentDeposit = 1;
    }
    else {
        depositPercent.value = '';
        alert('Введите корректное значение в поле проценты');
        const n = true;
        return n;
    };
    
    
    
    // if (depositPercent.value > 0 && depositPercent.value < 100 || depositPercent.value === undefined) {
    //     this.percentDeposit = depositPercent.value;
    //     this.moneyDeposit = depositAmount.value;
    // }else {
    //     alert('Введите корректное значение в поле проценты');
    //     const n = true;
    //     return n;
    // } 
    
 };  

AppData.prototype.start = function() {

    if (appData.deposit) {
        this.isNumberPercent();
        if (this.isNumberPercent()) return; 
    }
        
    if (this.isNumberSalary()) return;

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.sumAdditionIncome();
    this.getIncome();
    this.getExpensesMonth();
    // this.getInfoDeposit();

    this.getBudget();


    this.getAddExpenses();
    this.getAddIncome();
    this.showResult();
    this.frezeInput();
    this.showBtnReset();

};

AppData.prototype.reset = function() {

    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit= false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.accumulatedMonth = 0;
    this.incomeMonth= 0;
    titlePeriodAmount.textContent = '1';
    depositAmount.style.display = 'none';
    depositPercent.style.display = 'none';
    depositBank.style.display = 'none';;

    this.showResult();
    
    document.querySelectorAll('input').forEach(item => {
        item.value = '';
        if (item.checked) {
            item.checked = false;
        }
        if (item.type === 'range') {
            item.value = 1;
            this.periodAmount();
        }
        resTargetMonth.value = 'Срок';
    });

    const allIncomeItems = document.querySelectorAll('.income-items');
    if (allIncomeItems[1]){
        allIncomeItems[1].remove();
    }
    if (allIncomeItems[2]){
        allIncomeItems[2].remove();
    }

    const allExpensesItems = document.querySelectorAll('.expenses-items');
    if (allExpensesItems[1]){
        allExpensesItems[1].remove();
    }
    if (allExpensesItems[2]){
        allExpensesItems[2].remove();
    }

    this.showBtnStart();
    this.frezeInput();
};

AppData.prototype.showResult = function() {
    
    resBudgetMonth.value = this.budgetMonth;
    resExpensesMonth.value = this.expensesMonth;
    resBudgetDay.value = this.budgetDay;
    resAdditionExp.value = this.addExpenses.join(', ');
    resAdditionIncome.value = this.addIncome.join(', ');
    resTargetMonth.value = this.getTargetMonth();
    resIncomePeriod.value = this.calcSavedMonth();
    periodSelect.addEventListener('input', () => resIncomePeriod.value = this.calcSavedMonth())

};

AppData.prototype.addExpensesBlock = () => {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {expensesAdd.style.display = 'none'; }
};

AppData.prototype.addIncomeBlock = () => {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {incomeAdd.style.display = 'none'; }
};

AppData.prototype.getExpenses = function () {
    expensesItems.forEach((item) => {
        const itemExpenses = item.querySelector('.expenses-title').value;
        const cashExpenses = +item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
    });
};

AppData.prototype.getIncome = function() {
    incomeItems.forEach((item) => {
        const itemIncome = item.querySelector('.income-title').value;
        const cashIncome = +item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
        }
    });
};

AppData.prototype.getAddExpenses = function() {
    const addExpenses = adExpensesTitle.value.split(',');
    addExpenses.forEach((item) => {
        if (item !== ''){
            item = item.trim();
            this.addExpenses.push(item[0].toUpperCase() + item.slice(1).toLowerCase());
        }
    });
};

AppData.prototype.getAddIncome = function() {
    
    additionalIncome.forEach((item) => {
        const itemValue = item.value.trim();
        if (itemValue !=='') this.addIncome.push(itemValue[0].toUpperCase() + itemValue.slice(1).toLowerCase());
        
    });

    
};

AppData.prototype.sumAdditionIncome = function() {
    
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }

    return this.incomeMonth;
};

AppData.prototype.getBudget = function() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget;
    this.budgetMonth += this.sumAdditionIncome();
    this.budgetMonth += monthDeposit;

    this.budgetDay = +Math.floor((this.budgetMonth - this.expensesMonth) / 30);

};
AppData.prototype.getExpensesMonth = function() {

    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
},
AppData.prototype.getTargetMonth = function() {
    return Math.ceil(targetAmount.value / this.budgetMonth)
};

// getInfoDeposit: function(){
//     if(appData.deposit){

//         do {appData.percentDeposit = prompt('Какой годовой процент?')}
//         while (appData.percentDeposit === null || appData.percentDeposit.trim().length == 0 || !isNumber(appData.percentDeposit));
        
//         appData.percentDeposit = +appData.percentDeposit;

//         do {appData.moneyDeposit = prompt('Какая сумма заложена?')}
//         while (appData.moneyDeposit === null || appData.moneyDeposit.trim().length == 0 || !isNumber(appData.moneyDeposit));
//         appData.moneyDeposit = +appData.moneyDeposit;
//     }
// },

AppData.prototype.calcSavedMonth = function() {
    return (this.budgetMonth - resExpensesMonth.value) * periodSelect.value;
};
AppData.prototype.periodAmount = () => {
    periodSelect.addEventListener('input', () => titlePeriodAmount.textContent = periodSelect.value);
};
AppData.prototype.numBudget = function() {
    this.budget = +this.budget;
    return;
};
AppData.prototype.showBtnReset = () => {
    btnStart.style.display = 'none';
    btnCancel.style.display= 'block';
};
AppData.prototype.showBtnStart = () => {
    btnCancel.style.display='none';
    btnStart.style.display='block';
};
AppData.prototype.frezeInput = () => { 
    
    if (incomeAdd.disabled){
        incomeAdd.disabled = false;
    } else {incomeAdd.disabled = true;}
  
    if (expensesAdd.disabled){
        expensesAdd.disabled = false;
    } else {expensesAdd.disabled = true;}

    document.querySelectorAll('input').forEach(item =>{
        if (item.disabled) {
            item.disabled = false;
        } else {item.disabled = true;}
    });

    periodSelect.disabled = false;
};

// AppData.prototype.getInfoDeposit = function () {
//     if (this.deposit){
//         if (depositPercent.value > 0 && depositPercent.value < 100) {
//             this.percentDeposit = depositPercent.value;
//             this.moneyDeposit = depositAmount.value;
//         } else {
//             alert('Введите корректное значение в поле проценты');
//             return;
//         }
//     }
// };

AppData.prototype.changePercent = function () {
    const valueSelect = depositBank.value;
    
    if (valueSelect === 'other') {
        depositPercent.value = '';
        depositPercent.disabled = false;
        depositPercent.style.display = 'inline-block';

    } else {
        depositPercent.value = valueSelect;
        depositPercent.disabled = true;
    }
    
};

AppData.prototype.depositHandler = function () {
    if (depositCheck.checked) {
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        this.deposit = true;
        depositBank.addEventListener('change', this.changePercent);
    }
    else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        this.deposit = false;
        depositBank.removeEventListener('change', this.changePercent);
    }
};

AppData.prototype.eventListeners = function(){
    appData.periodAmount();

    expensesAdd.addEventListener('click', this.addExpensesBlock);
    incomeAdd.addEventListener('click', this.addIncomeBlock);

    btnStart.addEventListener('click', () => this.start());
    btnCancel.addEventListener('click', () => this.reset());

    depositCheck.addEventListener('change', () => this.depositHandler());
};

const appData = new AppData();

appData.eventListeners();




// appData.periodAmount();

// expensesAdd.addEventListener('click', appData.addExpensesBlock);
// incomeAdd.addEventListener('click', appData.addIncomeBlock);

// btnStart.addEventListener('click', () => appData.start());
// btnCancel.addEventListener('click', () => appData.reset());


