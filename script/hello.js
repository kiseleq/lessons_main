'use strict';
const money = prompt('Ваш месячный доход?');
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const mission = 6305;

let deposit = confirm('Есть ли у вас дпозит в банке?');

console.log(typeof deposit);
console.log(deposit);

const expenses1 = prompt('Введите обязательную статью расходов');
const amount1 = prompt ('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов');
const amount2 = prompt ('Во сколько это обойдется?');



const budgetMonth = money - amount1 - amount2;
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








