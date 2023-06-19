const database = require("./database");

const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const getMovies = (req, res) => {
  res.json(movies);
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  const movie = movies.find((movie) => movie.id === id);

  if (movie != null) {
    res.json(movie);
  } else {
    res.status(404).send("Not Found");
  }
};

const postMovie = (req, res) => {
  const { title, director, year, colors, duration } = req.body;

  database
    .query("INSERT INTO movies (title, director, year, colors, duration) VALUES (?, ?, ?, ?, ?)", [
      title, director, year, colors, duration
    ])
    .then (([result])=> {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie")
    })
}

const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, colors, duration } = req.body;

  database
    .query("UPDATE movies SET title = ?, director = ?, year = ?, colors = ?, duration = ? WHERE id = ?", [title, director, year, colors, duration, id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }})
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the movie")
    })
  
}

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  updateMovie,
};