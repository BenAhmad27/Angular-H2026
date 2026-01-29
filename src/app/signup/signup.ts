import {Component, inject, signal, Injectable} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {RouterModule, Router} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, AbstractControl, ReactiveFormsModule, Validators, ValidationErrors} from '@angular/forms';

import { AuthService } from '../service/auth-s';
import { UserCredentials } from '../models/user-credential';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-signup',
  imports: [
    RouterModule, ReactiveFormsModule, JsonPipe,
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule
  ],
  template: `
    <form [formGroup]="signupForm" (submit)="handleSubmit()">

        @if (error()) {
            <div id="error">
                {{ error() }}
            </div>
        }

        <mat-form-field appearance="outline">

            <mat-label>Username</mat-label>
            <input formControlName="username" matInput>

            @if(usernameControl.hasError('required')) {
                <mat-error>Please enter a username</mat-error>
            }
            @else if(usernameControl.hasError('email')) {
                <mat-error>Username must be an email</mat-error>
            }

        </mat-form-field>

        <mat-form-field appearance="outline">

            <mat-label>Password</mat-label>
            <input formControlName="password" matInput type="password">

            <mat-error>Please enter a password</mat-error>

        </mat-form-field>

        <mat-form-field appearance="outline">
            <mat-label>Password confirmation</mat-label>
            <input formControlName="passwordConfirmation" [errorStateMatcher]="confirmationMatcher" matInput type="password">

            @if(passwordConfirmationControl.hasError('required')) {
                <mat-error>Please enter a password confirmation</mat-error>
            }
            @else if(signupForm.hasError('passwordConfirmationMustMatch')) {
                <mat-error>Password confirmation must match password</mat-error>
            }

        </mat-form-field>

        <div id="buttons">
            <button mat-flat-button>Sign up</button>

            <a mat-button routerLink="/login">Cancel</a>
        </div>
    </form>

    <pre>
    {{
        {
            username: signupForm.get('username')?.errors,
            password: signupForm.get('password')?.errors,
            passwordConfirmation: signupForm.get('passwordConfirmation')?.errors,
            signupForm: signupForm.errors,
            signupFormValid: signupForm.valid
        } | json
    }}
    </pre>
  `,
  styles: `
    #error {
        background-color: pink;
        border-radius: 4px;
        padding: 8px;
        margin-bottom: 16px;
        color: darkred;
    }
  `
})
export class SignupPage {
    private readonly router = inject(Router)
    private readonly auth = inject(AuthService)

    error = signal<string | null>(null)

    passwordControl = new FormControl('', [Validators.required])
    passwordConfirmationControl = new FormControl('', [Validators.required])

    signupForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.email]),
        password: this.passwordControl,
        passwordConfirmation: this.passwordConfirmationControl
    }, [this.passwordMatch])

    confirmationMatcher = new ConfirmationMatcher()

    private passwordMatch(form: AbstractControl): ValidationErrors | null {

        if (form.value?.password != form.value?.passwordConfirmation) {
            return { passwordConfirmationMustMatch: true };
        } else {
            return null
        }

    }

    get usernameControl(): FormControl {
        return this.signupForm.get('username') as FormControl
    }

    handleSubmit() {

        if (this.signupForm.valid) {
            console.log(this.signupForm.value)
            const { username, password } = this.signupForm.value
            const credentials = new UserCredentials({ username: username!, password: password! })

            this.auth.signUp(credentials).subscribe( success => {
                if (success) {
                    this.router.navigate(['/'])
                }
                else {
                    this.error.set('Could not create account')
                }
            })
        }

    }
}

class ConfirmationMatcher implements ErrorStateMatcher {
  // Pour lier l'affichage de l'erreur sur le FORM avec le CONTROL
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;

    return !!(
        control
        && (control.invalid || form?.hasError('passwordConfirmationMustMatch'))
        && (control.dirty || control.touched || isSubmitted)
    );
  }
}