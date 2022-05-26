import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  links = ['manage-user', 'manage-todo', 'manage-requests'];
  activeLink = this.route.snapshot.routeConfig?.path;

  ngOnInit(): void {
  }

}
