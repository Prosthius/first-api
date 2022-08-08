// https://docs.microsoft.com/en-us/learn/paths/aspnet-core-minimal-api/

using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using PizzaStore.Models;
// using PizzaStore.DB;

var builder = WebApplication.CreateBuilder(args);

// Checks the configuration provider for a connection string named Pizzas. 
// If it doesn't find one, it will use Data Source=Pizzas.db as the connection string.
// MSSQL will map this to a file
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=Pizzas.db";

builder.Services.AddEndpointsApiExplorer();

// In memory database
// builder.Services.AddDbContext<PizzaDb>(options => options.UseInMemoryDatabase("items"));
// Don't think below is necessary
// builder.Services.AddDbContext<PizzaDb>(options => options.UseSqlServer(connectionString));
builder.Services.AddSqlServer<PizzaDb>(connectionString);
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "PizzaStore API",
        Description = "Making the Pizzas you love",
        Version = "v1"
    });
});

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "PizzaStore API V1");
});

app.MapGet("/", () => "Hello World!");

/*
app.MapGet("/pizzas/{id}", (int id) => PizzaDB.GetPizza(id));
app.MapGet("/pizzas", () => PizzaDB.GetPizzas());
app.MapPost("/pizzas", (Pizza pizza) => PizzaDB.CreatePizza(pizza));
app.MapPut("/pizzas", (Pizza pizza) => PizzaDB.UpdatePizza(pizza));
app.MapDelete("/pizzas/{id}", (int id) => PizzaDB.RemovePizza(id));
*/

// Returns all items in Pizza list
app.MapGet("/pizzas", async (PizzaDb db) => await db.Pizzas.ToListAsync());

// Add new item to Pizza list
app.MapPost("/pizza", async (PizzaDb db, Pizza pizza) =>
{
    await db.Pizzas.AddAsync(pizza);
    await db.SaveChangesAsync();
    return Results.Created($"/pizza/{pizza.Id}", pizza);
});

// Get item by ID
app.MapGet("/pizza/{id}", async (PizzaDb db, int id) => await db.Pizzas.FindAsync(id));

// Update an existing item
app.MapPut("/pizza/{id}", async (PizzaDb db, Pizza updatepizza, int id) =>
{
    var pizza = await db.Pizzas.FindAsync(id);
    if (pizza is null) return Results.NotFound();
    pizza.Name = updatepizza.Name;
    pizza.Description = updatepizza.Description;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// Delete an existing item
app.MapDelete("/pizza/{id}", async (PizzaDb db, int id) =>
{
    var pizza = await db.Pizzas.FindAsync(id);
    if (pizza is null) return Results.NotFound();
    db.Pizzas.Remove(pizza);
    await db.SaveChangesAsync();
    return Results.Ok();
});

app.Run();
