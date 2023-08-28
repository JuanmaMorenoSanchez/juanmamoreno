import { Component, OnInit } from '@angular/core';
import { AlchemyService } from '@services/alchemy.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  constructor(
    private alchemyService: AlchemyService
  ) { }

  ngOnInit(): void {
  }

  handleLoginClick() {
  }

}
