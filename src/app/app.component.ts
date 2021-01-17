import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post(
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
    this.http.get("https://ng-test-fe501-default-rtdb.firebaseio.com/posts.json")
      .pipe(
        map(data => { 
          const postArray = [];
          for(const key in data) {
            if(data.hasOwnProperty(key)) {
              postArray.push({ ...data[key], id: key })
            }
          }
          return postArray;
         })
      )
      .subscribe(response => {
        console.log(response)
      })
  }
}
