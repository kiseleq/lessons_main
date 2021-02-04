'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

 let money;
 
const start = function() {
        do {
            money = prompt('Ваш месячный доход?');
        }
        while(!isNumber(money));
    };

start();
money = +(money);

const 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    mission = 6305,
    deposit = confirm('Есть ли у вас дпозит в банке?'),
    income = 'Макдональдс',
    period = 5;

let sum = 0;
let sum1;
let expenses = [];
const getExpensesMonth = function() {

        for (let i=0; i < 2; i++){

            expenses[i] = prompt('Введите обязательную статью расходов');
            
            do {
                sum1 = prompt('Во сколько вам это обойдётся?');
            }
            while(!isNumber(sum1));
            sum += sum1;
            
        }
        sum = +sum;
        return sum;
    };
    

   const expensesAmount = getExpensesMonth(),

    getAccumulatedMonth = function () {
        return money - expensesAmount;
    },
    accumulatedMonth = getAccumulatedMonth(),
    showTypeOf = function(varible) {
        return console.log(typeof varible);
    },
    getTargetMonth = function () {
        return Math.ceil(mission / accumulatedMonth);
    },
    budgetDay = Math.floor(getAccumulatedMonth() / 30),
    getStatusIncome = function () {
        if (budgetDay >= 1200) {
            console.log('У вас высокий уровень дохода');
        }
        else if ((budgetDay < 1200) && (budgetDay >= 600)) {
            console.log('У вас средний уровень дохода');
        }
        else if ((budgetDay < 600) && (budgetDay >= 0)) {
            console.log('К сожалению, у вас уровень дохода ниже среднего');
        }
        else if (budgetDay < 0) {
            console.log('Что-то пошло не так');
        } 
    };

console.log('Бюджет на день ' + budgetDay);
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(expensesAmount);
console.log(addExpenses.toLowerCase().split(', '));
getStatusIncome();

if (getTargetMonth() > 0 && isFinite(getTargetMonth())){
    
    console.log('Цель будет достигнута за ' + getTargetMonth() + ' месяцев(-а)');
}

    else  {
        console.log('Цель не будет достигнута');
    }
