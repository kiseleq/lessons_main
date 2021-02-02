'use strict';
const money = prompt('Ваш месячный доход?'),
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
mission = 6305,
deposit = confirm('Есть ли у вас дпозит в банке?'),
expenses1 = prompt('Введите обязательную статью расходов'),
amount1 = prompt ('Во сколько это обойдется?'),
expenses2 = prompt('Введите обязательную статью расходов'),
amount2 = prompt ('Во сколько это обойдется?'),
budgetMonth = money - amount1 - amount2;

console.log('Миссия будет достигнута за ' + Math.ceil(mission / budgetMonth) + ' месяцев');

const income = 'Макдональдс',
    period = 5,
    budgetDay = budgetMonth / 30;
console.log('Бюджет на день ' + Math.floor(budgetDay));

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
  
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(income.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));








