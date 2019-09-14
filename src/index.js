/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    let milliSeconds = seconds * 1000;

    return new Promise((resolve) => {
        setTimeout(() => resolve(), milliSeconds );
    });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    return new Promise((resolve, reject) => {
        let newXhr = new XMLHttpRequest();

        newXhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
        newXhr.send();
        newXhr.onload = () => {
            if (newXhr.status != 200) {
                reject('Не удалось загрузить города');
            } else {
                let result = JSON.parse(newXhr.responseText).sort((val1, val2) => {
                    if (val1.name > val2.name) {
                        return 1;
                    } else if (val1.name < val2.name) {
                        return -1;
                    }
                });
    
                resolve(result);
            }
        };
        newXhr.onerror = () => {
            reject('Не удалось загрузить города');
        }
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
