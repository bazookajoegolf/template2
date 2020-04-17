

import {AbstractControl, ValidationErrors} from '@angular/forms';



export class CompareValue {

    static comparePassword(c: AbstractControl) : ValidationErrors | null {
        if(c.value == null || c.value.length ===0 ) return null;

        //  return an error value if first value is greater than second value
        if (c.get('minpassword').value !== c.get('maxpassword').value) {
           // return {match: true};
           c.get('confirmpassword').setErrors({confirmpassword: true});
        }
        return null;
    }
}