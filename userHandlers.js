const database = require("./database");

const getUsers = (req, res) => {
    database.query("SELECT firstname, lastname, city, language, FROM users")
    .then(([result]) => { 
        res.json(result)})
        .catch((err) => {
            console.error(err);
            res.sendStatus(500)
        })
        
    }     

  const postUser = (req, res) => {
    const { v } = req.body;
  
    database
      .query("INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)", [
        firstname, lastname, email, city, language, hashedPassword
      ])
      .then (([result])=> {
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error posting user")
      })
  }

  const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language, hashedPassword } = req.body;
  
    database
      .query("UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? WHERE id = ?", [firstname, lastname, email, city, language, hashedPassword, id])
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }})
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing the user")
      })
    
  }

  module.exports = {
    getUsers,
    postUser,
    updateUser
  };
  