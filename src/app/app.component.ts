import { Component } from '@angular/core';
import { StorageService } from './storage/storage.service';
@Component({
  selector: 'app-root',
  providers: [StorageService],
  templateUrl: './app.component.html'
})
export class AppComponent {}
