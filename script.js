let userData = {
    USD: 1000,
    EUR: 900,
    UAH: 15000,
    BIF: 20000,
    AOA: 100,
},
    bankData = {
        USD: {
            max: 3000,
            min: 100,
            img: "💵",
        },
        EUR: {
            max: 1000,
            min: 50,
            img: "💶",
        },
        UAH: {
            max: 0,
            min: 0,
            img: "💴",
        },
        GBP: {
            max: 10000,
            min: 100,
            img: "💷",
        },
    };

const wrapp = document.querySelector('.wrapp');
const btnContainer = document.querySelector('.btn-container');
const h1 = document.querySelector('h1');

const finalMsg = document.createElement('p');
const doneBtn = document.createElement('button');
const checkBalanceBtn = document.createElement('button');
const withdrawBtn = document.createElement('button');
const err = document.createElement('p');
const errAmount = document.createElement('p');

err.classList.add('error');
errAmount.classList.add('error');

finalMsg.innerText = 'Thank you, have a nice day 😊';
err.innerText = 'Please enter a valid currency.';
doneBtn.innerText = 'Done';
checkBalanceBtn.innerText = 'Check Balance';
withdrawBtn.innerText = 'Withdraw money';

doneBtn.addEventListener('click', () => {
    location.reload();
});

btnContainer.append(checkBalanceBtn, withdrawBtn);

function getMoney(userData, bankData) {
    return new Promise((resolve, reject) => {
        checkBalanceBtn.addEventListener('click', () => {
            resolve();
        });

        withdrawBtn.addEventListener('click', () => {
            reject();
        });
    }).then(
        () => {
            btnContainer.innerHTML = '';
            h1.innerText = 'Please enter your currency : ';

            const input = document.createElement('input');
            const submitBtn = document.createElement('button');

            submitBtn.innerText = 'Submit';

            input.type = 'text';
            input.placeholder = 'Enter currency here';

            btnContainer.append(input, submitBtn);

            submitBtn.addEventListener('click', () => {
                try {
                    if (userData[input.value.toUpperCase()]) {
                        btnContainer.innerHTML = '';
                        err.innerHTML = '';

                        h1.innerText = `Balance is : ${userData[input.value.toUpperCase()]
                            } ${input.value.toUpperCase()}`;

                        btnContainer.append(doneBtn);
                    } else {
                        wrapp.append(err);
                    }
                } finally {
                    h1.append(finalMsg);
                }
            });
        },

        () => {
            btnContainer.innerHTML = '';
            h1.innerText = 'Please enter your currency and amount : ';

            const inputCurrency = document.createElement("input");
            const inputAmount = document.createElement("input");
            const submitBtn = document.createElement("button");

            submitBtn.innerText = 'Submit';

            inputCurrency.type = 'text';
            inputAmount.type = 'number';

            inputAmount.placeholder = 'Enter amount here';
            inputCurrency.placeholder = 'Enter currency here';

            btnContainer.append(inputAmount, inputCurrency, submitBtn);

            submitBtn.addEventListener('click', () => {
                try {
                    if (userData[inputCurrency.value.toUpperCase()]
                        && inputAmount.value <= userData[inputCurrency.value.toUpperCase()]
                        && inputAmount.value >= bankData[inputCurrency.value.toUpperCase()].min
                        && inputAmount.value <= bankData[inputCurrency.value.toUpperCase()].max) {

                        btnContainer.innerHTML = '';
                        err.innerHTML = '';
                        errAmount.innerHTML = '';

                        h1.innerText = `Here is your cash : ${inputAmount.value} ${inputCurrency.value.toUpperCase()} 💵.`;

                        btnContainer.append(doneBtn);
                    } else if (!userData[inputCurrency.value.toUpperCase()]) {
                        wrapp.append(err);
                    } else if (inputAmount.value >= userData[inputCurrency.value.toUpperCase()]
                        || inputAmount.value >= bankData[inputCurrency.value.toUpperCase()].max) {

                        errAmount.innerText = `The entered amount is greater than the allowed maximum. Maximum withdrawal amount is : ${bankData[inputCurrency.value.toUpperCase()].max}`;

                        wrapp.append(errAmount);
                    } else if (inputAmount.value <= 0 || inputAmount.value <= bankData[inputCurrency.value.toUpperCase()].min) {

                        errAmount.innerText = `The entered amount is less than the allowed minimum. Minimum withdrawal amount: is : ${bankData[inputCurrency.value.toUpperCase()].min}`;

                        wrapp.append(errAmount);
                    }
                } finally {
                    h1.append(finalMsg);
                }
            });
        }
    )
}

getMoney(userData, bankData);