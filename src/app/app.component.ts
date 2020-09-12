import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from './services/navigation/navigation.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './services/http/auth.service';
import {ModalComponent} from './components/modal/modal.component';
import swal from "sweetalert2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dubaiBlog';

  public loginForm: FormGroup;
  public loading: boolean;

  @ViewChild('loginModal') loginModal: ModalComponent;
  @ViewChild('photoModal', {static: true}) photoModal: ModalComponent;

  constructor(
    private navigation: NavigationService,
    private auth: AuthService,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: null,
      signup: false,
    });
  }

  ngOnInit() {
    const token = window.localStorage.getItem('token');
    if (token) {
      this.auth.isLoggedIn().subscribe((res: any) => {
        if (res.success) {
          this.auth.user = {...res.data, superAccess: res.superAccess};
        }
      });
    }
  }

  async login() {
    if (!this.loginForm.valid) {
      return;
    }
    this.loading = true;
    this.loginModal.hide();
    const data = this.loginForm.value;
    let res;
    try {
      if (data.signup) {
        res = await this.auth.signup(data).toPromise();
      } else {
        res = await this.auth.login(data.username, data.password).toPromise();
      }

      this.loginForm.reset();
      if (res.success) {
        this.auth.user = {...res.data, superAccess: res.superAccess};
        window.localStorage.setItem('token', res.data.sessionToken);
        swal.fire({
          title: "Success",
          icon: "success",
          text: "Welcome, " + res.data.username,
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        swal.fire({
          title: "Oops!",
          icon: "error",
          text: res.error.message || "Something went wrong...",
          timer: 3000,
          showConfirmButton: false
        });
      }
      this.loading = false;
    } catch (e) {
      console.error(e);
      swal.fire({
        title: "Oops!",
        icon: "error",
        text: "Something went wrong...",
        timer: 2000,
        showConfirmButton: false
      });
      this.loading = false;
    }
  }
}
