import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {  NavController, NavParams } from '@ionic/angular';
import {CustomTosterService} from '../services/custom-toster.service';
import {LocalSessionManagementService} from '../services/local-session-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;

  constructor(public navCtrl: NavController,
    public fAuth: AngularFireAuth , 
    public tost:CustomTosterService, 
    public formBuilder: FormBuilder,
    public localSession:LocalSessionManagementService,
    private authService: AuthenticationService){

    //Init form Builder
    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      password:['', Validators.compose([Validators.required])],
      confirmPassword:['', Validators.compose([Validators.required])]
    });
}

  goToLoginPage(){
    this.navCtrl.navigateForward('/login');
  }

   registerAction(){
    //displayName
    if(this.formValidation()){
        this.authService.registerUser({email:this.registerForm.value.email,password:this.registerForm.value.password}).then(async data=>{
          await this.authService.updateProfile({displayName:this.registerForm.value.firstName+" "+this.registerForm.value.lastName});
          this.tost.presentToast("success","Thanks for being a part of us, Please use your credentail and enjoy !");
          this.registerForm.reset();
        },error=>{
          this.tost.presentToast("danger",error.message);
        });
    }
    
  }

  formValidation(){

    let returnVal = true;
    if(this.registerForm.value.password!==this.registerForm.value.confirmPassword){
      returnVal=false;
      this.tost.presentToast("danger","Please enter valid confirm password");
    }
    return returnVal;
  }

  ngOnInit() {
    this.localSession.checkToken().then(data=>{
      if(data){
        this.navCtrl.navigateForward('/tabs/tab1');
      }
    });
  }

}
