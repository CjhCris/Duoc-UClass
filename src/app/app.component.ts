import { Component } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private auth: AuthService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      const token = localStorage.getItem('token');
      if (token) {
        this.auth.setToken(token);
      }
      else {
      }
    });
  }
}
