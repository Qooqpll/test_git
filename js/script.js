let storageArray = [];

let storage = {
    price: {
        pizza: 0,
        size: 0,
        sauce: 0,
        total: function () {
            let result = Number(this.pizza) + Number(this.size) + Number(this.sauce);
            return result;
        }
    },
    name: {
        pizza: null,
        size: null,
        sauce: null,
    }
}

let pizza = document.getElementById('type')
let size = document.getElementById('size')
let sauce = document.getElementById('sauce')

let input = document.querySelector('input');

function selectDisable() {
    let pizzaDisabled = document.getElementById('type').getElementsByTagName('option');
    let sizeDisabled = document.getElementById('size').getElementsByTagName('option');
    let sauceDisabled = document.getElementById('sauce').getElementsByTagName('option');

    for (let i = 0; i < sizeDisabled.length; i++) {
        sizeDisabled[i].disabled = true;
        sauceDisabled[i].disabled = true;
    }
    pizzaDisabled[0].selected = true;
    sizeDisabled[0].selected = true;
    sauceDisabled[0].selected = true;

}

selectDisable();

function checkout() {

    let pizzaValue = pizza.options[pizza.selectedIndex].value;
    let sizeValue = size.options[size.selectedIndex].value;
    let sauceValue = sauce.options[sauce.selectedIndex].value;
    let totalPrice = storage.price.total();

    let newStorage = {
        ...storage,
        price: totalPrice,
        name : {
            pizza: pizzaValue,
            size: sizeValue,
            sauce: sauceValue,
        }
    }
    storageArray = [...storageArray, newStorage]
    getGrid()
}

function getPrice(elem) {
    let index = elem.selectedIndex;
    if (elem.id == 'type') {
        addPizza('type', index);
    } else if (elem.id == 'size') {
        addPizza('size', index);
    } else if (elem.id == 'sauce') {
        addPizza('sauce', index);
    }
}

function addPizza(type, index) {
    let pizza = document.getElementById(type).getElementsByTagName('option');
    let value = pizza[index].value;
    let pricePizza = Object.assign({}, pizza[index].dataset);
    if (type == 'type') {
        storage.price.pizza = pricePizza.price;
        storage.name.pizza = value;
    } else if (type == 'size') {
        storage.price.size = pricePizza.price;
        storage.name.size = value;
    } else if (type == 'sauce') {
        storage.price.sauce = pricePizza.price;
        storage.name.sauce = value;
    }
}

function getGrid() {
    let list = document.getElementById('list');
    list.innerHTML = ''
    if(storageArray.length != 0 ) {
        storageArray.map(obj => {
            let text = `${obj.name.pizza} ${obj.name.size} ${obj.name.sauce} ${obj.price}`;
            let elem = document.createElement('li', {className: 'list-item'})
            let button = document.createElement('button', {className: 'button', value: 'Удалить'});
            button.addEventListener('click', () => deletePizza(obj))
            elem.innerHTML = text;
            button.innerHTML = 'Удалить';
            list.appendChild(elem);
            list.appendChild(button);
            selectDisable();
        })
    }

}

function typeSelected(elem) {
    let getId = elem.id;
    if(elem.selectedIndex > 0) {
        if (getId == 'type') {
            for (let i = 0; i < size.length; i++) {
                size[i].disabled = false;
            }
        } else {
            for (let i = 0; i < size.length; i++) {
                sauce[i].disabled = false;
            }
        }

        if(pizza.selectedIndex > 0 && size.selectedIndex > 0 && sauce.selectedIndex > 0) {
            input.disabled = false;
        }
    }
    else {
        selectDisable()
    }
}

function deletePizza(obj) {
    let searchPizza = storageArray.indexOf(obj);
    let newStorageArray = [...storageArray];
    newStorageArray.splice(searchPizza, 1);
    storageArray = [...newStorageArray];
    getGrid()
}
