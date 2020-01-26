import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) { }

    getPosts() {
        this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        file: post.file,
                        title: post.title,
                        category: post.category,
                        allowComments: post.allowComments,
                        status: post.status,
                        body: post.body,
                        date: post.date,
                        id: post._id
                    }
                })
            }))
            .subscribe((transformedposts) => {
                this.posts = transformedposts;
                this.postsUpdated.next([...this.posts]);
            });
    }

    getPost(id: string) {
        return this.http.get<{
            _id: string,
            file: string,
            title: string,
            category: string,
            allowComments: string,
            status: string,
            body: string,
            date: Number
        }>(`http://localhost:3000/api/posts/${id}`);
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(file: string, title: string, category: string, allowComments: string, status: string, body: string) {
        const post: Post = {
            id: null,
            file: file,
            title: title,
            category: category,
            allowComments: allowComments,
            status: status,
            body: body,
            slug: '',
            comments: '',
            user: '',
            date: null,

        }
        this.http.post<{ message: string, id: string, date: Number }>('http://localhost:3000/api/posts', post)
            .subscribe((responseData) => {
                const id = responseData.id;
                const date = responseData.date;
                post.id = id;
                post.date = date;
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            });
    }

    updatePost(id: string, post: Post) {
        const postData: Post = {
            id: id,
            title: post.title,
            file: 'default.png',
            category: post.category,
            allowComments: post.allowComments,
            status: post.status,
            body: post.body,
            slug: '',
            comments: '',
            user: '',
            date: Date.now()
        }
        this.http.put(`http://localhost:3000/api/posts/${id}`, postData)
            .subscribe(res => {
                const updatedPosts = [...this.posts];
                const oldPostIndex = updatedPosts.findIndex(p => p.id === postData.id);
                updatedPosts[oldPostIndex] = postData;
                this.posts = updatedPosts;
                this.postsUpdated.next([...this.posts]);
            });

    }

    deletePost(postId: string) {
        this.http.delete(`http://localhost:3000/api/posts/${postId}`)
            .subscribe(() => {
                const updatedPosts = this.posts.filter(post => post.id !== postId);
                this.posts = updatedPosts;
                this.postsUpdated.next([...this.posts]);
            });
    }

}