const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/starwarsdb')
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.log('❌ Error de conexión:', err));

// Movie Schema
const CommentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const MovieSchema = new mongoose.Schema({
  episode: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  year: Number,
  poster: String,
  best_character: {
    name: String,
    affiliation: String,
    image: String,
    bio: String
  },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: [CommentSchema]
});

const Movie = mongoose.model('Movie', MovieSchema);

// Routes

// GET todas las películas
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ episode: 1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET una película por episode
app.get('/api/movies/:episode', async (req, res) => {
  try {
    const movie = await Movie.findOne({ episode: req.params.episode });
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST crear/actualizar película
app.post('/api/movies', async (req, res) => {
  try {
    const existingMovie = await Movie.findOne({ episode: req.body.episode });
    
    if (existingMovie) {
      return res.json(existingMovie);
    }
    
    const movie = new Movie(req.body);
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH actualizar likes/dislikes
app.patch('/api/movies/:episode/reaction', async (req, res) => {
  try {
    const { type } = req.body; // 'like' o 'dislike'
    const movie = await Movie.findOne({ episode: req.params.episode });
    
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    
    if (type === 'like') {
      movie.likes += 1;
    } else if (type === 'dislike') {
      movie.dislikes += 1;
    }
    
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST agregar comentario
app.post('/api/movies/:episode/comments', async (req, res) => {
  try {
    const movie = await Movie.findOne({ episode: req.params.episode });
    
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    
    movie.comments.push({
      name: req.body.name,
      comment: req.body.comment
    });
    
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE eliminar comentario
app.delete('/api/movies/:episode/comments/:commentId', async (req, res) => {
  try {
    const movie = await Movie.findOne({ episode: req.params.episode });
    
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    
    movie.comments = movie.comments.filter(
      comment => comment._id.toString() !== req.params.commentId
    );
    
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Inicializar datos de Star Wars
app.post('/api/init', async (req, res) => {
  try {
    const count = await Movie.countDocuments();
    if (count > 0) {
      return res.json({ message: 'Datos ya inicializados' });
    }

    const starWarsMovies = [
      {
        episode: "1",
        title: "The phantom menace",
        year: 1999,
        poster: "/images/SW1-The_phantom_menace.jpg",
        best_character: {
          name: "Qui-Gon Jinn",
          affiliation: "Jedi",
          image: "/images/Qui-Gon_Jinn.png",
          bio: "Qui-Gon Jinn, a Force-sensitive human male, was a venerable if maverick Jedi Master who lived during the last years of the Republic Era. He was a wise and well-respected member of the Jedi Order, and was offered a seat on the Jedi Council, but chose to reject and follow his own path. Adhering to a philosophy centered around the Living Force, Jinn strove to follow the will of the Force even when his actions conflicted with the wishes of the High Council. After encountering Anakin Skywalker, Jinn brought him to the Jedi Temple on Coruscant, convinced he had found the Chosen One. His dying wish was for Skywalker to become a Jedi and ultimately restore balance to the Force.",
        }
      },
      {
        episode: "2",
        title: "Attack of the clones",
        year: 2002,
        poster: "/images/SW2-Attack_of_the_Clones.jpg",
        best_character: {
          name: "Obi-wan Kenobi",
          affiliation: "Jedi",
          image: "/images/Obi-wan_Kenobi.png",
          bio: "Obi-Wan Kenobi was a legendary Force-sensitive human male Jedi Master who served on the Jedi High Council during the final years of the Republic Era. As a Jedi General, Kenobi served in the Grand Army of the Republic that fought against the Separatist Droid Army during the Clone Wars. Kenobi, however, was forced into exile as a result of the Great Jedi Purge. As a mentor, Kenobi was responsible for training two members of the Skywalker family, Anakin and Luke Skywalker, both of whom served in turn as his Padawan in the ways of the Force.",
        }
      },
      {
        episode: "3",
        title: "Revenge of the Sith",
        year: 2005,
        poster: "/images/SW3-Revenge_of_the_sith.jpg",
        best_character: {
          name: "Anakin Skywalker",
          affiliation: "Sith",
          image: "/images/Anakin_Skywalker.png",
          bio: "Anakin Skywalker was a legendary Force-sensitive human male who was a Jedi Knight of the Galactic Republic and the prophesied Chosen One of the Jedi Order, destined to bring balance to the Force. Also known as 'Ani' during his childhood, Skywalker earned the moniker 'Hero With No Fear' from his accomplishments in the Clone Wars. His alter ego, Darth Vader, the Dark Lord of the Sith, was created when Skywalker turned to the dark side of the Force, pledging his allegiance to the Sith Lord Darth Sidious at the end of the Republic Era.",
        }
      },
      {
        episode: "4",
        title: "A new hope",
        year: 1977,
        poster: "/images/SW4-A_new_hope.jpg",
        best_character: {
          name: "Leia Organa",
          affiliation: "Rebellion",
          image: "/images/Leia_Organa.jpeg",
          bio: "Leia Skywalker Organa Solo was a Force-sensitive human Alderaanian female politician, Jedi, and military leader who served in the Alliance to Restore the Republic during the Imperial Era and the New Republic and Resistance in the subsequent New Republic Era. Shortly after birth, she was adopted into the House of Organa—the Alderaanian royal family—and was raised as Princess Leia Organa of Alderaan, a planet in the Core Worlds known for its dedication to pacifism. The princess was raised as the daughter of Senator Bail Prestor Organa and his wife, Queen Breha Organa, making her the heir to the Alderaanian monarchy. Instilled with the values of her adopted homeworld, Organa devoted her life to the restoration of democracy by opposing authoritarian regimes, such as the Galactic Empire and the First Order.",
        }
      },
      {
        episode: "5",
        title: "The empire strikes back",
        year: 1980,
        poster: "/images/SW5-The_empire_strikes_back.jpg",
        best_character: {
          name: "Darth Vader",
          affiliation: "Empire",
          image: "/images/Darth_Vader.jpeg",
          bio: "Once the heroic Jedi Knight named Anakin Skywalker, Darth Vader was seduced by the dark side of the Force. Forever scarred by his defeat on Mustafar, Vader was transformed into a cybernetically-enhanced Sith Lord. At the dawn of the Empire, Vader led the Empire's eradication of the Jedi Order and the search for survivors. He remained in service of the Emperor -- the evil Darth Sidious -- for decades, enforcing his Master's will and seeking to crush the Rebel Alliance and other detractors. But there was still good in him…",
        }
      },
      {
        episode: "6",
        title: "The return of the Jedi",
        year: 1983,
        poster: "/images/SW6-The_return_of_the_jedi.jpg",
        best_character: {
          name: "Luke Skywalker",
          affiliation: "Jedi",
          image: "/images/Luke_Skywalker.jpeg",
          bio: "Luke Skywalker, a Force-sensitive human male, was a legendary Jedi Master who fought in the Galactic Civil War during the reign of the Galactic Empire. Along with his companions, Princess Leia Organa and General Han Solo, Skywalker served as a revolutionary on the side of the Alliance to Restore the Republic—an organization committed to the downfall of the Galactic Empire and the restoration of democracy. Following the war, Skywalker became a living legend, and was remembered as one of the greatest Jedi in galactic history.",
        }
      }
    ];

    await Movie.insertMany(starWarsMovies);
    res.json({ message: 'Datos inicializados correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});