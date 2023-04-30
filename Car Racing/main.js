class Car {
    constructor(inputName) {
        this.carName = inputName;
        this.order = 0;
        this.position = 0;
    }
}
// فانکشن دریافت ورودی
function raceGameRunner() {
    let userInput = prompt("Enter cars count:");
    if (userInput === null) {
        throw new Error("User cancelled the prompt.");
    }
    const carCount = parseInt(userInput);
    raceGame(carCount);
}
// فانکشن عملیات بازی
function raceGame(carCount) {
    let cars = [];
    for (let i = 0; i < carCount; i++) {
        let inputCarName = prompt(`you have ${carCount} cars. Enter name of car ${i + 1}`);
        if (inputCarName !== null) {
            cars.push(new Car(inputCarName));
        }
    }
    // گرفتن شماره رندوم به ماشین
    let randomOrders = randomOrder(carCount);
    cars.forEach((item, index) => {
        item.order = randomOrders[index];
        item.position = 0;
    });
    // برای شروع کردن ماشین ها
    cars.sort((a, b) => {
        return a.order - b.order;
    });
    let map = [..."*".repeat(300)];
    let ranking = [];
    while (cars.filter((item) => {
        return item.position > 300;
    }).length < carCount) {
        let dice = diceArray(10, carCount);
        map = [..."-".repeat(300)];
        for (let i = 0; i < carCount; i++) {
            cars[i].position += dice[i];
            if (cars[i].position < 300) {
                map[cars[i].position] = cars[i].carName;
                cars
                    .filter((el) => {
                    return el.position === cars[i].position && el.carName !== cars[i].carName;
                })
                    .forEach((comp) => {
                    comp.position = 0;
                });
            }
            else {
                ranking.push(cars[i].carName);
            }
        }
        console.log(map.join(""));
    }
    console.log(`Winner is ${ranking[0]}`);
}
function randomOrder(InputCarCount) {
    let randomNumbers = [];
    while (randomNumbers.length < InputCarCount) {
        let randOrder = Math.floor(Math.random() * InputCarCount) + 1;
        if (!randomNumbers.includes(randOrder)) {
            randomNumbers.push(randOrder);
        }
    }
    return randomNumbers;
}
function diceArray(inputMax, inputCount) {
    let diceOrder = [];
    while (diceOrder.length < inputCount) {
        diceOrder.push(Math.floor(Math.random() * inputMax) + 1);
    }
    return diceOrder;
}
raceGameRunner();
