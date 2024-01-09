
import { MovieInterface } from '../../Models/movie-interface';
import { TopRatedMoviesResponseInterface } from '../../Models/top-rated-movies-response-interface';
export const mockMovie: MovieInterface = {
    adult: false,
    backdrop_path: '/path/to/backdrop/image.jpg',
    genre_ids: [18, 80],
    id: 550,
    original_language: 'en',
    original_title: 'Fight Club',
    overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.',
    popularity: 30.0,
    poster_path: '/path/to/poster/image.jpg',
    release_date: '1999-10-15',
    title: 'Fight Club',
    video: false,
    vote_average: 8.4,
    vote_count: 12345
};
export const mockTopRatedMoviesResponse: TopRatedMoviesResponseInterface = {
    page: 1,
    results: [
        mockMovie, // Reuse the mockMovie defined above
        {
            adult: false,
            backdrop_path: '/another/path/to/backdrop/image.jpg',
            genre_ids: [14, 28],
            id: 551,
            original_language: 'en',
            original_title: 'The Shawshank Redemption',
            overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            popularity: 28.5,
            poster_path: '/another/path/to/poster/image.jpg',
            release_date: '1994-09-23',
            title: 'The Shawshank Redemption',
            video: false,
            vote_average: 8.7,
            vote_count: 19650
        },
    ],
    total_pages: 500,
    total_results: 10000
};
