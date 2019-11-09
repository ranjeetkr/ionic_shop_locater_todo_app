import { Component, OnInit} from '@angular/core';
import {  NavController} from '@ionic/angular';
import {CustomTosterService} from '../services/custom-toster.service';
import {LocalSessionManagementService} from '../services/local-session-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  loginSession:any;

  constructor(private navCtrl: NavController, 
              private tost:CustomTosterService, 
              private formBuilder: FormBuilder,
              private localSession:LocalSessionManagementService,
              private authService:AuthenticationService
              ){

              //Init form Builder
              this.loginForm = formBuilder.group({
                email: ['', Validators.compose([Validators.email, Validators.required])],
                password: ['', Validators.compose([Validators.required])]
              });
  }

  async login() {
    
    try {
        await this.authService.loginUser(
                                          {email:this.loginForm.value.email,
                                          password:this.loginForm.value.password}
                                          ).then(async data=>{
                                            await this.localSession.manageToken(data.user.uid);
                                            this.tost.presentToast("success","Login successfully");
                                            this.loginForm.reset();
                                            this.navCtrl.navigateForward('/tabs/tab1');
                                          },error=>{
                                            this.tost.presentToast("danger",error.message);
                                          });
    } catch (err) {
      this.tost.presentToast("danger","Something went wrong, Please try agian later");
    }
  }

  async getData(){
    
    await this.localSession.checkToken().then(data =>this.loginSession = data);
    console.log(this.loginSession);
  }

  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }

  ngOnInit() {
     //validate state of page
     this.localSession.checkToken().then(data=>{
      if(data){
        this.navCtrl.navigateForward('/tabs/tab1');
      }
    });
  }

}
