import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginForm } from './interfaces/login';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form = new FormGroup<LoginForm>({
    email: new FormControl({ value: '', disabled: false }, { nonNullable: true }),
    password: new FormControl({ value: '', disabled: false }, { nonNullable: true }),
  });

  constructor(private auth: AuthService,
              private router:Router) {
  }

  onSubmit() {
    if (this.form.status === 'VALID') {
      const values = this.form.value;

      this.auth.login(values.email || '', values.password || '').subscribe({
          next: () => {
           this.router.navigate(['/']);
          }
        },
      );
    }
  }
}
