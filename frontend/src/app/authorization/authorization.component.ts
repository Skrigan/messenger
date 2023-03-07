import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/secvices/auth.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  form: FormGroup

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9][-\\s\\.]?[0-9][-\\s\\.]?[0-9][-\\s\\.]?[0-9]{4,6}$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
    });
  }

  submit() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe(
        () => console.log('Login successful'),
        error => console.warn(error)
      );
      console.log('formData: ', {...this.form.value});
      // this.form.reset();
    }
  }
}
