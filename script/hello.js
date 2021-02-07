'use strict';

let money,
    sum1;

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
},
    start = function() {
        do {
            money = prompt('Ваш месячный доход?');
        }
        while(!isNumber(money));
    };

start();
money = +(money);


let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 5000,
    period: 3,
    asking: function() {
        const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас дпозит в банке?');
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    accumulatedMonth: 0,
};

appData.asking = function() {
    
    let sum;

    for (let i = 0; i < 2; i++) {
        let res = prompt('Введите обязательную статью расходов');

        do {
            sum = prompt('Во сколько вам это обойдется');
        }
        while(!isNumber(sum));

        appData.expenses[res] = +sum;
    }
    console.log( appData.expenses);
};

appData.getExpensesMonth = function() {
    
    for (let key in appData.expenses) {
        appData.expensesMonth += appData.expenses[key];
    }

    console.log('Расходы за месяц ' + appData.expensesMonth );
};

appData.asking();
appData.getExpensesMonth();

appData.getBudget = function () {
    appData.budgetMonth = money - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
};
appData.getBudget();

appData.accumulatedMonth = appData.getBudget();

appData.getTargetMonth = function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
};

appData.getStatusIncome = function () {
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
};


appData.getStatusIncome();

if (appData.getTargetMonth() > 0 && isFinite(appData.getTargetMonth())){
    
    console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)');
}

    else  {
        console.log('Цель не будет достигнута');
    }
    
console.log('Наша программа включает в себя данные: ');
for (let key1 in appData) {
    console.log(key1);
}