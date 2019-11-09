import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestore } from '@angular/fire/firestore';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicStorageModule.forRoot(),
            IonicModule.forRoot(),
            AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestore,
    ImagePicker,
    WebView,
    Camera,
    Geolocation,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
