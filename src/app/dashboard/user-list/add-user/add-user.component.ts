import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from '../../../login/interfaces/login';
import { RoleEnum } from '../../../api/users/interfaces/user.interface';

interface UserForm extends LoginForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  role: FormControl<string>;
  position: FormControl<string>;
  isActive: FormControl<boolean>;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  public roles:Array<{value:string, caption: string}> = [
    {
      value: RoleEnum.ADMIN,
      caption: 'Administrator'
    },
    {
      value: RoleEnum.MEMBER,
      caption: 'Mitarbeiter'
    }
  ]

  public form = new FormGroup<UserForm>({
    email: new FormControl({ value: '', disabled: false }, { nonNullable: true, validators: [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ] }),
    password: new FormControl({ value: '', disabled: false }, { nonNullable: true, validators: [ Validators.required]}),
    firstName: new FormControl({ value: '', disabled: false }, { nonNullable: true, validators: [ Validators.required] }),
    lastName: new FormControl({ value: '', disabled: false }, { nonNullable: true, validators: [ Validators.required] }),
    role: new FormControl({ value: '', disabled: false }, { nonNullable: true, validators: [ Validators.required] }),
    position: new FormControl({ value: '', disabled: false }, { nonNullable: true, validators: [ Validators.required] }),
    isActive: new FormControl({ value: false, disabled: false }, { nonNullable: true, validators: [ Validators.required] }),
  });

  constructor(public dialogRef: DialogRef) {}

  public emitFormClose():void
  {
    if(this.form.valid)
    {
      this.dialogRef.close(this.form.value);
    }
  }

  public hasError(formControl: FormControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }
}
