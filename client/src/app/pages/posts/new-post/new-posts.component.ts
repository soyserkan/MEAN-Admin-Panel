import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import {MatDialogRef} from '@angular/material'


@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html',
  styleUrls: ['./new-posts.component.css']
})

export class NewPostsComponent {
  id = 'asd';
  date = 'asd';

  constructor(public postsService: PostsService,private dialogRef: MatDialogRef<NewPostsComponent>) { }

  onSubmit(form: NgForm) {
    this.postsService.addPost(
      this.id, form.value.image,
      form.value.header, form.value.category, form.value.status,
      form.value.approval, this.date)
      this.dialogRef.close();
  }


}