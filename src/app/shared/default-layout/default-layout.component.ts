import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(private router: Router,){
    
  }

  ngOnInit(): void {
    
  }

  logOut(){
    localStorage.clear();
    window.location.replace('/');
  }
}
