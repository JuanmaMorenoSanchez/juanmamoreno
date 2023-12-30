import { Component, OnInit } from '@angular/core';
// import { Web3ModalService } from '@mindsorg/web3modal-angular';
// import Web3Provider from "web3";

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  constructor(
    // private web3modalService: Web3ModalService
  ) {
  }

  ngOnInit(): void {
  }

  handleConnectClick() {
    this.handleConnection();
  }

  handleConnection() {
    // TODO: Try to makes sense to the response and handle status connection and persist in akita
    // this.web3modalService.open().then((res: any) => {
    //   console.log("RES ", res);
    //   const provider = new Web3Provider(res);
    //   console.log("provider ", provider)
    //   // undefined si no hace connect
    // }).catch(err => console.log("RES ", err));

  }

  connect() {
    //save user data
    // set flag here for UI
  }

  disconnect() {
    //erase user data
    // set flag here for UI

  }

}