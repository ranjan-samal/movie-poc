import { MovieDetailsPage } from './../movie-details/movie-details';
import { MovieProvider } from './../../providers/movie/movie';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  movieInput: string;
  constructor(public navCtrl: NavController, public provider: MovieProvider) { }

  fetchMoviesDetails() {
    this.navigateToOtherPage();
  }

  navigateToOtherPage(): void {
    this.movieInput = "";
    this.navCtrl.push(MovieDetailsPage,{ data : this.movieInput});
  }

}
