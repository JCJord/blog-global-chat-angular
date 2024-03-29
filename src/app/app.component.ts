import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private route: Router) {

  }

  isNotOnLoginPage(){
    return this.route.url != '/signin' && this.route.url != '/signup';
  }
}
