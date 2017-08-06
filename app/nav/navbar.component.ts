import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: 'app/nav/navbar.component.html',
  styles: [`
    .nav.navbar-nav {font-size: 15px}
    #searchForm {margin-right: 100px}
    @media (max-width: 1200px) {#searchForm {dispay:none}}
  `]
})

export class NavBarComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}