import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { Page1 } from './../page1/page1';

import { SessionService } from '../../services/session.service';
import { LoginRequest } from '../../services/models/login-request.model';

@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginPage {

    public login: LoginRequest = {
        email: null,
        password: null
    };
    public error: any = null;
    public submitted: boolean = false;
    
    constructor(
        private nav: NavController,
        private fb: FormBuilder,
        private session: SessionService)
    {
        
    }

    onLogin() {
        this.session.login(this.login)
            .then(() => this.nav.setRoot(Page1))
            .catch(error => this.error = error);
    }
}