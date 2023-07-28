import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public userId!: number;
  public UserDetails!: User;
  constructor(private api: ApiService,
    private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.userId = val['id'];
      this.fetchdata(this.userId);
    });
  }
  fetchdata(userId: number) {
    this.api.getRegistrationUserId(userId).subscribe(res => {
      this.UserDetails = res;
      //console.log(this.UserDetails); check value diplay or not
    });
  }
}
