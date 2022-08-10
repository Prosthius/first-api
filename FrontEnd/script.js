// GET pizza
async function fetchPizzas() {
    let response = await fetch('http://localhost:5136/pizzas');
    return await response.json();
}

async function renderPizzas() {
    let pizzas = await fetchPizzas();
    pizzas.forEach(pizza => {
        console.log(pizza.id);
        console.log(pizza.name);
        console.log(pizza.description);
    });
}

// GET pizzas/{id}
async function fetchPizza(id) {
    id = 1;
    let response = await fetch(`http://localhost:5136/pizza/${id}`);
    return await response.json();
}

async function renderPizza() {
    let pizza = await fetchPizza();
    console.log(pizza.id);
    console.log(pizza.name);
    console.log(pizza.description);
}

// POST /pizza
let _data = {
    name: "Mexican",
    description: "A Mexican pizza"
}

async function addPizza() {
    let response = await fetch('http://localhost:5136/pizza/', {
        method: "POST",
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    return await response.text();
}
