'use strict';

let money,
    sum = 0,
    sum1,
    expenses = [];

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

};

appData.asking();
 
    appData.getExpensesMonth = function() {

    for (let i=0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов');
            
        do {
            sum1 = prompt('Во сколько вам это обойдётся?');
        }
        while(!isNumber(sum1));
            sum1 = +sum1;
            sum += sum1;
        }

        sum = sum;
        return sum;
    };
const     
    expensesAmount = appData.getExpensesMonth();

    appData.getAccumulatedMonth = function () {
        return money - expensesAmount;
    };
const    accumulatedMonth = appData.getAccumulatedMonth();

    appData.getTargetMonth = function () {
        return Math.ceil(appData.mission / accumulatedMonth);
    },
    appData.budgetDay = Math.floor(appData.getAccumulatedMonth() / 30);
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

console.log('Бюджет на день ' + appData.budgetDay);
console.log(expensesAmount);
appData.getStatusIncome();

if (appData.getTargetMonth() > 0 && isFinite(appData.getTargetMonth())){
    
    console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)');
}

    else  {
        console.log('Цель не будет достигнута');
    }
