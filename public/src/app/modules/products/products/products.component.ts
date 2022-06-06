import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import * as  firebase from 'firebase/app'
import { ProductService } from '../../../services/product/product.service';
declare var $: any;
export interface DataTable {
  headerRow: string[];
  footerRow?: string[];
  dataRows: string[][];
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public dataTable: DataTable;
  public tablaDatos;
  public product: Product;
  public isEdit = false;
  public imageFile: any;
  public imageSrc: any;
  arrayProduct: any[];
  public infoUser: any;

  constructor(
    public productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.product = {};
    this.infoUser = JSON.parse(localStorage.getItem('infoUser'));

    this.dataTable = {
      headerRow: [
        "#",
        "ID",
        "Nombre",
        "Descripción",
        "Precio",
        "Imagen",
        "Editar",
        "Eliminar",
      ],
      dataRows: [],
    };
    this.tablaDatos = $('#datatablesProduct').DataTable({});
    this.getProducts();

  }

  /**
     * EVENTO CARGA DE IMAGEN.
     * @param event.
     */
  public onChangeImage(event) {
    const files = event.srcElement.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    }
    this.upload(event)
  }

  public upload(event): void {
    const file = event.target.files[0];
    this.imageFile = file;
    this.uploadDocumentToStorage();
  }


  /**
   * Optenemos el id de la nueva categoria
   */
  newProduct() {
    this.isEdit = false;
    // optenemos una marca de tiempo timeStamp
    var id = new Date().getTime();
    this.product = {
      id: id.toString(),
      url: "",
      description: "",
      nombre: "",
    };
  }

  /**
   * para agregar categorias
   * @param product
   * @param valid
   */
  addProduct(product: Product, valid: boolean) {
    if (valid) {
      this.productService.createProduct(product, this.infoUser).then(() => {
        swal("OK", "Registro Exitoso", "success");
        this.product = {};
        $("#modalProduct").modal("hide");
      });
    }
  }

  async getProducts() {
    await this.productService.getProducts(this.infoUser).subscribe((productSnapshot) => {
      this.arrayProduct = [];
      productSnapshot.forEach((productData) => {
        this.arrayProduct.push(productData.payload.doc.data());
        if (productSnapshot.length == this.arrayProduct.length) {
          this.initDataTable();
        }
      });
    });
  }

  selectProduct(product: Product) {
    this.isEdit = true;
    this.product = product;
  }

  // public editProduct(id) {
  //   let editSubscribe = this.productService
  //     .getProduct(id)
  //     .subscribe((categoria) => {
  //       editSubscribe.unsubscribe();
  //     });
  // }

  public deleteProduct(id) {
    swal({
      title: 'Alerta',
      text: '¿Esta seguro que desea eliminar el producto?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-fill btn-success btn-mr-5',
      cancelButtonClass: 'btn btn-fill btn-danger',
      confirmButtonText: 'Sí, eliminar!',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct(id, this.infoUser).then(() => { },
          (error) => {
            console.error(error);
          }
        );
      }
    })



  }

  initDataTable() {
    let aaa = this.tablaDatos;
    $("#datatablesProduct").DataTable().destroy();
    setTimeout(function () {
      /*
       * Opciones del datatable
       */
      aaa = $("#datatablesProduct").DataTable({
        paging: true,
        ordering: true,
        info: true,
        pagingType: "full_numbers",
        lengthMenu: [
          [10, 25, 50, -1],
          [10, 25, 50, "All"],
        ],
        responsive: true,
        language: {
          search: "INPUT",
          searchPlaceholder: "Buscar",
        },
      });
    }, 10);
  }


  uploadDocumentToStorage() {
    // let serviceGlobal = this.registerService;
    let productLocal = this.product;
    var storageService = firebase.storage();
    var refStorage = storageService.ref("/product").child(this.product.id);
    var uploadTask = refStorage.put(this.imageFile);
    uploadTask.on('state_changed', null,
      function (error) {
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          productLocal.url = downloadURL;
          swal({
            title: "Muy bien",
            text: "Información adicional guardada correctamente",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-fill btn-success",
            type: "success"
          }).catch(swal.noop)
        });
      });
  };



}
