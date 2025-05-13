import React, { useState, useEffect } from 'react';
import { Card, Badge, Button, Modal, Carousel } from 'react-bootstrap';
import { Star, Calendar, Clock, Info, People, Film, Award, GraphUp, ChevronRight, EyeFill, X } from 'react-bootstrap-icons';
import '../components/Moviecard.css';

const MovieCard = ({ movie }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [images, setImages] = useState([]);
    
    // Format date to be more readable
    const formatReleaseDate = (dateString) => {
        if (!dateString) return 'Unknown';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    // Truncate text that's too long
    const truncateText = (text, maxLength) => {
        if (!text) return 'No information available';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };
    
    // Calculate runtime in hours and minutes
    const formatRuntime = (minutes) => {
        if (!minutes) return 'Unknown';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };
    
    // Handle the flip action
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    
    // Handle modal open/close
    const handleShowModal = (e) => {
        e.stopPropagation(); // Prevent card flip when clicking the button
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
    };
    
    // Generate genre badges
    const renderGenres = (genres) => {
        if (!genres || genres.length === 0) {
            // Default movie genres based on ID if none provided
            const defaultGenres = [
                { id: 28, name: "Action" },
                { id: 12, name: "Adventure" },
                { id: 16, name: "Animation" },
                { id: 35, name: "Comedy" },
                { id: 80, name: "Crime" },
                { id: 18, name: "Drama" },
                { id: 10751, name: "Family" },
                { id: 14, name: "Fantasy" },
                { id: 36, name: "History" },
                { id: 27, name: "Horror" },
                { id: 10402, name: "Music" },
                { id: 9648, name: "Mystery" },
                { id: 10749, name: "Romance" },
                { id: 878, name: "Sci-Fi" },
                { id: 53, name: "Thriller" }
            ];
            
            // If movie has genre_ids use them
            if (movie.genre_ids && movie.genre_ids.length > 0) {
                const movieGenres = movie.genre_ids.slice(0, 3).map(id => {
                    const found = defaultGenres.find(g => g.id === id);
                    return found || { id: id, name: "Genre" };
                });
                
                return movieGenres.map((genre, index) => (
                    <span className="genre-tag" key={index}>{genre.name}</span>
                ));
            }
            
            return <span className="genre-tag">Unclassified</span>;
        }
        
        return genres.slice(0, 3).map((genre, index) => (
            <span className="genre-tag" key={index}>{genre.name}</span>
        ));
    };

    // Mock fetching additional images for the carousel
    useEffect(() => {
        if (showModal) {
            // In a real app, you'd fetch these from an API
            // For now we'll create mock images based on the movie's poster
            const mockImages = [
                movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image',
                // Add a few variations to simulate different images
                movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : 'https://via.placeholder.com/780x440?text=No+Backdrop',
                'https://via.placeholder.com/500x750?text=Movie+Scene+1',
                'https://via.placeholder.com/500x750?text=Movie+Scene+2'
            ];
            setImages(mockImages);
        }
    }, [showModal, movie.poster_path, movie.backdrop_path]);

    return (
        <>
            <div className="movie-card-container">
                <div 
                    className={`movie-card ${isFlipped ? 'flipped' : ''}`} 
                    onClick={handleFlip}
                >
                    {/* Front of Card */}
                    <div className="card-face card-front">
                        <Card className="h-100 border-0 shadow">
                            <div className="position-relative">
                                <Card.Img 
                                    variant="top" 
                                    src={movie.poster_path 
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                                        : 'https://via.placeholder.com/500x750?text=No+Image'
                                    } 
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                                <div className="rating-badge">
                                    <Star className="me-1" />
                                    <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                                </div>
                                {movie.popularity && (
                                    <div className="popularity-badge">
                                        <GraphUp size={10} className="me-1" />
                                        {Math.round(movie.popularity)}
                                    </div>
                                )}
                            </div>
                            <Card.Body className="p-2">
                                <h5 className="front-card-title">{movie.title}</h5>
                                
                                <div className="mb-2">
                                    {renderGenres(movie.genres || [])}
                                </div>
                                
                                <div className="front-details">
                                    <div>
                                        <Calendar size={14} className="me-1" />
                                        <span>{formatReleaseDate(movie.release_date)}</span>
                                    </div>
                                    
                                    {movie.original_language && (
                                        <div>
                                            <Film size={14} className="me-1" />
                                            <span>Lang: {movie.original_language.toUpperCase()}</span>
                                        </div>
                                    )}
                                    
                                    {(movie.vote_count !== undefined) && (
                                        <div>
                                            <People size={14} className="me-1" />
                                            <span>Votes: {movie.vote_count}</span>
                                        </div>
                                    )}
                                    
                                    {movie.adult === false && (
                                        <div>
                                            <Award size={14} className="me-1" />
                                            <span>PG Rating</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flip-indicator">
                                    <span>Click Here To Flip</span>
                                    <ChevronRight size={12} />
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    
                    {/* Back of Card */}
                    <div className="card-face card-back">
                        <Card className="h-100 border-0 shadow">
                            <Card.Body className="d-flex flex-column p-3">
                                <Card.Title className="fw-bold mb-3">
                                    {movie.title}
                                    {movie.original_title && movie.original_title !== movie.title && (
                                        <div className="text-muted fs-6">
                                            <small>({movie.original_title})</small>
                                        </div>
                                    )}
                                </Card.Title>
                                
                                <div className="movie-details mb-2">
                                    <div className="detail-item">
                                        <Star className="me-1 text-warning" />
                                        <span>Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10</span>
                                        <small className="text-muted ms-1">({movie.vote_count || 0} votes)</small>
                                    </div>
                                    
                                    <div className="detail-item">
                                        <Calendar className="me-1 text-info" />
                                        <span>Released: {formatReleaseDate(movie.release_date)}</span>
                                    </div>
                                    
                                    {movie.runtime && (
                                        <div className="detail-item">
                                            <Clock className="me-1 text-success" />
                                            <span>Runtime: {formatRuntime(movie.runtime)}</span>
                                        </div>
                                    )}
                                    
                                    {movie.popularity && (
                                        <div className="detail-item">
                                            <GraphUp className="me-1 text-danger" />
                                            <span>Popularity: {Math.round(movie.popularity)}</span>
                                        </div>
                                    )}
                                </div>
                                
                                <Card.Text className="movie-overview flex-grow-1">
                                    <strong>Overview:</strong>
                                    <p>{truncateText(movie.overview, 100)}</p>
                                </Card.Text>
                                
                                <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
                                    <Button 
                                        variant="danger" 
                                        size="sm"  m 
                                        className="w-100"
                                        onClick={handleShowModal}
                                    >
                                        <EyeFill className="me-1" /> View Full Details
                                    </Button>
                                </div>
                            </Card.Body>
                 </Card>
                    </div>
                </div>
            </div>

            {/* Detailed Modal */}
            <Modal 
                show={showModal} 
                onHide={handleCloseModal} 
                size="lg"
                centered
                className="movie-detail-modal"
            >
                <div className="modal-header-custom">
                    <h4 className="modal-title">{movie.title}</h4>
                    <Button 
                        variant="link" 
                        className="close-button" 
                        onClick={handleCloseModal}
                    >
                        <X size={28} />
                    </Button>
                </div>
                
                <Modal.Body className="p-0">
                    <div className="movie-modal-content">
                        {/* Image Carousel */}
                        <div className="movie-carousel-container">
                            <Carousel 
                                interval={700} 
                                className="movie-image-carousel"
                            >
                                {images.map((img, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100 carousel-img"
                                            src={img}
                                            alt={`${movie.title} - image ${index + 1}`}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        
                        <div className="movie-info-container">
                            <div className="movie-header-info">
                                <div className="movie-title-section">
                                    <h2>{movie.title}</h2>
                                    {movie.original_title && movie.original_title !== movie.title && (
                                        <h5 className="text-muted">{movie.original_title}</h5>
                                    )}
                                </div>
                                
                                <div className="movie-rating-section">
                                    <div className="big-rating">
                                        <Star className="star-icon" />
                                        <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                                    </div>
                                    <div className="vote-count">
                                        Based on {movie.vote_count || 0} votes
                                    </div>
                                </div>
                            </div>
                            
                            <div className="genres-container">
                                {renderGenres(movie.genres || [])}
                            </div>
                            
                            <div className="movie-stats">
                                <div className="stat-item">
                                    <Calendar className="stat-icon" />
                                    <div>
                                        <div className="stat-label">Release Date</div>
                                        <div className="stat-value">{formatReleaseDate(movie.release_date)}</div>
                                    </div>
                                </div>
                                
                                {movie.runtime && (
                                    <div className="stat-item">
                                        <Clock className="stat-icon" />
                                        <div>
                                            <div className="stat-label">Runtime</div>
                                            <div className="stat-value">{formatRuntime(movie.runtime)}</div>
                                        </div>
                                    </div>
                                )}
                                
                                {movie.popularity && (
                                    <div className="stat-item">
                                        <GraphUp className="stat-icon" />
                                        <div>
                                            <div className="stat-label">Popularity</div>
                                            <div className="stat-value">{Math.round(movie.popularity)}</div>
                                        </div>
                                    </div>
                                )}
                                
                                {movie.original_language && (
                                    <div className="stat-item">
                                        <Film className="stat-icon" />
                                        <div>
                                            <div className="stat-label">Language</div>
                                            <div className="stat-value">{movie.original_language.toUpperCase()}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="movie-description">
                                <h4>Overview</h4>
                                <p>{movie.overview || "No overview available for this movie."}</p>
                            </div>
                            
                            {/* Additional movie details */}
                            {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                                <div className="additional-details">
                                    <h5>Spoken Languages</h5>
                                    <p>{movie.spoken_languages.map(lang => lang.name).join(', ')}</p>
                                </div>
                            )}
                            
                            {movie.production_companies && movie.production_companies.length > 0 && (
                                <div className="additional-details">
                                    <h5>Production Companies</h5>
                                    <p>{movie.production_companies.map(company => company.name).join(', ')}</p>
                                </div>
                            )}
                            
                            {movie.production_countries && movie.production_countries.length > 0 && (
                                <div className="additional-details">
                                    <h5>Production Countries</h5>
                                    <p>{movie.production_countries.map(country => country.name).join(', ')}</p>
                                </div>
                            )}
                            
                            {movie.budget > 0 && (
                                <div className="additional-details">
                                    <h5>Budget</h5>
                                    <p>${movie.budget.toLocaleString()}</p>
                                </div>
                            )}
                            
                            {movie.revenue > 0 && (
                                <div className="additional-details">
                                    <h5>Revenue</h5>
                                    <p>${movie.revenue.toLocaleString()}</p>
                                </div>
                            )}
                            
                            {movie.tagline && (
                                <div className="movie-tagline">
                                    "{movie.tagline}"
                                </div>
                            )}
                        </div>
                    </div>
                </Modal.Body>
                
                <Modal.Footer className="modal-footer-custom">
                    <Button variant="outline-light" onClick={handleCloseModal}>Close</Button>
                    <Button variant="danger">
                        Add to Favorites
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MovieCard;