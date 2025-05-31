import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';
import { Firestore } from '@angular/fire/firestore';
import { inject } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user = new User();
  private firestore = inject(Firestore);

  constructor(private dialog: MatDialog) { }

  openDialog() {
    // Das ist der kritische Teil: Konfiguration mit dem Firestore weitergeben
    const dialogConfig = new MatDialogConfig();
    
    // Explizit den Firestore-Dienst als Data-Objekt übergeben
    dialogConfig.data = {
      firestore: this.firestore
    };
    
    // Dialog öffnen mit der Konfiguration
    const dialogRef = this.dialog.open(DialogAddUserComponent, dialogConfig);
    
    // Optional: Dialog-Ergebnis verarbeiten
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }
}