import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = "http://localhost:3000/enquirylist"; //local json data link
  //private url: string = "https://jsonplaceholder.typicode.com/users"; //facke json url
  constructor(private http: HttpClient) {

  }
  //post form data
  postRegistration(registerobj: User) {
    return this.http.post<User>(this.url, registerobj);
  }
  //get form data
  getRegistration() {
    return this.http.get<User[]>(this.url);
  }
  //update form data
  updateRegistration(registerobj: User, id: number) {
    return this.http.put<User>(`${this.url}/${id}`, registerobj);
  }
  //delete form data
  deleteRegistration(id: number) {
    return this.http.delete<User>(`${this.url}/${id}`);
  }
  getRegistrationUserId(id: number) {
    return this.http.get<User>(`${this.url}/${id}`);
  }
}
