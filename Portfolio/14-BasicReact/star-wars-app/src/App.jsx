import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const sw = [
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
  },
];

const affiliationLogos = {
  Jedi: { color: 'blue', symbol: '☯' },
  Sith: { color: 'red', symbol: '⚡' },
  Rebellion: { color: 'blue', symbol: '✦' },
  Empire: { color: 'red', symbol: '⬡' }
};

const getAffiliationColor = (affiliation) => {
  const goodAffiliations = ['Jedi', 'Rebellion'];
  return goodAffiliations.includes(affiliation) ? 'blue' : 'red';
};

export default function StarWarsApp() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [comments, setComments] = useState({});
  const [commentForm, setCommentForm] = useState({ name: '', comment: '' });

  const handleLike = (episode) => {
    setLikes(prev => ({ ...prev, [episode]: (prev[episode] || 0) + 1 }));
  };

  const handleDislike = (episode) => {
    setDislikes(prev => ({ ...prev, [episode]: (prev[episode] || 0) + 1 }));
  };

  const handleAddComment = () => {
    if (selectedMovie && commentForm.name && commentForm.comment) {
      setComments(prev => ({
        ...prev,
        [selectedMovie.episode]: [
          ...(prev[selectedMovie.episode] || []),
          { name: commentForm.name, comment: commentForm.comment }
        ]
      }));
      setCommentForm({ name: '', comment: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">Star Wars Movies</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sw.map((movie) => {
            const isHovered = hoveredMovie === movie.episode;
            const affiliation = movie.best_character.affiliation;
            const affiliationColor = getAffiliationColor(affiliation);
            const logo = affiliationLogos[affiliation];
            
            return (
              <div
                key={movie.episode}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
                onMouseEnter={() => setHoveredMovie(movie.episode)}
                onMouseLeave={() => setHoveredMovie(null)}
              >
                <div className="relative h-80 bg-gray-700">
                  {isHovered ? (
                    <div 
                      className="w-full h-full flex items-center justify-center text-9xl"
                      style={{ backgroundColor: affiliationColor === 'blue' ? '#1e40af' : '#991b1b' }}
                    >
                      {logo.symbol}
                    </div>
                  ) : (
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                <div className="p-4">
                  <h5 className="text-xl font-bold mb-2">{movie.title}</h5>
                  <h6 className="text-gray-400 mb-3">{movie.year}</h6>
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedMovie(movie)}
                      className="text-blue-400 hover:text-blue-300 font-semibold"
                    >
                      More...
                    </button>
                    
                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() => handleLike(movie.episode)}
                        className="flex items-center gap-1 text-green-400 hover:text-green-300"
                      >
                        <ThumbsUp size={18} />
                        <span className="text-sm">{likes[movie.episode] || 0}</span>
                      </button>
                      
                      <button
                        onClick={() => handleDislike(movie.episode)}
                        className="flex items-center gap-1 text-red-400 hover:text-red-300"
                      >
                        <ThumbsDown size={18} />
                        <span className="text-sm">{dislikes[movie.episode] || 0}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedMovie && (
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">👤</div>
                    <p className="text-sm text-gray-400">{selectedMovie.best_character.image}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold mb-2">{selectedMovie.best_character.name}</h3>
                <span 
                  className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                  style={{ 
                    backgroundColor: getAffiliationColor(selectedMovie.best_character.affiliation) === 'blue' 
                      ? '#1e40af' 
                      : '#991b1b' 
                  }}
                >
                  {selectedMovie.best_character.affiliation}
                </span>
                <p className="text-gray-300 leading-relaxed">{selectedMovie.best_character.bio}</p>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-8">
              <h4 className="text-2xl font-bold mb-4 text-yellow-400">Comments</h4>
              
              <div className="mb-6 bg-gray-700 p-4 rounded-lg">
                <div className="mb-3">
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    value={commentForm.name}
                    onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 focus:border-blue-400 focus:outline-none"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-semibold mb-2">Comment</label>
                  <textarea
                    value={commentForm.comment}
                    onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 focus:border-blue-400 focus:outline-none"
                    rows="3"
                  />
                </div>
                
                <button
                  onClick={handleAddComment}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold transition-colors"
                >
                  Add Comment
                </button>
              </div>

              <div className="space-y-4">
                {comments[selectedMovie.episode]?.map((c, idx) => (
                  <div key={idx} className="bg-gray-700 p-4 rounded-lg">
                    <h6 className="font-bold text-lg mb-1">{c.name}</h6>
                    <p className="text-gray-300">{c.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}