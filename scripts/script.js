'use strict';

//  получаем данные
const getData = (url, callback) => {
  const request = new XMLHttpRequest(); // запрос на сервер
  request.open('GET', url);

  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) return; // ждём ответ
    if (request.status === 200) { //если данные получены
      const response = JSON.parse(request.response); //переводим их в нужный вид
      callback(response);
    } else {
      console.error(new Error('Ошибка: ' + request.status));
    }
  });
  request.send();
}

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
    const deactive = () => {
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

  // аккордеон
  const accordion = () => {
    const characteristicsListElem = document.querySelector('.characteristics__list');
    const characteristicsItemElems = document.querySelectorAll('.characteristics__item');

    characteristicsItemElems.forEach(elem => { //если нужно, чтоб 1 была сразу открыта
      if (elem.children[1].classList.contains('active')) {
        elem.children[1].style.height = `${elem.children[1].scrollHeight}px`;
      }
    });

    const open = (button, dropDown) => { //открывает одну плашку аккордеона
      closeAllDrops(button, dropDown);
      dropDown.style.height = `${dropDown.scrollHeight}px`;
      button.classList.add('active');
      dropDown.classList.add('active');
    };

    const close = (button, dropDown) => { //закрывает одну плашку аккордеона
      button.classList.remove('active');
      dropDown.classList.remove('active');
      dropDown.style.height = '';
    };

    // закрывает весь аккордеон
    const closeAllDrops = (button, dropDown) => {
      characteristicsItemElems.forEach((elem) => {
        if (elem.children[0].classList.contains('active')) {
          close(elem.children[0], elem.children[1]);
        }
      })

    }
    characteristicsListElem.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('characteristics__title')) {
        const parent = target.closest('.characteristics__item');
        const description = parent.querySelector('.characteristics__description');
        description.classList.contains('active') ?
          close(target, description) : open(target, description);
      }

      document.body.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.closest('.characteristics__list')) {
          closeAllDrops();
        };

      });

    });


    // setTimeout(closeAllDrops, 5000); //закрытие всех через 5с

  };
  //  работа с модальной формой
  const modal = () => {
    const cardDetailsButtonBuyElem = document.querySelector('.card-details__button_buy');
    const cardDetailsButtonDeliveryElem = document.querySelector('.card-details__button_delivery');
    const modalElem = document.querySelector('.modal');
    const cardDetailsTitleElem = document.querySelector('.card-details__title');
    const modalTitleElem = modalElem.querySelector('.modal__title');
    const modalSubtitleElem = modalElem.querySelector('.modal__subtitle');
    const modalTitleSubmitElem = modalElem.querySelector('.modal__title-submit');

    // закрытие модалки по escape
    const listenerEsc = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    }
    //  функция открытия модалки
    const openModal = (event) => {
      const target = event.target;
      modalElem.classList.add('open');
      disableScroll();
      document.addEventListener('keydown', listenerEsc);
      modalTitleElem.textContent = cardDetailsTitleElem.textContent;
      modalTitleSubmitElem.value = cardDetailsTitleElem.textContent;
      modalSubtitleElem.textContent = target.dataset.buttonBuy;
    };
    //  функция закрытия модалки
    const closeModal = () => {
      modalElem.classList.remove('open');
      enableScroll();
      document.removeEventListener('keydown', listenerEsc);
    };

    // открытие модалки при нажатии на кнопки
    cardDetailsButtonBuyElem.addEventListener('click', openModal);

    cardDetailsButtonDeliveryElem.addEventListener('click', openModal);
    // закрытие модалки
    modalElem.addEventListener('click', event => {
      const target = event.target;
      if (target.classList.contains('modal__close') || target === modalElem) {
        closeModal();
      };
    })

  };

  const renderCrossSell = () => {
    const COUNT_ROW_GOODS = 4;

    const crossSellListElem = document.querySelector('.cross-sell__list');
    const crossSellAddElem = document.querySelector('.cross-sell__add');
    const allGoods = [];
    let wrapRender = null;

    const createCrossSellItem = ({
      photo,
      name,
      price
    }) => {
      const liItem = document.createElement('li');
      liItem.innerHTML = `
      <article class="cross-sell__item">
        <img class="cross-sell__image" src="${photo}" alt="${name}">
        <h3 class="cross-sell__title">${name}</h3>
        <p class="cross-sell__price">${price}₽</p>
        <button type="button" class="button button_buy cross-sell__button">Купить</button>
      </article>
    `;
      return liItem;
    };

    //  рандомная сортировка массива
    const shuffle = arr => arr.sort(() => Math.random() - 0.5);

    const render = arr => {
      arr.forEach(item => {
        crossSellListElem.append(createCrossSellItem(item));
      });
    }

    // ограничевает количество вызовов функции
    const wrapper = (fn, count) => {
      let counter = 1;
      return (...args) => {
        if (counter === count - 1) crossSellAddElem.remove();
        if (counter === count) {
          return};
        counter++;
        return fn(...args)

      }
    };

    // запускает вывод карточек
    const createCrossSellList = (goods) => {

      wrapRender = wrapper(render, Math.ceil(goods.length/COUNT_ROW_GOODS));

      allGoods.push(...shuffle(goods));
      const fourItems = allGoods.splice(0, COUNT_ROW_GOODS);

      render(fourItems);
    };
    
    // слушатель нажатия на кнопку "добавить"
    crossSellAddElem.addEventListener('click', () => {
      wrapRender(allGoods.splice(0, COUNT_ROW_GOODS));
    });

    getData('cross-sell-dbase/dbase.json', createCrossSellList);
  }


  tabs();
  accordion();
  modal();
  renderCrossSell();
  amenu('.header-menu', '.header-menu__list', '.header-menu__item', '.header-menu__burger');

});