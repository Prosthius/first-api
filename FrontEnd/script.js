// GET /pizzas
async function fetchPizzas() {
    let response = await fetch('http://localhost:5136/pizzas');
    return await response.json();
}

async function renderPizzas() {
    let pizzas = await fetchPizzas();
    let html = '';
    pizzas.forEach(pizza => {
        let htmlSegment = `<div class="col-4">
                            ID: ${pizza.id}
                            <br />
                            Name: ${pizza.name}
                            <br />
                            Description: ${pizza.description}
                            <br />
                            <br />
                            </div>`;

        html += htmlSegment;
    });
    document.getElementById('getPizzas').innerHTML = html;
}


// GET /pizza/{id}
async function fetchPizza(id) {
    id = document.getElementById("getID").value;
    let response = await fetch(`http://localhost:5136/pizza/${id}`);
    return await response.json();
}

async function renderPizza() {
    let pizza = await fetchPizza();
    let html = '';
    let htmlSegment = `ID: ${pizza.id}
                        <br />
                        Name: ${pizza.name}
                        <br />
                        Description: ${pizza.description}
                        <br />
                        <br />`;
    html += htmlSegment;
    document.getElementById('getPizza').innerHTML = html;
}


// POST /pizza
async function addPizza() {
    let _data = JSON.parse(`{ "name": "${document.getElementById("postName").value}", 
        "description": "${document.getElementById("postDescription").value}"}`);
    let response = await fetch('http://localhost:5136/pizza/', {
        method: "POST",
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    return await response.text();
}


// PUT /pizza/{id}
async function updatePizza(id) {
    id = document.getElementById("putID").value;
    let _data = JSON.parse(`{ "name": "${document.getElementById("putName").value}", 
        "description": "${document.getElementById("putDescription").value}"}`);
    let response = await fetch(`http://localhost:5136/pizza/${id}`, {
        method: "PUT",
        body: JSON.stringify(_data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });
    return await response.text();
}


// DELETE /pizza/{id}
async function deletePizza(id) {
    id = 6;
    let response = await fetch(`http://localhost:5136/pizza/${id}`, {
        method: "DELETE",
    });
    return await response.text();
}
