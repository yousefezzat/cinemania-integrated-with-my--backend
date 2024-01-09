import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieInterface } from '../../Models/movie-interface';
import { TopRatedMoviesResponseInterface } from '../../Models/top-rated-movies-response-interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }
  baseMoviesUrl = environment.baseMoviesUrl;
  baseUrl = environment.baseUrl;
  apiKey = environment.apiKey;

  // Get top-rated movies
  getMovies(): Observable<TopRatedMoviesResponseInterface> {
    const url = `${this.baseMoviesUrl}${this.apiKey}`;
    return this.httpClient.get<TopRatedMoviesResponseInterface>(url);


  }

  // Get movie details by ID
  getMovie(movieId: number): Observable<MovieInterface> {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`;
    return this.httpClient.get<MovieInterface>(url);
  }
  getMovieVideo(data: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/movie/${data}/videos?api_key=${this.apiKey}`)
  }

  // getMovieCast
  getMovieCast(data: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/movie/${data}/credits?api_key=${this.apiKey}`)
  }

}

