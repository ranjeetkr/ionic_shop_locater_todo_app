import { Component,NgZone } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {ActionSheetController} from '@ionic/angular';
import {CustomTosterService} from '../services/custom-toster.service';
import { ActivatedRoute } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';


declare var google;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  image: any;
  shopForm: FormGroup;
  id : any;
  GoogleAutocomplete:any;
  autocomplete:any;
  autocompleteItems:any;
  geocoder:any;
  markers:any;

  

  constructor(
    private imagePicker: ImagePicker,
    public toastCtrl: CustomTosterService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private webview: WebView,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    public route: ActivatedRoute,
    private zone: NgZone

  ) {
    
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];


    this.geocoder = new google.maps.Geocoder;
    this.markers = [];

    this.id = this.route.snapshot.params.id;
    this.image = "./assets/no-image.jpg";
    this.shopForm = formBuilder.group({
      name: ['', Validators.compose([ Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      image:[''],
      lat:[''],
      lng:['']
    });
  }

  saveShop(){
    this.shopForm.value.image=this.image;

    if(this.id){
      this.authService
        .updateShop(this.id,this.shopForm.value)
        .then(data=>{
          
          this.toastCtrl.presentToast('success',"Record has been updated successfully");
        });
    }else{
      this.authService.addShopDetail(this.shopForm.value).then(data=>{this.image = "./assets/no-image.jpg"; this.shopForm.reset(); this.toastCtrl.presentToast('success',"Record has been saved successfully");}, error=>{console.log(error)})
    }
  }
  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      this.toastCtrl.presentToast('danger',"Something went wrong, Please try again later");
    });

  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(0);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(1);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

 
  updateSearchResults(){
    try{
      if (this.shopForm.value.address == '') {
        this.autocompleteItems = [];
        return;
      }
      this.GoogleAutocomplete.getPlacePredictions({ input: this.shopForm.value.address },
      (predictions, status) => {
        
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions && predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
    }catch(e){
      console.log(e,"Custom error");
    }
   
  }
  
  selectSearchResult(item){
    
    this.autocompleteItems = [];
    this.shopForm.patchValue({address:item.description,
      lat:22.5797,
      lng:88.4598
    })

    try{
      this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
        if(status === 'OK' && results[0]){
          let position = {
              lat: results[0].geometry.location.lat,
              lng: results[0].geometry.location.lng
          };
  
          this.shopForm.patchValue({
            lat:position.lat,
            lng:position.lng
          });
  
          let marker = new google.maps.Marker({
            position: results[0].geometry.location,
            // map: this.map,
          });
          this.markers.push(marker);
          // this.map.setCenter(results[0].geometry.location);
        }
      })
    }catch(e){
      console.log(e,"update Detail");
    }
  
  }

  ionViewWillEnter(){
    this.shopForm.reset();
    try{
      if(this.id){
        this.authService.getShop(this.id).then(data=>{
          console.log(data);
          this.image = data.image ? data.image : this.image; 
          this.shopForm.patchValue({...data});
        })
      }
    }catch(e){
      console.log("LOG:",e)
    }
   
    
  }


}
