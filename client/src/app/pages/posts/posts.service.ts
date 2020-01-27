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
            file: File,
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

    addPost(file: File, title: string, category: string, allowComments: string, status: string, body: string) {
        const postData = new FormData();
        postData.append('title', title);
        postData.append('body', body);
        postData.append('category', category);
        postData.append('allowComments', allowComments);
        postData.append('status', status);
        postData.append('file', file, title);
        this.http.post<{ message: string, post: Post }>('http://localhost:3000/api/posts', postData)
            .subscribe((responseData) => {
                const post: Post = {
                    id: responseData.post.id,
                    title: title,
                    body: body,
                    category: category,
                    allowComments: allowComments,
                    status: status,
                    file: responseData.post._doc.file,
                    slug: '',
                    comments: '',
                    user: '',
                    date: responseData.post._doc.date
                }
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            });
    }

    updatePost(id: string, file: (File | string), post: Post) {
        if (typeof (file) === 'object') {
            const postData = new FormData();
            postData.append('allowComments', post.allowComments);
            postData.append('body', post.body);
            postData.append('category', post.category);
            postData.append('comments', post.comments);
            postData.append('date', post.date);
            postData.append('file', file, post.title);
            postData.append('status', post.status);
            postData.append('title', post.title);
        } else {
            const postData: Post = {
                id: id,
                title: post.title,
                file: file,
                category: post.category,
                allowComments: post.allowComments,
                status: post.status,
                body: post.body,
                slug: '',
                comments: '',
                user: '',
                date: Date.now()
            }
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