'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const tabs = () => {
    const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
    const cardDetailsTitleElem = document.querySelector('.card-details__title');
    const cardImageItemElems = document.querySelector('.card__image_item');
    const cardDetailsPriceElem = document.querySelector('.card-details__price');
    const descriptionMemory = document.querySelector('.description__memory');

    // данные
    const data = [{
        name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
        img: 'img/iPhone-graphite.png',
        price: 95900,
        memoryROM: 128,
      },
      {
        name: 'Смартфон Apple iPhone 12 Pro 128GB Silver',
        img: 'img/iPhone-silver.png',
        price: 120900,
        memoryROM: 256,
      },
      {
        name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
        img: 'img/iPhone-blue.png',
        price: 9900,
        memoryROM: 128,
      }
    ];

// деативация табов
    const deactive = ( ) => {
      cardDetailChangeElems.forEach(btn => btn.classList.remove('active'))
    };

    // вывод нужного таба (по которому кликнули)
    cardDetailChangeElems.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (!btn.classList.contains('active')) {
          deactive();
          btn.classList.add('active');
          cardDetailsTitleElem.textContent = data[i].name;
          cardImageItemElems.src = data[i].img;
          cardImageItemElems.alt = data[i].name;
          cardDetailsPriceElem.textContent = data[i].price + '₽';
          descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`;
        }
      });
    });

  };















  tabs();



});