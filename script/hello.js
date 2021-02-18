'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let btnStart = document.getElementById('start'),
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
    incomeItems = document.querySelectorAll('.income-items'),
    depositBank = document.querySelector('.deposit-bank');

let expensesItems = document.querySelectorAll('.expenses-items'),
    titlePeriodAmount = document.querySelector('.period-amount'),
    adExpensesTitle = document.querySelector('.additional_expenses-item');
    
const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    accumulatedMonth: 0,
    incomeMonth: 0,

    isNumberSalary: function(){ 
        return +salaryAmount.value == '';
     },
 

    start : function() {
        
        if (appData.isNumberSalary()){return;}
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getBudget();

        appData.sumAdditionIncome();

        appData.getAddExpenses();
        appData.getAddIncome();
        appData.showResult();
        appData.showBtnReset();

    },

    reset: function(){
        
        appData.income = {};
        appData.addIncome = [];
        appData.expenses = {};
        appData.addExpenses = [];
        appData.deposit= false;
        appData.percentDeposit = 0;
        appData.moneyDeposit = 0;
        appData.budget = 0;
        appData.budgetDay = 0;
        appData.budgetMonth = 0;
        appData.expensesMonth = 0;
        appData.accumulatedMonth = 0;
        appData.incomeMonth= 0;

        appData.showResult();
        
        salaryAmount.value = '';
        periodSelect.value = 1;
        titlePeriodAmount.textContent = 1;
        adExpensesTitle.value = '';
        targetAmount.value = '';
        depositCheck.checked = false;
        
        let allIncomeTitles = document.querySelectorAll('input.income-title'),
            allincomeAmounts = document.querySelectorAll('.income-amount'),
            adIncomeItem = document.querySelectorAll('.additional_income-item'),
            inputExpensesTitle = document.querySelectorAll('input.expenses-title'),
            inputExpensesAmount = document.querySelectorAll('input.expenses-amount');

        adIncomeItem[0].value = '';
        adIncomeItem[1].value = '';    

        allIncomeTitles[0].value = '';
        if (allIncomeTitles[1] !== undefined) {
            allIncomeTitles[1].value = '';
        }
        if (allIncomeTitles[2] !== undefined) {
            allIncomeTitles[2].value = '';
        }

        allincomeAmounts[0].value = '';
        if (allincomeAmounts[1] !== undefined){
            allincomeAmounts[1].value = '';
        }

        if (allincomeAmounts[2] !== undefined){
            allincomeAmounts[2].value = '';
        }
        
        inputExpensesTitle[0].value = '';
        if (inputExpensesTitle[1] !== undefined) {
            inputExpensesTitle[1].value = '';
        }
        if (inputExpensesTitle[2] !== undefined) {
            inputExpensesTitle[2].value = '';
        }

        inputExpensesAmount[0].value = '';
        if (inputExpensesAmount[1] !== undefined) {
            inputExpensesAmount[1].value = '';
        }
        if (inputExpensesAmount[2] !== undefined) {
            inputExpensesAmount[2].value = '';
        }

        resTargetMonth.value = 'Срок';

        appData.showBtnStart();
    },

    showResult : function() {
        resBudgetMonth.value = appData.budgetMonth;
        resExpensesMonth.value = appData.expensesMonth;
        resBudgetDay.value = appData.budgetDay;
        resAdditionExp.value = appData.addExpenses.join(', ');
        resAdditionIncome.value = appData.addIncome.join(', ');
        resTargetMonth.value = appData.getTargetMonth();
        resIncomePeriod.value = appData.calcSavedMonth();
        periodSelect.addEventListener('input', function(){resIncomePeriod.value = periodSelect.value * appData.budgetMonth;})
    
    },

    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {expensesAdd.style.display = 'none'; }
    },

    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {incomeAdd.style.display = 'none'; }
    },

    getExpenses: function(){
        expensesItems.forEach(function(item){
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = +item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    getIncome: function(){
        incomeItems.forEach(function(item){
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = +item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });
    },

    

    getAddExpenses: function(){
        const 
        addExpenses = adExpensesTitle.value.split(',');
        
        addExpenses.forEach(function(item){
            if (item !== ''){
                item = item.trim();
                appData.addExpenses.push(item[0].toUpperCase() + item.slice(1).toLowerCase());
            }
        });
    },

    getAddIncome: function() {
        
        additionalIncome.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !==''){
                appData.addIncome.push(itemValue[0].toUpperCase() + itemValue.slice(1).toLowerCase());
            }
        });

        
    },

    sumAdditionIncome: function() {
        let sum = 0;
        for (let key in appData.income) {
            sum += +this.income[key];
        }
        return sum;
    },

    getBudget: function () {
        appData.budgetMonth = +appData.budget - appData.expensesMonth;
        appData.budgetMonth = +appData.budgetMonth;
        appData.budgetMonth += +appData.sumAdditionIncome();
        appData.budgetDay = +Math.floor(appData.budgetMonth / 30);
        return appData.budgetMonth;
    },
    getExpensesMonth: function() {
    
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
    },

    getInfoDeposit: function(){
        if(appData.deposit){

            do {appData.percentDeposit = prompt('Какой годовой процент?')}
            while (appData.percentDeposit === null || appData.percentDeposit.trim().length == 0 || !isNumber(appData.percentDeposit));
            
            appData.percentDeposit = +appData.percentDeposit;

            do {appData.moneyDeposit = prompt('Какая сумма заложена?')}
            while (appData.moneyDeposit === null || appData.moneyDeposit.trim().length == 0 || !isNumber(appData.moneyDeposit));
            appData.moneyDeposit = +appData.moneyDeposit;
        }
    },
    calcSavedMonth: function(){
        return appData.budgetMonth * periodSelect.value;
    },

    periodAmount: function(){
        periodSelect.addEventListener('input', function(){titlePeriodAmount.textContent = periodSelect.value;});
    },
      
    numBudget: function(){
        appData.budget = +appData.budget;
        return;
    },

    showBtnReset: function(){
        btnStart.style.display = 'none';
        btnCancel.style.display= 'block';
    },

    showBtnStart: function(){
        btnCancel.style.display='none';
        btnStart.style.display='block';
    },
};

appData.periodAmount();

expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);

btnStart.addEventListener('click', appData.start);
btnCancel.addEventListener('click', appData.reset);

appData.accumulatedMonth = appData.getBudget();




