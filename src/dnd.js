/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
        
    let maxWidth = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    let maxHeight = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
    );

    function getRandomColor() {
        let color = '';

        for (let i = 0; i < 3; i++) {
            let sub = Math.floor(Math.random() * 256).toString(16);

            color += (sub.length === 1 ? '0' + sub : sub);
        }
  
        return `#${color}`;
    }

    let divElem = document.createElement('div'); // Create new DIV tag

    divElem.classList.add('draggable-div'); // Add 'draggable-div' class 
    divElem.style.backgroundColor = getRandomColor(); // Add random color
    divElem.style.width = Math.random() * maxWidth + 'px'; // Add random width
    divElem.style.height = Math.random() * maxHeight + 'px'; // Add random height
    divElem.style.left = Math.random() * maxWidth + 'px'; // Add random horizontal position
    divElem.style.top = Math.random() * maxHeight + 'px'; // Add random vertical position

    return divElem;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.onmousedown = function(event) { // (1) отследить нажатие
        // (2) подготовить к перемещению:
        // разместить поверх остального содержимого и в абсолютных координатах
        target.style.position = 'absolute';
        target.style.zIndex = 1000;
        // переместим в body, чтобы target был точно не внутри position:relative
        document.body.append(target);
        // и установим абсолютно спозиционированный target под курсор
    
        moveAt(event.pageX, event.pageY);
    
        // передвинуть target под координаты курсора
        // и сдвинуть на половину ширины/высоты для центрирования
        function moveAt(pageX, pageY) {
            target.style.left = pageX - target.offsetWidth / 2 + 'px';
            target.style.top = pageY - target.offsetHeight / 2 + 'px';
        }
    
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }
    
        // (3) перемещать по экрану
        document.addEventListener('mousemove', onMouseMove);
    
        // (4) положить target, удалить более ненужные обработчики событий
        target.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            target.onmouseup = null;
        };
    
    };
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
