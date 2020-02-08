/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    const newArr = [];
  
    for (let i = 0; i< array.length; i++) {
        newArr.push(fn(array[i], i, array));
    }
    
    return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let currentValue = initial || array[0],
        i = initial ? 0 : 1;

    for (; i < array.length; i++) {
        currentValue = fn(currentValue, array[i], i, array);
    }

    return currentValue;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    const keyArray = [];

    // eslint-disable-next-line guard-for-in
    for (let key in obj) {
        keyArray.push(key.toUpperCase());
    }
    
    return keyArray;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
      
    // var newArr = [];
  
    // if (from < 0 && Math.abs(from) > array.length || from > array.length) {
    //     // eslint-disable-next-line no-undef
    //     from = array.length;
    // } else if ( from < 0) {
    //     from = array.length + from;
    // }
  
    // if (to < 0 && Math.abs(to) > array.length || to > array.length) {
    //     to = array.length;
    // } else if (to < 0) {
    //     // eslint-disable-next-line no-undef
    //     to = array.length + to;
    // }
  
    // for (; from < to; from++) {
    //     // eslint-disable-next-line no-undef
    //     newArr.push(array[from]);
    // }
    
    // return newArr;

    var array2 = [];

    // eslint-disable-next-line no-nested-ternary
    (from < 0 && Math.abs(from) > array.length)? from = 0:
        // eslint-disable-next-line no-nested-ternary
        (from < 0)? from = array.length + from:
            (from > array.length)? from = array.length:
                from;

    // eslint-disable-next-line no-nested-ternary
    (to < 0 && Math.abs(to) < array.length)? to = array.length + to:
        (to > array.length)? to = array.length:
            to;
    
    for (var i = from; i < to; i++) {
        array2.push(array[i]);
    }

    return array2;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    const handler = {
        get(target, name) {
            return target[name] * target[name];
        }
    }

    return new Proxy(obj, handler)
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
