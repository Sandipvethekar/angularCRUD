import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss'],


})
export class RegistrationListComponent implements OnInit {

  public dataSource!: MatTableDataSource<User>;
  public users!: User[];
  @ViewChild(MatPaginator) Mpaginator!: MatPaginator;
  @ViewChild(MatSort) Msort!: MatSort;
  displayedColumns: string[] = ['id', 'firstName', 'LastName', 'email', 'mobile', 'bmiresult', 'gender', 'inquiryDate', 'action'];

  constructor(private api: ApiService,
    private router: Router,
    private ngconfirm: NgConfirmService,
    private ngtoast: NgToastService) {


  }
  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    this.api.getRegistration()
      .subscribe(res => {
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.Mpaginator;
        this.dataSource.sort = this.Msort;
      });
    // console.log(this.users); chek datta is fetched  or not
  };
  //update code
  edit(id: number) {
    this.router.navigate(['update', id]);
  }
  //delete
  delete(id: number) {
    this.ngconfirm.showConfirm("Are you sure to delete record", () => {
      this.api.deleteRegistration(id).subscribe(res => {
        this.ngtoast.success({ detail: "success", summary: "deleted Sucessfully", duration: 5000 });
        this.getUser();
      });
    }, () => {

    });

  }
  //back form page
  back() {
    this.router.navigate(['register']);
  }
  //filter code
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
