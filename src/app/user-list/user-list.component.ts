import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../shared/models/User';
import {UserService} from '../shared/services/user.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.users$ = this.userService.getUsers();
  }
}
