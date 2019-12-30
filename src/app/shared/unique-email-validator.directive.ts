
import { AdminusersService } from './../services/adminusers.service';
import { Observable } from 'rxjs';
import { map, debounceTime, filter, distinctUntilChanged, take } from 'rxjs/operators';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidatorFn } from '@angular/forms';
import { Directive } from '@angular/core';

export function UniqueEmailValidator(adminUsersServce: AdminusersService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return adminUsersServce.adminGetEmailAddress(c.value).pipe(
      debounceTime(700),
      map(users => {
         return users && users.length > 0 ? { uniqueEmail : true } : null;
      })
    );
  }
}

@Directive({
  selector: '[UniqueEmail]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirective, multi: true }]
})
export class UniqueEmailValidatorDirective implements AsyncValidator {

  constructor(private adminUsersService: AdminusersService) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.adminUsersService.adminGetEmailAddress(c.value).pipe(
      filter(text => text.length > 5),
      debounceTime(1000),
      distinctUntilChanged(),
      map(users => {
        return users && users.length > 0 ? { 'uniqueEmail ': true } : null;
      })
    );
  }

}



