import { style } from '@angular/animations';
import { Component ,EventEmitter,Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
    selector : 'app-post-create',
    templateUrl:'./post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    
    postCreated = new EventEmitter <Post>();
    
    constructor(public postsService: PostsService) {}
    OnAddPost(form:NgForm){ 
        if(form.invalid){
            return;
        }
        this.postsService.addPost(form.value.title, form.value.content);
        form.resetForm(); //reset form after adding the post 

    } 
}