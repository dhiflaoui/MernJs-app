import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})//create instance of this service for all the  app
export class PostsService{
    private  posts : Post[] = [];
    private postsUpdate = new Subject < Post[] > ();
    

    constructor(private http: HttpClient){}


    getPosts(){
        //return [...this.posts];
        //return array of posts using observable
        this.http
        .get<{message: string, posts: any}>(
            'http://localhost:3000/api/posts'
            )
        .pipe(map((postData)=>
            {
            return postData.posts.map(post=>{
                return{
                    title: post.title,
                    content: post.content,
                    id:post._id
                }
            }); 
            }))
        .subscribe((transfposts) => {
            this.posts = transfposts;
            this.postsUpdate.next([...this.posts]);
        });
    }
    

    getPostUpdateListener(){
        return this.postsUpdate.asObservable();
    }


    addPost(title: string, content: string)
    {
        const post:Post= { id: null, title: title, content: content};
        this.http
        .post<{message: string,postId : string}>('http://localhost:3000/api/posts', post)
        .subscribe((responsedata)=>{
            const id= responsedata.postId;
            post.id = id;
            this.posts.push(post);
            this.postsUpdate.next([...this.posts]); //add copie of old one after adding a new one
        }); 
    }


    DeletePost(postId:string){
        this.http.delete("http://localhost:3000/api/posts/" + postId)
        .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdate.next([...this.posts]);
        });
    }
} 