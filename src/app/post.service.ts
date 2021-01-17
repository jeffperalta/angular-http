import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
    
    private URL: string = "https://ng-test-fe501-default-rtdb.firebaseio.com/posts.json";

    constructor(
        private http: HttpClient
    ) {

    }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title, content };
        return this.http.post<{ name: string }>(
            this.URL
            , postData
            , {
                observe: 'response' // Full response
                //observe: 'body' // Just the body
            }
        )
    }

    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');

        return this.http.get<{ [key: string]: Post }>(
            this.URL,
            {
                headers: new HttpHeaders({
                    "Custom-Header": "A custom header value"
                }),
                params: searchParams
            }
        ).pipe(
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

    deletePosts() {
        return this.http.delete(this.URL, {
            observe: "events",
            //responseType: 'json' //'text'
        }).pipe(
            tap(event => { 
                if (event.type === HttpEventType.Sent) {
                    console.log("Sent..")
                }

                if(event.type === HttpEventType.Response) {
                    console.log("Response: ", event.type);
                }
             })
        );
    }

}
