import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TortasService {

  constructor(

    private tortas: AngularFirestore
  ) { }

  //Crea un nuevo torta
  public createTortas(data: {nombre: string, url: string}) {
    return this.tortas.collection('tortas').add(data);
  }
  //Obtiene un torta
  public getTorta(documentId: string) {
    return this.tortas.collection('tortas').doc(documentId).snapshotChanges();
  }
  //Obtiene todos las tortas
  public getTortas() {
    return this.tortas.collection('tortas').snapshotChanges();
  }
  //Actualiza una torta
  public updateTortas(documentId: string, data: any) {
    return this.tortas.collection('tortas').doc(documentId).set(data);
  }

  public deleteTorta(documentId: string) {
    return this.tortas.collection('tortas').doc(documentId).delete();
  }
}

