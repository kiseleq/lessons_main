// 'use strict';

// let money;

// const isNumber = function(n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// },
// start = function() {
//     do {
//         money = prompt('Ваш месячный доход?');
//     }
//     while(!isNumber(money));
// };

// start();
// money = +(money);

// const appData = {
//     income: {},
//     addIncome: [],
//     expenses: {},
//     addExpenses: [],
//     deposit: false,
//     percentDeposit: 0,
//     moneyDeposit: 0,
//     mission: 5000,
//     period: 3,
//     budget: money,
//     budgetDay: 0,
//     budgetMonth: 0,
//     expensesMonth: 0,
//     accumulatedMonth: 0,

//     asking: function() {

//         if(confirm('Есть ли у вас дополнительный источник заработака?')){
//             let itemIncome;
//             do {itemIncome = prompt('Какой у вас дополнительный заработок?');} while (itemIncome === null || itemIncome.trim().length == 0 || isNumber(itemIncome));
            
//             let cashIncome;
//             do {cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');} while (cashIncome === null || cashIncome.trim().length == 0 || !isNumber(cashIncome));
//             cashIncome = +cashIncome;
//             appData.income[itemIncome] = cashIncome;
//         }

//         let addExpenses;
//         do {addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');} while (isNumber(addExpenses) || addExpenses === null || addExpenses.trim().length == 0);

//         if (addExpenses !== null){appData.addExpenses = addExpenses.toLowerCase().split(', ');}

//         appData.deposit = confirm('Есть ли у вас дпозит в банке?');

//         appData.getInfoDeposit();
        
//         let sum;

//     for (let i = 0; i < 2; i++) {
//         let res;
//         do {res = prompt('Введите обязательную статью расходов');} while (res === null || res.trim().length == 0 || isNumber(res));

//         do {
//             sum = prompt('Во сколько вам это обойдется');
//         }
//         while(!isNumber(sum));

//         appData.expenses[res] = +sum;
//     }
//     },
//     getBudget: function () {
//         appData.budgetMonth = money - appData.expensesMonth;
//         appData.budgetDay = Math.floor(appData.budgetMonth / 30);
//         return appData.budgetMonth;
//     },
//     getExpensesMonth: function() {
    
//         for (let key in appData.expenses) {
//             appData.expensesMonth += appData.expenses[key];
//         }
//     },
//     getTargetMonth: function () {
//         return Math.ceil(appData.mission / appData.budgetMonth);
//     },
//     getStatusIncome: function () {
//         if (appData.budgetDay >= 1200) {
//             console.log('У вас высокий уровень дохода');
//         }
//         else if ((appData.budgetDay < 1200) && (appData.budgetDay >= 600)) {
//             console.log('У вас средний уровень дохода');
//         }
//         else if ((appData.budgetDay < 600) && (appData.budgetDay >= 0)) {
//             console.log('К сожалению, у вас уровень дохода ниже среднего');
//         }
//         else if (appData.budgetDay < 0) {
//             console.log('Что-то пошло не так');
//         } 
//     },
//     getInfoDeposit: function(){
//         if(appData.deposit){

//             do {appData.percentDeposit = prompt('Какой годовой процент?')} while (appData.percentDeposit === null || appData.percentDeposit.trim().length == 0 || !isNumber(appData.percentDeposit));
//             appData.percentDeposit = +appData.percentDeposit;

//             do {appData.moneyDeposit = prompt('Какая сумма заложена?')} while (appData.moneyDeposit === null || appData.moneyDeposit.trim().length == 0 || !isNumber(appData.moneyDeposit));
//             appData.moneyDeposit = +appData.moneyDeposit;
//         }
//     },
//     calcSavedMonth: function(){
//         return appData.budgetMonth * appData.period;
//     },
// };

// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();

// appData.accumulatedMonth = appData.getBudget();

// appData.getStatusIncome();

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

const btnStart = document.getElementById('start'),
    btnPlus1 = document.getElementsByTagName('button')[0],
    btnPlus2 = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('.deposit-checkmark'),
    additionalIncome = document.querySelectorAll('.additional_income-item'),

    resBudgetMonth = document.getElementsByClassName('result-budget_month')[0],
    resBudgetDay = document.getElementsByClassName('result-budget_day')[0],
    resExpensesMonth = document.getElementsByClassName('result-expenses_month')[0],
    resAdditionIncome = document.getElementsByClassName('result-additional_income')[0],
    resAdditionExp = document.getElementsByClassName('result-additional_expenses')[0],
    resIncomePeriod = document.getElementsByClassName('result-income_period')[0],
    resTargetMonth = document.getElementsByClassName('result-target_month')[0],
    
    salaryAmount = document.getElementsByClassName('salary-amount')[0],
    adIncomeTitle = document.getElementsByClassName('income-title')[0],
    adIncomeAmount = document.getElementsByClassName('income-amount')[0],
    expensesTitle = document.getElementsByClassName('expenses-title')[0],
    expensesAmount = document.getElementsByClassName('expenses-amount')[0],
    adExpensesTitle = document.getElementsByClassName('additional_expenses-title')[0],
    targetAmount = document.getElementsByClassName('target-amount')[0],
    periodSelect = document.getElementsByClassName('period-select')[0];

console.dir(btnStart);
console.dir(btnPlus1);
console.dir(checkBox);
console.dir(additionalIncome);

console.dir(resBudgetMonth);
console.dir(resBudgetDay);
console.dir(resExpensesMonth);
console.dir(resAdditionIncome);
console.dir(resAdditionExp);
console.dir(resIncomePeriod);
console.dir(resTargetMonth);

console.dir(salaryAmount);
console.dir(adIncomeTitle);
console.dir(adIncomeAmount);
console.dir(expensesTitle);
console.dir(expensesAmount);
console.dir(adExpensesTitle);
console.dir(targetAmount);
console.dir(periodSelect); 
    
    
    