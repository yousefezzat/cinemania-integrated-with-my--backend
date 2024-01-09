// movie.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { environment } from '../../environments/environment';
import { mockTopRatedMoviesResponse, mockMovie } from './mocks'

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve top-rated movies using GET', () => {
    service.getMovies().subscribe(movies => {
      expect(movies.results.length).toBe(mockTopRatedMoviesResponse.results.length);
      expect(movies).toEqual(mockTopRatedMoviesResponse);
    });

    const request = httpMock.expectOne(`${environment.baseMoviesUrl}${environment.apiKey}`);
    expect(request.request.method).toBe('GET');
    request.flush(mockTopRatedMoviesResponse);
  });

  it('should retrieve movie details by ID using GET', () => {
    const mockMovieId = 123;
    service.getMovie(mockMovieId).subscribe(movie => {
      expect(movie).toEqual(mockMovie);
    });

    const request = httpMock.expectOne(`${environment.baseUrl}/movie/${mockMovieId}?api_key=${environment.apiKey}`);
    expect(request.request.method).toBe('GET');
    request.flush(mockMovie);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
