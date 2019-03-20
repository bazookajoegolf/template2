

import {AbstractControl, ValidationErrors} from '@angular/forms';



export class MatchPassword {

    static match(c: AbstractControl) : ValidationErrors | null {
        if(c.value == null || c.value.length ===0) return null;
        if (c.get('password').value !== c.get('confirmpassword').value) {
           // return {match: true};
           c.get('confirmpassword').setErrors({confirmpassword: true});
        }
        return null;
    }
}