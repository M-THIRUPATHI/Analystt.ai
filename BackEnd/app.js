const express = require("express");
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.listen(4000, () => {
  console.log("server running at 4000 port");
});
app.get("/users", async (request, response) => {
  try {
    const url = `https://jsonplaceholder.typicode.com/users`;
    const data = await fetch(url);
    const result = await data.json();
    response.send(result);
  } catch (error) {
    response.status(500);
    response.send("error");
  }
});

app.get("/users/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    const data = await fetch(url);
    const result = await data.json();
    response.send(result);
  } catch (error) {
    response.status(500);
    response.send("error");
  }
});
