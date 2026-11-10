function calculateChange(amountDue, amountReceived) {
let cents = Math.round(amountReceived * 100) - Math.round(amountDue * 100);

const dollars = Math.floor(cents / 100);
cents = cents % 100;
const quarters = Math.floor(cents / 25);
cents = cents % 25;
const dimes = Math.floor(cents / 10);
cents = cents % 10;
const nickels = Math.floor(cents / 5);
const pennies = cents % 5;

return { dollars, quarters, dimes, nickels, pennies };
}

//function animateNumber(el, target, duration = 700) {
 //   const start = performance.now();
 //   function frame(now) {
 //   const progress = Math.min((now - start) / duration, 1);
 //   el.textContent = Math.round(target * progress);
 //   if (progress < 1) requestAnimationFrame(frame);
//}
//requestAnimationFrame(frame);
//}

function handleCalculate() {
 const due = parseFloat(document.getElementById('amount-due').value);
 const received = parseFloat(document.getElementById('amount-received').value);
 const message = document.getElementById('message');
 const names = ['dollars', 'quarters', 'dimes', 'nickels', 'pennies'];

 message.textContent = '';
 message.className = '';

 if (isNaN(due) || isNaN(received) || due < 0 || received < 0) {
    message.textContent = 'Please enter valid amounts.';
    message.className = 'error';
    names.forEach(n => (document.getElementById(`${n}-output`).textContent = 0));
    return;
 }
 if (received < due) {
    message.textContent = 'Not enough money received. Customer still owes $' + (due - received).toFixed(2) + '.';
    message.className = 'error';
    names.forEach(n => (document.getElementsById(`${n}-output`).textContent = 0));
    return;
 }
 const change = calculateChange(due, received);
 message.textContent = 'Total change: $' + (received - due).toFixed(2);
 names.forEach(n => {
    const el = document.getElementById(`${n}-output`);
    el.textContent = change[n];
    el.closest('.coin').classList.remove('slide-in');
    void el.offsetWidth;
    el.closest('.coin').classList.add('slide-in');
 });
}
if (typeof document !== 'undefined') {
    document.getElementById('calculate-change').addEventListener('click', handleCalculate);
}
if (typeof module !== 'undefined') {
    module.exports = {calculateChange, handleCalculate};
}