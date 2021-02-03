'use strict';
const money = +prompt('Ваш месячный доход?'),
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    mission = 6305,
    deposit = confirm('Есть ли у вас дпозит в банке?'),
    expenses1 = prompt('Введите обязательную статью расходов'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов'),
    amount2 = +prompt('Во сколько это обойдется?'),
    income = 'Макдональдс',
    period = 5,

    getExpensesMonth = function() {
        return amount1 + amount2;
    },
    getAccumulatedMonth = function () {
        return money - getExpensesMonth();
    },
    accumulatedMonth = getAccumulatedMonth(),
    showTypeOf = function(varible) {
        return console.log(typeof varible);
    },
    getTargetMonth = function () {
        return Math.floor(mission / accumulatedMonth);
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
console.log(getExpensesMonth());
console.log(addExpenses.toLowerCase().split(', '));
console.log(getTargetMonth());
getStatusIncome();






