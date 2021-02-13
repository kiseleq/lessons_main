'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let btnStart = document.getElementById('start'),
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
    
    console.log(adExpensesTitle);
    console.log(resAdditionExp);

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
        return salaryAmount.value == '';
     },
 

    start : function() {
        
        if (appData.isNumberSalary()){return;}
        appData.budget = salaryAmount.value;
        console.log(salaryAmount.value);

        appData.getExpenses();
        appData.getIncome();
        console.log(appData.income);
        appData.getExpensesMonth();
        appData.getBudget();
        appData.periodAmount();

        appData.sumAdditionIncome();

        appData.getAddExpenses();
        appData.getAddIncome();
        appData.showResult();
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
        if (incomeItems.length === 2) {incomeAdd.style.display = 'none'; }
    },

    getExpenses: function(){
        expensesItems.forEach(function(item){
            console.log(item);
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    getIncome: function(){
        incomeItems.forEach(function(item){
            console.log(item);
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
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
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function() {
        additionalIncome.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !==''){
                appData.addIncome.push(itemValue);
            }
        });

        
    },

    asking: function() {

        if(confirm('Есть ли у вас дополнительный источник заработака?')){
            let itemIncome;
            do {itemIncome = prompt('Какой у вас дополнительный заработок?');} while (itemIncome === null || itemIncome.trim().length == 0 || isNumber(itemIncome));
            
            let cashIncome;
            do {cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');} while (cashIncome === null || cashIncome.trim().length == 0 || !isNumber(cashIncome));
            cashIncome = +cashIncome;
            appData.income[itemIncome] = cashIncome;
        }

        // let addExpenses;
        // do {addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');} while (isNumber(addExpenses) || addExpenses === null || addExpenses.trim().length == 0);

        // if (addExpenses !== null){appData.addExpenses = addExpenses.toLowerCase().split(', ');}

        appData.deposit = confirm('Есть ли у вас дпозит в банке?');

        appData.getInfoDeposit();
        
        let sum;

    },


    sumAdditionIncome: function() {
        let sum = 0;
        for (let key in appData.income) {
            sum += +this.income[key];
        }
        console.log(sum);
        return sum;
    },

    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetMonth = +appData.budgetMonth;
        appData.budgetMonth += appData.sumAdditionIncome();
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            console.log('У вас высокий уровень дохода');
        }
        else if ((appData.budgetDay < 1200) && (appData.budgetDay >= 600)) {
            console.log('У вас средний уровень дохода');
        }
        else if ((appData.budgetDay < 600) && (appData.budgetDay >= 0)) {
            console.log('К сожалению, у вас уровень дохода ниже среднего');
        }
        else if (appData.budgetDay < 0) {
            console.log('Что-то пошло не так');
        } 
    },
    getInfoDeposit: function(){
        if(appData.deposit){

            do {appData.percentDeposit = prompt('Какой годовой процент?')} while (appData.percentDeposit === null || appData.percentDeposit.trim().length == 0 || !isNumber(appData.percentDeposit));
            appData.percentDeposit = +appData.percentDeposit;

            do {appData.moneyDeposit = prompt('Какая сумма заложена?')} while (appData.moneyDeposit === null || appData.moneyDeposit.trim().length == 0 || !isNumber(appData.moneyDeposit));
            appData.moneyDeposit = +appData.moneyDeposit;
        }
    },
    calcSavedMonth: function(){
        return appData.budgetMonth * periodSelect.value;
    },

    periodAmount: function(){
        periodSelect.addEventListener('change', function(){titlePeriodAmount.textContent = periodSelect.value;});
    },
        
};

expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);

btnStart.addEventListener('click', appData.start);

appData.accumulatedMonth = appData.getBudget();

appData.getStatusIncome();

// console.log( appData.expenses );
// console.log("Расходы за месяц " + appData.expensesMonth );

// if (appData.getTargetMonth() > 0 && isFinite(appData.getTargetMonth())){
    
//     console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)');

// } 
// else {
//     console.log('Цель не будет достигнута');
// }

// let str = '';
// for (let i = 0; i < appData.addExpenses.length; i++) {
//     str += appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);
//     if ((i + 1) == appData.addExpenses.length) {console.log(str)}
//     else {str += ', '}
// }


// console.log('Наша программа включает в себя данные: ');
// for (let key1 in appData) {
//     if ((typeof appData[key1]) !== "function" && (typeof appData[key1]) !== "object")
//     { console.log(key1 + " : " + appData[key1]);}
// }

