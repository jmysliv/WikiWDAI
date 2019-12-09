import { ActivatedRoute } from '@angular/router';
import { User, UserService } from './../user.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  subscription: Subscription;
  displayLogin = true;
  loggedUser: User;
  param1 = 'Dodaj Kurs';
  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.subscription = this.userService.isLoggedIn().subscribe(message => {
      if (message) {
        this.loggedUser = message;
      } else {
        this.loggedUser = null;
      }
    });
  }

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('id')) {this.param1 = 'Edytuj Kurs'; }
  }

  changeDisplay() {
    this.displayLogin = !this.displayLogin;
  }

  logOut() {
    this.userService.logout();
  }

  checkIfAdmin() {
    return this.userService.checkIfAdmin(this.loggedUser);
  }

}
