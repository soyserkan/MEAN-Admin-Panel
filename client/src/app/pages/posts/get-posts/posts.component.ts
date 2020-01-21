import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewPostsComponent } from '../new-post/new-posts.component';
import { Post } from "../post.model";
import { PostsService } from '../posts.service';





@Component({
  selector: 'app-posts',
  moduleId: module.id,
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public dialog: MatDialog, public postsService: PostsService) { }

  dataSource: MatTableDataSource<Post>;
  displayedColumns: string[] = ['id', 'image', 'header', 'category', 'status', 'approval', 'date', 'actions'];

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  addNewPost(): void {
    const dialogRef = this.dialog.open(NewPostsComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = new MatTableDataSource(this.posts);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


