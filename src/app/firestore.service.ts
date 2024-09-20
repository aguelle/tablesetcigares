import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, getDoc } from '@angular/fire/firestore';
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

  getUserRole(uid: string): Promise<any> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return getDoc(userDocRef).then(docSnapshot => {
      return docSnapshot.exists() ? docSnapshot.data() : null;
    });
  }
}
