import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http.post<{ name: string }>(
      "https://ng-test-fe501-default-rtdb.firebaseio.com/posts.json"
    , postData
    ).subscribe(response => {
      console.log(response)
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http.get<{ [key: string]: Post }>("https://ng-test-fe501-default-rtdb.firebaseio.com/posts.json")
      .pipe(
        map(data => { 
          const postArray: Post[] = [];
          for(const key in data) {
            if(data.hasOwnProperty(key)) {
              postArray.push({ ...data[key], id: key })
            }
          }
          return postArray;
         })
      )
      .subscribe(posts => {
        this.loadedPosts = posts;
        this.isFetching = false;
      })
  }
}
