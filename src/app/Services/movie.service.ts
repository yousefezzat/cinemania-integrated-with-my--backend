import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieInterface } from '../../Models/movie-interface';
import { UserService } from './user.service'; 

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient, private userService: UserService) { } 
  baseUrl = environment.myApi;
landingUrl = environment.myApiForLanding;

  getMovies(page: number = 0, size: number = 18): Observable<MovieInterface[]> {
    const url = this.baseUrl;

    const token = this.retrieveToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // Include headers in the HTTP request
    return this.httpClient.get<MovieInterface[]>(url, { headers, params });
  }
  getMoviesForLanding(): Observable<MovieInterface[]> {
    const url = this.landingUrl;

    // Include headers in the HTTP request
    return this.httpClient.get<MovieInterface[]>(url);
  }

  getMovie(movieId: number): Observable<MovieInterface> {
    const url = `${this.baseUrl}/${movieId}`;

    const token = this.retrieveToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<MovieInterface>(url, { headers });
  }

  private retrieveToken(): string | null {
    return this.userService.getAuthToken();
  }
}
