import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private category: AngularFirestore
  ) { }

  //Crea una nueva categoria
  public createCategory(category: Category) {
    return this.category.collection('categorias').doc(category.id).set(category);
  }
  //Obtiene una nueva categoria
  public getCategory(documentId: string) {
    return this.category.collection('categorias').doc(documentId).snapshotChanges();
  }
  //Obtiene todos las categorias
  public getCategories() {
    return this.category.collection('categorias').snapshotChanges();
  }
  //Actualiza una nueva categoria
  public updateCategory(documentId: string, data: any) {
    return this.category.collection('categorias').doc(documentId).set(data);
  }
  //Elimina una nueva categoria
  public deleteCategory(documentId: string) {
    return this.category.collection('categorias').doc(documentId).delete();
  }
}
