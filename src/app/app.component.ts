import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;

  constructor(
    private postService: PostsService
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.content, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.postService.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.fetchPosts();
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts()
      .subscribe(posts => {
        this.loadedPosts = posts;
        this.isFetching = false;
      });
  }

}
