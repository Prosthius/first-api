let response;

// GET /pizzas
async function fetchPizzas() {
        try {
            response = await fetch('http://localhost:5136/pizza');
            return await response.json();
        }
        catch(err) {}
}

async function renderPizzas() {
    var pizzas = await fetchPizzas();
    try {
        if (typeof pizzas !== 'object') throw `${response.status}<br />${response.statusText}`;
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
    catch(err) {
        document.getElementById('getPizzas').innerHTML = `<div class="col-4">
                                                            ${err}
                                                            </div>`;
    }
}


// GET /pizza/{id}
async function fetchPizza(id) {
    try {
        id = document.getElementById("getID").value;
        response = await fetch(`http://localhost:5136/pizza/${id}`);
        return await response.json();
    }
    catch(err) {}
}

async function renderPizza() {
    try {
        let pizza = await fetchPizza();
        if (typeof pizza !== 'object') throw `${response.status}<br />${response.statusText}`;
        if (pizza === null) throw `That entry doesn't exist`;
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
    catch(err) {
        document.getElementById('getPizza').innerHTML = `<div class="col">
                                                            ${err}
                                                            </div>`;
    }
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
    id = document.getElementById("deleteID").value;
    let response = await fetch(`http://localhost:5136/pizza/${id}`, {
        method: "DELETE",
    });
    return await response.text();
}
