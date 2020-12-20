import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from './post.model';


@Injectable({providedIn: 'root'})//create instance of this service for all the  app
export class PostsService{
    private  posts : Post[]=[];
    private postsUpdate = new Subject<Post[]>();


    getPosts(){
        return [...this.posts];
    }

    getPostUpdateListener(){
        return this.postsUpdate.asObservable();
    }


    addPost(title: string, content: string)
    {
        const post:Post= { title: title, content: content};
        this.posts.push(post);
        this.postsUpdate.next([...this.posts]); //add copie of old one after adding a new one
    }
}