import express from "express";

const app = express();

app.use(express.json());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const users = []

app.get("/users", (req, res) => {
    res.send(users);
});

app.post("/users", async(req, res) => {

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);
    const user = { name: req.body.name, password: req.body.hashedPassword };
    users.push(user); 
    res.status(201).send("user is added to the database");
  }
  catch {
    res.status(500).send();
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

