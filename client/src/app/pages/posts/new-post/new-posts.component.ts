import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Post } from '../post.model';


@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html',
  styleUrls: ['./new-posts.component.css']
})

export class NewPostsComponent implements OnInit {
  file = 'default.png';
  post: Post;
  private id: string;
  private mode = 'create';


  constructor(public postsService: PostsService, private dialogRef: MatDialogRef<NewPostsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    if (this.data.id != null) {
      this.mode = 'edit';
      this.id = this.data.id;
      this.postsService.getPost(this.id).subscribe(postData => {
        this.post = {
          id: postData._id,
          title: postData.title,
          file: postData.file,
          category: postData.category,
          allowComments: postData.allowComments,
          status: postData.status,
          body: postData.body,
          date: postData.date,
          user: '',
          slug: '',
          comments: ''
        };

      });
    } else {
      this.mode = 'create';
      this.id = null
    }

  }


  onSavePost(form: NgForm) {
    if (this.mode === 'create') {
      this.postsService.addPost(
        this.file,
        form.value.title,
        form.value.category,
        form.value.allowComments,
        form.value.status,
        form.value.body
      )
    } else {
      this.postsService.updatePost(this.id, form.value);
    }
    this.dialogRef.close();
  }


}