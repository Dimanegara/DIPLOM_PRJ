import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from 'src/app/shared/posts.service';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  post: Post

  updateSubsctiption: Subscription

  isSubmitted = false

  constructor(private rout: ActivatedRoute, private postsService: PostsService) { }

  ngOnInit(): void {
    this.rout.params.pipe(switchMap((params: Params) => {
      return this.postsService.getById(params['id'])
    })
    ).subscribe((post: Post) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
        photo: new FormControl(post.photo)
      })
    })
  }
  ngOnDestroy() {
    if (this.updateSubsctiption) {
      this.updateSubsctiption.unsubscribe()
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.isSubmitted = true
    this.updateSubsctiption = this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
      photo: this.form.value.photo

    }).subscribe(() => {
      this.isSubmitted = false

    })
  }

}
