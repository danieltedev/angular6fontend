import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { JwtDecode } from '../domain/jwt-decode';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: String;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  isLogado(): Boolean {
    return this.username !== null && this.username !== undefined;
  }

  ngOnInit() {
    this.activatedRoute.data.pipe(take(1)).subscribe((data: {jwtDecode : JwtDecode}) => this.username = data.jwtDecode ? data.jwtDecode.name : null);
  }

}
