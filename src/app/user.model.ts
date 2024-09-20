export interface UserModel {
  uid: string;
    email: string;
    displayName?: string;
    phoneNumber?: string;
    role?: string; // Ajoute le champ role ici
    photoURL?: string; // Assure-toi d'inclure cette propriété si tu l'utilises
  }
  