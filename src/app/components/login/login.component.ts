import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SplitterModule } from 'primeng/splitter';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [SplitterModule, FormsModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  login() {
    this.http
      .post(environment.loginUrl  +'/api/user/login', null, {
        params: { username: this.username, password: this.password },
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          this.message = response;
        },
        error: (err) => {
          this.message = 'Login failed: ' + err.error;
        },
      });
  }

  logout() {
    this.http
      .post(environment.loginUrl +'/api/user/login/logout', null, {
        params: { username: this.username },
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          this.message = response;
        },
        error: (err) => {
          this.message = 'Logout failed: ' + err.error;
        },
      });
  }
}
