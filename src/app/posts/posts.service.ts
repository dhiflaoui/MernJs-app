import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})//create instance of this service for all the  app
export class PostsService{
    private  posts : Post[] = [];
    private postsUpdate = new Subject < Post[] > ();
    

    constructor(private http: HttpClient , private router : Router){}


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

    getPost(id : string){
        return this.http.get<{_id: string, title: string, content: string}>(
            'http://localhost:3000/api/posts' + id
        );
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
            this.router.navigate(["/"]);
        }); 
    }
    
    UpdatePost(id : string, title:string, content: string){
        const post:Post= { id: id, title: title, content: content};
        this.http.put("http://localhost:3000/api/posts/" + id, post)
        .subscribe(response => console.log(response));
        const updatedPosts= [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id == post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdate.next([...this.posts]);//add copie of old one after adding a new one
        this.router.navigate(["/"]);
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