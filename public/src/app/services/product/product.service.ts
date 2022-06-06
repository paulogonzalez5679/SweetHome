import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private fb: AngularFirestore

  ) { }


  //Crea una nueva categoria
  public createProduct(product: Product, infoUser) {
    return this.fb.collection('categorias').doc(infoUser.category).collection('lugares').doc(infoUser.company_id).collection('productos').doc(product.id).set(product);
  }
  //Obtiene una nueva categoria
  public getProduct(documentId: string) {
    return this.fb.collection('categorias').doc(documentId).snapshotChanges();
  }
  //Obtiene todos las categorias
  public getProducts(infoUser) {
    return this.fb.collection('categorias').doc(infoUser.category).collection('lugares').doc(infoUser.company_id).collection('productos').snapshotChanges();
  }
  //Actualiza una nueva categoria
  public updateProduct(documentId: string, data: any) {
    return this.fb.collection('categorias').doc(documentId).set(data);
  }
  //Elimina una nueva categoria
  public deleteProduct(documentId: string, infoUser) {
    return this.fb.collection('categorias').doc(infoUser.category).collection('lugares').doc(infoUser.company_id).collection('productos').doc(documentId).delete();
  }



}
