import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})//create instance of this service for all the  app
export class PostsService{
    private  posts : Post[] = [];
    private postsUpdate = new Subject < Post[] > ();
    

    constructor(private http: HttpClient){}


    getPosts(){
        //return [...this.posts];
        //return array of posts using observable
        this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
        .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdate.next([...this.posts]);
        });
    }
    

    getPostUpdateListener(){
        return this.postsUpdate.asObservable();
    }


    addPost(title: string, content: string)
    {
        const post:Post= { id: null, title: title, content: content};
        this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
        .subscribe((responsedata)=>{
            console.log(responsedata.message);
            this.posts.push(post);
            this.postsUpdate.next([...this.posts]); //add copie of old one after adding a new one
        });
        
        
    }
}