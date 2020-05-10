import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
        QuillModule.forRoot()
    ],
    exports: [
        HttpClientModule,
        QuillModule
    ],
    providers: [],
})
export class SharedModule { }