// catalog.component.spec.ts
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { MovieService } from '../../Services/movie.service';
import { of } from 'rxjs';
import { mockTopRatedMoviesResponse } from '../../Services/mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let movieServiceMock: any;

  beforeEach(() => {
    movieServiceMock = jasmine.createSpyObj('MovieService', ['getMovies']);
    movieServiceMock.getMovies.and.returnValue(of(mockTopRatedMoviesResponse));

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, MatCardModule],
      declarations: [CatalogComponent],
      providers: [{ provide: MovieService, useValue: movieServiceMock }]
    });

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMovies on ngOnInit and set receivedMovies', () => {
    component.ngOnInit();
    expect(movieServiceMock.getMovies).toHaveBeenCalled();
    expect(component.receivedMovies).toEqual(mockTopRatedMoviesResponse.results);
  });

  it('should update showMore state when toggleSeeMore is called', () => {
    component.ngOnInit();
    const index = 0; // assuming there's at least one movie
    component.toggleSeeMore(index);
    expect(component.showMore[index]).toBeTrue();
    component.toggleSeeMore(index);
    expect(component.showMore[index]).toBeFalse();
  });
  it('should render the top rated movies', waitForAsync(() => {
    component.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const movieElements = fixture.nativeElement.querySelectorAll('.col.mb-4');

      expect(movieElements.length).toBe(mockTopRatedMoviesResponse.results.length);

      movieElements.forEach((movieElement: any, index: any) => {
        const titleElement = movieElement.querySelector('h4');
        expect(titleElement.textContent).toBe(mockTopRatedMoviesResponse.results[index].title);

        const overviewElement = movieElement.querySelector('p');
        expect(overviewElement.textContent).toBe(mockTopRatedMoviesResponse.results[index].overview);
      });
    });


  }));



});
