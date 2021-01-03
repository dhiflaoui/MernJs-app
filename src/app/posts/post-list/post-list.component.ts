import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs'
import { PostsService } from '../posts.service';
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
  posts:Post[] = [];
  private posteSub: Subscription;



  constructor(public postsService: PostsService) { }

  ngOnInit(): void {

    this.postsService.getPosts();
    this.posteSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
    this.posts=posts; 
    });
  }
  ngOnDestroy(){
    this.posteSub.unsubscribe();
  }

}
