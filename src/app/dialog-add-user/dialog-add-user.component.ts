import { Component, NgModule, Injectable } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;

  constructor(private firestore: Firestore) { }

  saveUser() {
    if (!this.birthDate) {
      console.error('Birth date is required');
      return;
    }

    this.user.birthDate = this.birthDate.getTime();
    const userData = this.user.toJSON();

    const usersRef = collection(this.firestore, 'users');
    addDoc(usersRef, userData).then(result => {
      console.log('Adding user finished', result);
    }).catch(error => {
      console.error('Error adding user:', error);
    });
  }
}