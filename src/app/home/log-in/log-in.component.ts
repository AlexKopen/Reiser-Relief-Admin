import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {DataService} from '../../shared/data.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
    formSubmittedAndNotProcessed = false;
    logInUnsuccessful = false;
    passwordInput: string;
    loginStateSubscription: Subscription;

    constructor(private authService: AuthService, private dataService: DataService) {
    }

    ngOnInit() {
        this.loginStateSubscription = this.dataService.loginUnsuccessfulSubject.subscribe((value) => {
            this.logInUnsuccessful = value;
        });
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
