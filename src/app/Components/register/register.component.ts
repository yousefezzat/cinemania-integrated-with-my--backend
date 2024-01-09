import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = "";
  password: string = "";
  name: string = "";
  registered: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.userService.isLogged())
      this.router.navigate(['/Home']);
  }
  handleRegister() {

    this.registered = this.userService.register(this.email, this.password, this.name);
    if (!this.registered) {
      alert("Register failed. Please try again.");
      return false;
    }
    this.router.navigate(['Login']);

    return true;
  }


}
