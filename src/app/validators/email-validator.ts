import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AbstractControl, AsyncValidatorFn, ValidationErrors, AsyncValidator } from '@angular/forms';
import { map, debounceTime } from 'rxjs/operators'
import { AdminusersService } from '../services/adminusers.service';

@Injectable({
    providedIn: 'root'
})

export class GetEmailValidator {

    constructor(private adminusers: AdminusersService) {

    }

    emailvalidate(): AsyncValidatorFn {
        return (control: AbstractControl) : Observable <ValidationErrors | null> => {
            return this.adminusers.adminGetEmailAddress(control.value)
                .pipe(
                    debounceTime(500),
                    map(res => {
                        return res ? { emailExists: true } : null;
                    })
                )
        }

    }

}
