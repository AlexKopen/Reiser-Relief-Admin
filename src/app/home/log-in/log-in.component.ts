import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
    formSubmittedAndNotProcessed = false;
    logInUnsuccessful = false;
    passwordInput: string;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    onSubmit(logInForm: FormGroup) {
        this.formSubmittedAndNotProcessed = true;
        this.logInUnsuccessful = false;

        if (logInForm.valid) {
            this.formSubmittedAndNotProcessed = false;

            this.authService.login(logInForm.value['email'], logInForm.value['password']);
        }
    }

}
