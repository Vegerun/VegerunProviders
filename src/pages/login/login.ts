import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { MenuPage } from './../menu/menu';

import { SessionService } from '../../services/session.service';

@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginPage {

    public loginForm: FormGroup;
    public error: any = null;
    
    constructor(
        private nav: NavController,
        private fb: FormBuilder,
        private session: SessionService)
    {
        this.loginForm = fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.loginForm.setValue({
            email: 'manager@whatthepitta.com',
            password: 'whatthepitta!'
        });
    }

    onLogin() {
        this.session.login(this.loginForm.value)
            .then(() => this.nav.setRoot(MenuPage))
            .catch(error => this.error = error);
    }
}