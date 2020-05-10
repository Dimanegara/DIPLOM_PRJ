import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, FbCreateResponse } from './interfaces';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(private http: HttpClient) { }
    create(post: Post): Observable<Post> {
        return this.http.post(`${environment.fbDbUrl}/news.json`, post)
            .pipe(map((response: FbCreateResponse) => {
                return {
                    ...post,
                    id: response.name,
                    date: new Date(post.date)
                }
            }))
    }
    getAll(): Observable<Post[]> {
        return this.http.get(`${environment.fbDbUrl}/news.json`)
            .pipe(map((response: { [key: string]: any }) => {
                return Object
                    .keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key,
                        date: new Date(response[key].date)
                    }))

            }))
    }
    getById(id: string): Observable<Post> {
        return this.http.get<Post>(`${environment.fbDbUrl}/news/${id}.json`)
            .pipe(map((post: Post) => {

                console.log(post)

                let text = post.text;
                let image = '';
                if (text.search('<img') != -1) {

                }
                return {
                    ...post,
                    id,
                    date: new Date(post.date)
                }
            }))
    }
    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/news/${id}.json`)
    }
    update(post: Post): Observable<Post> {
        return this.http.patch<Post>(`${environment.fbDbUrl}/news/${post.id}.json`, post)
    }
}