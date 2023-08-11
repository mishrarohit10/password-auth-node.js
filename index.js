import express from "express";

const app = express();

app.use(express.json());

const users = []

app.get("/users", (req, res) => {
    res.send(users);
});

app.post("/users", (req, res) => {
    const user = { name: req.body.name, password: req.body.password };
    users.push(user); 
    res.send("user is added to the database");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

