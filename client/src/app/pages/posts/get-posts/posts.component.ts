import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewPostsComponent } from '../new-post/new-posts.component';
import { Post } from "../post.model";
import { PostsService } from '../posts.service';
import { AuthService } from 'app/pages/auth/auth.service';





@Component({
  selector: 'app-posts',
  moduleId: module.id,
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  userId: string;
  userIsAuthenticated = false;
  posts: Post[] = [];
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public dialog: MatDialog, public postsService: PostsService, private authService: AuthService) { }

  dataSource: MatTableDataSource<Post>;
  displayedColumns: string[] = ['id', 'file', 'title', 'category', 'status', 'allowComments', 'date', 'actions'];

  ngOnInit() {
    this.postsService.getPosts();
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addNewPost() {
    const dialogRef = this.dialog.open(NewPostsComponent, {
      width: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }



  getPost(postId: string) {
    const modal = this.dialog.open(NewPostsComponent, {
      width: '800px',
      data: { id: postId }
    });

    modal.afterClosed().subscribe(result => {
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }



  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }


}


