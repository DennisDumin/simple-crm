import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule], 
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}