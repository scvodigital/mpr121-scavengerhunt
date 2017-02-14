import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

import { Participant } from './login.interface';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    participant: FormGroup;

    constructor(private localSt:LocalStorageService) {}

    ngOnInit() {
        this.localSt.observe('key')
            .subscribe((value) => console.log('new value', value));

        this.participant = new FormGroup({
            email: new FormControl(''),
            progress: new FormGroup({
                q1: new FormControl(''),
                q2: new FormControl(''),
                q3: new FormControl(''),
                q4: new FormControl(''),
                q5: new FormControl(''),
                q6: new FormControl(''),
                q7: new FormControl(''),
                q8: new FormControl('')
            })
        });
    }

    onSubmit({ value, valid }: { value: Participant, valid: boolean }) {
        console.log(value, valid);
    }

}
