import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { UserService } from '../services/user.service';
import { IndividualConfig } from 'ngx-toastr';
import { CommunService, toastPayload } from '../services/commun.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
  animations: [
    trigger('formAnimation', [
      state('login', style({ opacity: 1 })),
      state('register', style({ opacity: 1 })),
      transition('login <=> register', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class AuthentificationComponent {
  toast!: toastPayload;

  activeForm: 'login' | 'register' = 'login';
  registerData: any = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  loginCredentials: any = {
    email: '',
    password: '',
  };

  constructor(
    private as: UserService,
    private cs: CommunService,
    private router: Router
  ) {}

  switchForm(form: 'login' | 'register'): void {
    this.activeForm = form;
  }
  showToast(type: string, message: string) {
    this.toast = {
      message: message,
      title: '',
      type: type,
      ic: {
        timeOut: 5000,
        closeButton: true,
      } as IndividualConfig,
    };
    this.cs.showToast(this.toast);
  }
  register(): void {
    this.as.register(this.registerData).subscribe(
      (response) => {
        this.showToast('success', 'Account registered successfully !');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.showToast('error', 'Faild to create a new account ! ');
        console.error('Registration failed:', error);
        if (error.error && error.error.message) {
          console.error('Server error message:', error.error.message);
        }
      }
    );
  }

  login(): void {
    this.as.login(this.loginCredentials).subscribe(
      (response) => {
        this.showToast('success', 'Welcome To Recrutini !');
        window.location.reload();
        this.router.navigate(['/offers']);
      },
      (error) => {
        this.showToast('error', 'Login Failed');
      }
    );
  }
}
