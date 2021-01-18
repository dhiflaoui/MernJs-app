import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs'
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy  {
  //posts = [
    //{ title: 'First Post', content: 'this is the first post\'s content'  },
    //{ title: 'Second Post', content: 'this is the Second post\'s content'  },
    //{ title: 'Third Post', content: 'this is the Third post\'s content'  }
  //]
  posts: Post[] = [];
  isLoading = false;
  private posteSub: Subscription;
  totalPosts = 0;
  postPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10]; 
  


  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postPerPage,this.currentPage);
    this.posteSub = this.postsService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
    this.isLoading = false;
    this.totalPosts = postData.postCount;
    this.posts=postData.posts; 
    });
  }
  ngOnDestroy(){
    this.posteSub.unsubscribe();
  }

  onDelete(postId : string){
    this.isLoading = true;
    this.postsService.DeletePost(postId).subscribe(()=>{
      this.postsService.getPosts(this.postPerPage, this.currentPage);
    });


  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true ;
    this.currentPage = pageData.pageIndex + 1 ;
    this.postPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postPerPage,this.currentPage);
  }
}
