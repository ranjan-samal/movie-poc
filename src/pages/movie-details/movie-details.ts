import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { DataModal } from './../../modal/modal';
import { MovieProvider } from './../../providers/movie/movie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { Platform } from 'ionic-angular';



/**
 * Generated class for the MovieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html',
})
export class MovieDetailsPage {

  inputData: string;
  inputHtml: any;
  // apiURL = 'https://www.themoviedb.org/search/movie?query=';
  modal : DataModal[] = [];
  grid : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, 
              public provider: MovieProvider, public platform: Platform, public orientation: ScreenOrientation) {
    this.inputData = this.navParams.get("data");
    console.log("movie-details-page search value",this.inputData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovieDetailsPage');
    this.getMovieData();
  }

  getMovieData() {
    this.provider.getMovieDetails(this.inputData).
      subscribe(
        response => {
          console.log(response);
          this.modalData(response);

          if (this.platform.is("tablet") || this.platform.is("ipad")) {
            this.grid = this.createGrid(3);
          } else {
            this.grid = this.createGrid(2);
          }

        },
        error => {
          console.log(error);
        }
      );
  }

  modalData(res) {
    var tempArray = res.data.children;
    for (var i = 0; i < tempArray.length - 1; i++) {
      let obj:any = {};
      obj.titleName = tempArray[i].data.title;
      obj.thumbnail = tempArray[i].data.thumbnail;
      obj.thumbnail_height = tempArray[i].data.thumbnail_height;
      obj.thumbnail_width = tempArray[i].data.thumbnail_width;
      this.modal.push(obj);
    }
  }

  createGrid(numberOfSlot) {
    var slots = this.modal;
    var grid = Array(Math.ceil(slots.length / numberOfSlot));
    let rowNum = 0;
    for (let i = 0; i < slots.length; i += numberOfSlot) {
      grid[rowNum] = Array(numberOfSlot);
      if (slots[i]) {
        grid[rowNum][0] = slots[i]
      }
      if (slots[i + 1]) {
        grid[rowNum][1] = slots[i + 1]
      }
      if (numberOfSlot == 3) {
        if (slots[i + 2]) {
          grid[rowNum][2] = slots[i + 2]
        }
      }
      rowNum++;
    }
    return grid;
  }
}
