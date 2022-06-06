import { Component, OnInit } from '@angular/core';
import { TortasService } from 'app/services/tortas/tortas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';



declare interface Tortas {
  nombre?: string;
  url?: string;
  id?: string;
}
@Component({
  selector: 'app-tortas',
  templateUrl: './tortas.component.html',
  styleUrls: ['./tortas.component.css']
})


export class TortasComponent implements OnInit {
  public tortas: any;

  public documentId = null;
  public currentStatus = 1;
  public newTortaForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  constructor(
    private tortasService: TortasService,


  ) {
    this.newTortaForm.setValue({
      id: '',
      nombre: '',
      url: ''
    });
  }

  ngOnInit(): void {

    this.tortasService.getTortas().subscribe((tortasSnapshot) => {
      this.tortas = [];
      tortasSnapshot.forEach((tortasData: any) => {
        this.tortas.push({
          id: tortasData.payload.doc.id,
          data: tortasData.payload.doc.data()
        });
      })
    });
  }

  //async newTorta (tortas: '' , valid: boolean) {};

  public newTorta(form, documentId = this.documentId) {
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        url: form.url
      }
      this.tortasService.createTortas(data).then(() => {
        this.newTortaForm.setValue({
          nombre: '',
          url: '',
          id: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        nombre: form.nombre,
        url: form.url
      }
      this.tortasService.updateTortas(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newTortaForm.setValue({
          nombre: '',
          url: '',
          id: ''
        });
      }, (error) => {
      });
    }
  }

  public editTorta(documentId) {
    let editSubscribe = this.tortasService.getTorta(documentId).subscribe((torta) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newTortaForm.setValue({
        id: documentId,
        nombre: torta.payload.data()['nombre'],
        url: torta.payload.data()['url']
      });
      editSubscribe.unsubscribe();
    });
  }

  public deleteTorta(documentId) {
    this.tortasService.deleteTorta(documentId).then(() => {
    }, (error) => {
      console.error(error);
    });
  }
}
