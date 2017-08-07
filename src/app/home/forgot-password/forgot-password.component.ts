import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    passwordRecoverySubmittedAndNotProcessed = false;
    passwordRecoveryUnsuccessful = false;
    passwordRecoverySuccess = false;

    constructor() {
    }

    ngOnInit() {
    }

    onSubmit(passwordRecoveryForm: FormGroup) {
        if (passwordRecoveryForm.valid) {
            if (this.sendPasswordRecovery()) {
                this.passwordRecoverySuccess = true;
            } else {
                this.passwordRecoveryUnsuccessful = true;
            }
        } else {
            this.passwordRecoverySubmittedAndNotProcessed = true;
        }
    }

    sendPasswordRecovery(): boolean {
        return false;
    }
}
