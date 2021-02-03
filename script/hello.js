'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    mission = 6305,
    deposit = confirm('Есть ли у вас дпозит в банке?'),
    income = 'Макдональдс',
    period = 5;

    let money;

const start = function() {
        do {
            money = +prompt('Ваш месячный доход?');
        }
        while(!isNumber(money));
    };

start();

let expenses1, expenses2;
const getExpensesMonth = function() {
        let sum = 0;

        for (let i=0; i < 2; i++){
            if (i === 0) {
                expenses1 = prompt('Введите обязательную статью расходов');
            } else if (i === 1) {
                expenses2 = prompt('Введите обязательную статью расходов');
            }
            
            do {
                sum = +prompt('Во сколько вам это обойдётся?');
            }
            while(!isNumber(sum));

            
        }

        console.log(sum);
        return sum;
    },

    expensesAmount = getExpensesMonth(),

    getAccumulatedMonth = function () {
        return money - expensesAmount;
    },
    accumulatedMonth = getAccumulatedMonth(),
    showTypeOf = function(varible) {
        return console.log(typeof varible);
    },
    getTargetMonth = function () {
        return Math.floor(mission / accumulatedMonth);
    },
    budgetDay = getAccumulatedMonth() / 30,
    getStatusIncome = function () {
        if (Math.floor(budgetDay) >= 1200) {
            console.log('У вас высокий уровень дохода');
        }
        else if ((Math.floor(budgetDay) < 1200) && (Math.floor(budgetDay) >= 600)) {
            console.log('У вас средний уровень дохода');
        }
        else if ((Math.floor(budgetDay) < 600) && (Math.floor(budgetDay) >= 0)) {
            console.log('К сожалению, у вас уровень дохода ниже среднего');
        }
        else if (Math.floor(budgetDay) < 0) {
            console.log('Что-то пошло не так');
        } 
    };

console.log('Бюджет на день ' + Math.floor(budgetDay));
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(expensesAmount);
console.log(addExpenses.toLowerCase().split(', '));
getStatusIncome();

if (getTargetMonth() > 0 ){
    console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяцев(-а)');
}
    else {
        console.log('Цель не будет достигнута');
    }










