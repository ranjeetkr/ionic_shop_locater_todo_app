import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { resolve } from 'q';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  constructor(private fAuth: AngularFireAuth, private firestore: AngularFirestore ){}
 
  registerUser(value){
   return new Promise<any>((resolve, reject) => {
     this.fAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
 
  loginUser(value){
   return new Promise<any>((resolve, reject) => {
     this.fAuth.auth.signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
 
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(this.fAuth.auth.currentUser){
        this.fAuth.auth.signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
 
  userDetails(){
    return firebase.auth().currentUser;
  }

  updateProfile(profileDetail:any){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().currentUser.updateProfile(profileDetail)
      .then(
        res => resolve(res),
        err => reject(err))
    })
  }

  addShopDetail(shopDetail:any){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      console.log(currentUser.uid);
      this.firestore.collection('shops').doc(currentUser.uid).collection('details').add(shopDetail)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }


  listShops(){
    return new Promise<any>((resolve,reject)=>{
      this.fAuth.authState.subscribe( user =>{
        if (user) { 
          this.firestore.collection('shops').doc(user.uid).collection('details').snapshotChanges().subscribe(data=>{
            resolve(data);
          });
         }
      });
    });   
  }

  getShop(id:any){
    return new Promise<any>((resolve, reject) => {
      this.fAuth.authState.subscribe(currentUser => {

        if(currentUser){
          this.firestore.doc<any>('shops/' + currentUser.uid + '/details/' + id).valueChanges()
          .subscribe(snapshots => {
            resolve(snapshots);
          }, err => {
            reject(err)
          })
        }

      })
    });
  }

  updateShop(id, value){
    return new Promise<any>((resolve, reject) => {
      this.fAuth.authState.subscribe(currentUser => {
        this.firestore.collection('shops').doc(currentUser.uid).collection('details').doc(id).set(value)
        .then(
          res => resolve(res),
          err => reject(err)
        )
      });
    });
  }

  deleteShop(id){
    return new Promise<any>((resolve, reject) => {

      this.fAuth.authState.subscribe(currentUser => {
        this.firestore.collection('shops').doc(currentUser.uid).collection('details').doc(id).delete()
        .then(
          res => resolve(res),
          err => reject(err)
        )
      });
    })
  }

  
}