const request = require("supertest");
const server = require("../index");
//const cafes = require("../cafes.json");

describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo un 200 y tener por lo menos 1 objeto", async () => {
        const { body, statusCode } = await request(server).get("/cafes").send();
        expect(statusCode).toBe(200);
        expect(body.length).toBeGreaterThan(0)
    });

    it("Retorna cod. 404 cuando elimina un producto que no Existe", async () => {
        const jwt = "token";
        const idDeProductoAEliminar = 100
        const { statusCode } = await request(server)
        .delete(`/cafes/${idDeProductoAEliminar}`)
        .set("Authorization", jwt)
        .send();
        expect(statusCode).toBe(404)
    });

    it("agregando un nuevo producto retorna cod 201", async () => {
        const id = Math.floor(Math.random() * 1);
        const producto = { id, nombre: "" }
        const { body, statusCode } = await request(server)
            .post("/cafes")
            .send(producto);
        expect(body).toContainEqual(producto);
        expect(statusCode).toBe(201)
    });

    it('retorna cod 400 cuando se trata de actualizar un producto', async () => {
        const id = 2
        const payload = {id: 5, nombre: "Latte Vainilla"}
        const response = await request(server).put(`/cafes/${id}`).send(payload);
        expect(response.status).toBe(400);
      });

})

