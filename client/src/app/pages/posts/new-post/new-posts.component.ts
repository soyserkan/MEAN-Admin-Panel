import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Post } from '../post.model';
import { mimeType } from "./mime-type.validator";


@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html',
  styleUrls: ['./new-posts.component.css']
})

export class NewPostsComponent implements OnInit {
  file = 'default.png';
  post: Post;
  form: FormGroup;
  imagePreview: string;
  private id: string;
  private mode = 'create';


  constructor(
    public postsService: PostsService,
    private dialogRef: MatDialogRef<NewPostsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      'body': new FormControl(null, {
        validators: [Validators.required]
      }),
      'status': new FormControl(null, {
        validators: [Validators.required]
      }),
      'allowComments': new FormControl(null, {
        validators: [Validators.required]
      }),
      'category': new FormControl(null, {
        validators: [Validators.required]
      }),
      'file': new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });


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
        this.form.setValue({
          'title': this.post.title,
          'body': this.post.body,
          'status': this.post.status,
          'allowComments': this.post.allowComments,
          'category': this.post.category,
          'file': this.post.file
        })

      });
    } else {
      this.mode = 'create';
      this.id = null
    }

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ file: file });
    this.form.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(
        this.form.value.file,
        this.form.value.title,
        this.form.value.category,
        this.form.value.allowComments,
        this.form.value.status,
        this.form.value.body
      )
    } else {
      this.postsService.updatePost(
        this.id,
        this.form.value.file,
        this.form.value
      );
    }
    // this.form.reset();
    this.dialogRef.close();
  }


}