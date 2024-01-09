import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MovieInterface } from '../../../Models/movie-interface';
import { MovieService } from '../../Services/movie.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  imgUrl = environment.baseImgUrl;
  receivedMovies: MovieInterface[] = [];
  searchedMovies: MovieInterface[] = [];
  showMore: boolean[] = [];
  categoryTitle: string = "";
  loading: boolean = true; 


  constructor(private movieService: MovieService, private router: Router) { }


  ngOnInit() {
    this.getMovies();
    this.detectEnv();

  }
  getMovies() {
    this.movieService.getMovies().subscribe((movies) => {
      this.receivedMovies = movies.results;
      this.loading = false;
      this.showMore = new Array<boolean>(this.receivedMovies.length).fill(false);
    },
    (error)=>{
      this.loading = true;
    });
  }

  onMovieClicked(id: number) {
    this.router.navigate(['Movie', id]);
  }
  truncateOverview(overview: string): string {
    if (overview.length > 170 && !this.showMore[this.receivedMovies.findIndex(movie => movie.overview === overview)]) {
      return overview.slice(0, 170) + '...';
    }
    return overview;
  }

  toggleSeeMore(index: number): void {
    this.showMore[index] = !this.showMore[index];
    console.log(this.showMore[index]);
  }

  getIndex(movie: MovieInterface): number {
    return this.receivedMovies.findIndex(m => m === movie);
  }
  handleSearch(form: NgForm): void {
    const searchQuery = form.value.searchQuery.toLowerCase().trim();

    if (form.valid) {
      if (searchQuery !== '') {
        this.receivedMovies = this.receivedMovies.filter(movie =>
          movie.title.toLowerCase().includes(searchQuery)
        );
      } else {
        this.getMovies();
      }
    }
  }
  detectEnv() {
    if (environment.baseMoviesUrl == "https://api.themoviedb.org/3/movie/top_rated?api_key=") {
      this.categoryTitle = "Top Rated Movies";
    }
    else {
      this.categoryTitle = "Most Popular Movies";
    }
  }
}