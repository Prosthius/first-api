async function fetchData() {
    let response = await fetch('http://localhost:5136/pizzas');
    return await response.json();
}

async function renderData() {
    let pizzas = await fetchData();
    pizzas.forEach(pizza => {
        console.log(pizza.id);
        console.log(pizza.name);
        console.log(pizza.description);
    });
}
