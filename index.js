import express from "express";
import bcrypt from "bcrypt";

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
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // console.log(salt);
    // console.log(hashedPassword);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user); 
    res.status(201).send("user is added to the database");
  }
  catch(err){
    console.log(err)
    res.status(500).send("error");
  }
});

app.post("/users/login", async(req, res) => {
  const user = users.find(user => user.name === req.body.name);
  if (user == null){
    return res.status(400).send("cannot find user");
  }
  try{
    if(await bcrypt.compare(req.body.password, user.password)){
      res.send("Success");
    }
    else{
      res.send("Not Allowed");
    }
  }
  catch{
    res.status(500).send("error");
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

