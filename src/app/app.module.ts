import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2Webstorage } from 'ng2-webstorage';

import { AppComponent } from './app.component';
import { FocusDirective } from './focus.directive';
import { FruitPipe } from './fruit.pipe';
import { WrongPipe } from './wrong.pipe';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        Ng2Webstorage
    ],
    declarations: [
        AppComponent,
        FocusDirective,
        FruitPipe,
        WrongPipe
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
