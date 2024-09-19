import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  getCigars(): Observable<any[]> {
    const cigarsCollection = collection(this.firestore, 'cigars');
    return collectionData(cigarsCollection);
  }
}
