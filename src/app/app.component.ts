import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gowaka-test';
  constructor() {}

 // tslint:disable-next-line: use-lifecycle-interface
 ngOnInit() {
 }

}
