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

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.sumAdditionIncome();
        this.getIncome();
        this.getExpensesMonth();

        this.getBudget();
        
        // this.getBudget();



        this.getAddExpenses();
        this.getAddIncome();
        this.showResult();
        this.frezeInput();
        this.showBtnReset();

    },

    reset: function() {

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

        let allIncomeItems = document.querySelectorAll('.income-items');
        if (allIncomeItems[1]){
            allIncomeItems[1].remove();
        }
        if (allIncomeItems[2]){
            allIncomeItems[2].remove();
        }

        let allExpensesItems = document.querySelectorAll('.expenses-items');
        if (allExpensesItems[1]){
            allExpensesItems[1].remove();
        }
        if (allExpensesItems[2]){
            allExpensesItems[2].remove();
        }

        this.showBtnStart();
        this.frezeInput();
    },

    showResult : function() {
        
        resBudgetMonth.value = this.budgetMonth;
        resExpensesMonth.value = this.expensesMonth;
        resBudgetDay.value = this.budgetDay;
        resAdditionExp.value = this.addExpenses.join(', ');
        resAdditionIncome.value = this.addIncome.join(', ');
        resTargetMonth.value = this.getTargetMonth();
        resIncomePeriod.value = this.calcSavedMonth();
        periodSelect.addEventListener('input', () => {resIncomePeriod.value = periodSelect.value * this.calcSavedMonth();})
    
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

    getExpenses: function() {
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = +item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    getIncome: function() {
        incomeItems.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = +item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });
    },

    

    getAddExpenses: function() {
        const 
        addExpenses = adExpensesTitle.value.split(',');
        
        addExpenses.forEach((item) => {
            if (item !== ''){
                item = item.trim();
                this.addExpenses.push(item[0].toUpperCase() + item.slice(1).toLowerCase());
            }
        });
    },

    getAddIncome: function() {
        
        additionalIncome.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !==''){
                this.addIncome.push(itemValue[0].toUpperCase() + itemValue.slice(1).toLowerCase());
            }
        });

        
    },

    sumAdditionIncome: function() {
        
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    
        return this.incomeMonth;
    },

    getBudget: function() {
        this.budgetMonth = this.budget;
        this.budgetMonth += this.sumAdditionIncome();

        this.budgetDay = +Math.floor((this.budgetMonth - this.expensesMonth) / 30);
    
    },
    getExpensesMonth: function() {

        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },
    getTargetMonth: function() {

        return Math.ceil(targetAmount.value / this.budgetMonth);
        
    },

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
    
    calcSavedMonth: function() {
        
        return (this.budgetMonth - resExpensesMonth.value) * periodSelect.value;
    },

    periodAmount:   function() {
        periodSelect.addEventListener('input', () => {
            titlePeriodAmount.textContent = periodSelect.value;});
    },
      
    numBudget:  function() {
        this.budget = +this.budget;
        return;
    },

    showBtnReset: function() {
        btnStart.style.display = 'none';
        btnCancel.style.display= 'block';
    },

    showBtnStart:   function() {
        btnCancel.style.display='none';
        btnStart.style.display='block';
    },

    frezeInput: function() { 
        
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
    },


    
};

appData.periodAmount();

let this1 = appData;


expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);

btnStart.addEventListener('click', appData.start.bind(appData));
btnCancel.addEventListener('click', appData.reset.bind(appData));

// appData.accumulatedMonth = appData.getBudget();

