import { Component, OnInit, ViewChild } from '@angular/core';
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
  error = null;
  
  @ViewChild('postForm') postForm;

  constructor(
    private postService: PostsService
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content)
    .subscribe(() => {
      this.fetchPosts();
      this.clearForm();
    },
    error => {
      this.error = error.message;
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts()
      .subscribe(() => {
        this.loadedPosts = [];
      },
      error => {
        this.error = error.message;
      })
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts()
      .subscribe(posts => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      error => {
        this.error = error.message;
      });
  }

  private clearForm() {
    this.postForm.reset();
  }

}
