import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css';

const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);

  const getMovies = () => {
    axios.get('/movies').then((response) => {
      setLists(response.data);
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleDelete = (id) => {
    const isConfirm = window.confirm(
      'Are you sure you want to delete this movie?'
    );
    if (isConfirm) {
      axios
        .delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          setLists((prevLists) => prevLists.filter((movie) => movie.id !== id));
        });
    }
  };

  return (
    <div className="lists-container">
      <div className="header">
        <h1>Movie List</h1>
        <button
          className="create-button"
          onClick={() => navigate('/main/movies/form')}
        >
          + Add Movie
        </button>
      </div>
      <table className="movie-table">
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Release Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lists.map((movie) => (
            <tr key={movie.id}>
              <td>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              </td>
              <td>{movie.title}</td>
              <td>
                {movie.releaseDate
                  ? new Date(movie.releaseDate).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td>
                <button
                  className="action-button edit-button"
                  onClick={() => navigate(`/main/movies/form/${movie.id}`)}
                >
                  Edit
                </button>
                <button
                  className="action-button delete-button"
                  onClick={() => handleDelete(movie.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lists;
