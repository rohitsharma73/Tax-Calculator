const numberValidation = document.querySelectorAll(".number-validate");
const exclamationMarks = document.querySelectorAll(".exclamation-mark");
const form = document.getElementById('form');
const ageGroup = document.getElementById('age-group');
const requiredMark = document.querySelector('.required-mark');
const modal = document.getElementById('modal');
const closeModalButton = document.querySelector('.close');
const grossIncomeInput = document.getElementById('gross-income');
const extraIncomeInput = document.getElementById('extra-income');
const deductionsInput = document.getElementById('deduction');
const incomeResultElement = document.getElementById('income-result');

// number validation 
numberValidation.forEach(function (input) {
    input.addEventListener("keypress", function (event) {
        let charCode = event.which || event.keycode;
        if (charCode >= 48 && charCode <= 57) {
            input.nextElementSibling.style.visibility = "hidden";
        } else {
            input.nextElementSibling.style.visibility = "visible";
        }
    });
});

// tax calculation
function calculateIncome(grossIncome, extraIncome, deductions, ageGroup) {
    const totalIncome = parseInt(grossIncome) + parseInt(extraIncome) - parseInt(deductions);
        if (totalIncome <= 800000) {
        return 0;
    }
    const taxableAmount = totalIncome - 800000;

    let taxRate;
    switch (ageGroup) {
        case '<40':
            taxRate = 0.3;
            break;
        case '≥ 40 & < 60':
            taxRate = 0.4;
            break;
        case '≥ 60':
            taxRate = 0.1;
            break;
        default:
            taxRate = 0;
    }
    const tax = taxRate * taxableAmount;
    return totalIncome - tax;
}

// function for close and open model
function openModal() {
    modal.style.display = 'flex';
}
function closeModal() {
    modal.style.display = 'none';
}
closeModalButton.addEventListener('click', closeModal);

// Submit event listener
form.addEventListener('submit', event => {
    event.preventDefault();
    
    let exclamationMarkVisible = false;
    exclamationMarks.forEach(mark => {
        if (mark.style.visibility === 'visible') {
            exclamationMarkVisible = true;
        }
    });

    if (exclamationMarkVisible) {
        return;
    }

    const grossIncome = grossIncomeInput.value;
    const extraIncome = extraIncomeInput.value;
    const deductions = deductionsInput.value;
    const ageGroupValue = ageGroup.value;

    
    if (ageGroupValue === '') {
        requiredMark.style.visibility = 'visible';
    } else {
        requiredMark.style.visibility = 'hidden';
        const income = calculateIncome(grossIncome, extraIncome, deductions, ageGroupValue);
        incomeResultElement.textContent = `${income}`;
        openModal();
    }
});
