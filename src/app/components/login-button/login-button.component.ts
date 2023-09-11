import { Component, OnInit } from '@angular/core';
import { ConnectService } from '@services/connect.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  constructor(
    private connectService: ConnectService
  ) {
  }

  ngOnInit(): void {
  }

  handleConnectClick() {
    this.openConnectModal();
  }

  openConnectModal() {
    this.connectService.connectModal.openModal()
  }

}
