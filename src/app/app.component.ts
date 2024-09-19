import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirestoreService } from './firestore.service';
import { CommonModule } from '@angular/common'; // Importer CommonModule


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  cigars: any[] = [];

  constructor(private firestoreService: FirestoreService) {}
  ngOnInit() {
    this.firestoreService.getCigars().subscribe((data) => {
      this.cigars = data;
      console.log(this.cigars); // Pour vérifier dans la console
    });
  }

  title = 'cigar-club-app';
}
