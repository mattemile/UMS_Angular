import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../classes/User';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  User: User;
  constructor(private route:ActivatedRoute, private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
    this.userService.getUser(+p.get('id')).subscribe(res => this.User = res.result.anagrafica[0])  //this.users = res['data']);
    //this.userService.getUser(+p.get('id')).subscribe(res => console.log(res.result.anagrafica))  //this.users = res['data']);
      //this.userService.getUser(+p.get('id')).subscribe(response => this.User = response['data']);
    })
  }
  backToUsers(){
    this.router.navigate(['users']);
  }
}
