import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
    
    private URL: string = "https://ng-test-fe501-default-rtdb.firebaseio.com/posts.json";

    constructor(
        private http: HttpClient
    ) {

    }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title, content };
        this.http.post<{ name: string }>(
            this.URL
            , postData
        ).subscribe(response => {
            console.log(response)
        });
    }

    fetchPosts() {
        return this.http.get<{ [key: string]: Post }>(this.URL)
            .pipe(
                map(data => {
                    const postArray: Post[] = [];
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            postArray.push({ ...data[key], id: key })
                        }
                    }
                    return postArray;
                })
            )
    }

}
