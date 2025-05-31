import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    FormsModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  private firestore: Firestore;

  constructor(
    private dialogRef: MatDialogRef<DialogAddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Firestore-Instanz aus den Dialog-Daten übernehmen
    this.firestore = data.firestore;
  }

  saveUser() {
    if (!this.birthDate) {
      console.error('Birth date is required');
      return;
    }

    // Daten vorbereiten und speichern
    this.user.birthDate = this.birthDate.getTime();
    const userData = this.user.toJSON();

    try {
      const usersRef = collection(this.firestore, 'users');
      addDoc(usersRef, userData)
        .then(result => {
          console.log('Adding user finished', result);
          this.dialogRef.close(result.id); 
        })
        .catch(error => {
          console.error('Error adding user:', error);
        });
    } catch (error) {
      console.error('Firestore access error:', error);
    }
  }
}