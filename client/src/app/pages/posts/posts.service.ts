import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) { }

    getPosts() {
        this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts')
            .subscribe((postData) => {
                console.log(postData);
                this.posts = postData.posts;
                this.postsUpdated.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(id: string, file: string, title: string, category: string, allowComments: boolean, status: string, date: string) {
        const post: Post = {
            id: id,
            file: file,
            title: title,
            category: category,
            allowComments: allowComments,
            status: status,
            date: date,
            slug: '',
            comments: '',
            user: '',
            body: ''
        }
        this.http.post<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts', post)
            .subscribe((responseData) => {
                console.log(responseData.message);
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            });
    }
}