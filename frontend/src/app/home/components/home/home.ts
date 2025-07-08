import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  accountBalance: number = 1245;
  connectedUser = {
    first_name: 'Saïd',
    last_name: 'Laamri',
    email: 'slaamri@yahoo.fr',
    telephone: '06 12 34 56 78',
    street: '12 rue de la République',
    postal_code: '75001',
    city: 'Paris'
  };
  userUnits = [
    { designation: 'Lot 3B', floor: '2e étage', tantiemes: 120 },
    { designation: 'Lot 5C', floor: '4e étage', tantiemes: 95 }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Tu pourras ici remplacer les valeurs ci-dessus par des appels HTTP vers ton backend plus tard
  }
}
