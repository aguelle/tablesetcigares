import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { UserModel } from './user.model'; // Assure-toi que tu as cette interface

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  public currentUser$: Observable<UserModel | null> = this.currentUserSubject.asObservable();

  constructor(private auth: Auth, private firestore: Firestore) {
    onAuthStateChanged(this.auth, user => {
      this.isAuthenticatedSubject.next(!!user);
      if (user) {
        this.createUser(user);
        this.currentUserSubject.next(this.mapToUserModel(user)); // Mappage au modèle utilisateur
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  signIn(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.isAuthenticatedSubject.next(true);
      });
  }

  signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then(userCredential => {
        const user = userCredential.user;
        this.createUser(user);
        this.isAuthenticatedSubject.next(true);
      });
  }

  private async createUser(user: FirebaseUser) {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        role: 'user' // Définit un rôle par défaut
      }, { merge: true });
    }
  }

  private mapToUserModel(user: FirebaseUser): UserModel {
    return {
      uid: user.uid || '',
      email: user.email || '',
      displayName: user.displayName || '',
      phoneNumber: user.phoneNumber || '',
      role: 'user' // Ajoute un rôle par défaut ou récupère depuis Firestore
    };
  }

  async getUserRole(uid: string): Promise<string | null> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const docSnapshot = await getDoc(userRef);
    console.log('Document snapshot:', docSnapshot.exists(), docSnapshot.data());
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      return data?.['role'] || null; // Assure-toi que le type est correct ici
    }
    
    return null;
  }

  signOut(): Promise<void> {
    return signOut(this.auth).then(() => {
      this.isAuthenticatedSubject.next(false);
      this.currentUserSubject.next(null);
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  getCurrentUser(): Observable<UserModel | null> {
    return this.currentUser$;
  }
}
