import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';


/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {
  // private apiUrl = 'https://www.themoviedb.org/search/movie?query=';
  // private apiUrl = "https://in.bookmyshow.com/bengaluru";
  private apiUrl = "https://www.reddit.com/r/gifs/top/.json?limit=10&sort=hot";
  movieData: any;

  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }

  getMovieDetails(value) : Observable<any>{
    console.log("movie-provider search value",value);
    return this.http.get(this.apiUrl)
          .map(this.extractData)
          .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res ? res : {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      // const err = body.error || JSON.stringify(body);
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
