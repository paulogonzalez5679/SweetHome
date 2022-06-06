import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CategoryService } from "app/services/categorias/categorias.service";
import swal from "sweetalert2";
import * as firebase from "firebase/app";
declare var $: any;
export interface DataTable {
  headerRow: string[];
  footerRow?: string[];
  dataRows: string[][];
}

@Component({
  selector: "app-categorias",
  templateUrl: "./categorias.component.html",
  styleUrls: ["./categorias.component.css"],
})
export class CategoryComponent implements OnInit {
  public dataTable: DataTable;
  public category: Category;
  public arrayCategory: Category[];
  public documentId = null;
  public isEdit = false;
  public tablaDatos;
  public imageFile: any;
  public imageSrc: any;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.category = {};
    this.dataTable = {
      headerRow: [
        "#",
        "ID",
        "Categoria",
        "Descripción",
        "Imagen",
        "Editar",
        "Eliminar",
      ],
      dataRows: [],
    };
    this.tablaDatos = $("#datatablesCategory").DataTable({});
    this.getCategories();
  }

  /**
   * *** Envio para cargar imagen ***.
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
    this.upload(event);
  }

  /**
   * *** Recibimos el archivo y lo enviamos a subir al storage ***
   * @param event
   */
  public upload(event): void {
    const file = event.target.files[0];
    this.imageFile = file;
    this.uploadDocumentToStorage();
  }

  /**
   * *** Optenemos el id de la nueva categoria ***
   * llenamos el objeto
   */
  newCategory() {
    this.isEdit = false;
    var id = new Date().getTime();
    this.category = {
      id: id.toString(),
      url: "",
      description: "",
      nombre: "",
    };
  }

  /**
   * metodo para agregar categorias
   * @param category
   * @param valid
   */
  addCategory(category: Category, valid: boolean) {
    if (valid) {
      this.categoryService.createCategory(category).then(() => {
        swal("OK", "Registro Exitoso", "success");
        this.category = {};
        $("#modalCategory").modal("hide");
      });
    }
  }

  /**
   * *** Optenemos todas las categorias de la DB ***
   */
  async getCategories() {
    await this.categoryService.getCategories().subscribe((categorySnapshot) => {
      this.arrayCategory = [];
      categorySnapshot.forEach((categoryData) => {
        this.arrayCategory.push(categoryData.payload.doc.data());
        if (categorySnapshot.length == this.arrayCategory.length) {
          this.initDataTable();
        }
      });
    });
  }

  /**
   * *** Seleccionamos una categoria para la edicion ***
   * @param category 
   */
  selectCategory(category: Category) {
    this.isEdit = true;
    this.category = category;
  }

  /**
   * 
   * @param id 
   */
  public editCategory(id) {
    let editSubscribe = this.categoryService
      .getCategory(id)
      .subscribe((categoria) => {
        editSubscribe.unsubscribe();
      });
  }

  public deleteCategory(id) {
    this.categoryService.deleteCategory(id).then(
      () => {},
      (error) => {
        console.error(error);
      }
    );
  }

  initDataTable() {
    let aaa = this.tablaDatos;
    $("#datatablesCategory").DataTable().destroy();
    setTimeout(function () {
      /*
       * Opciones del datatable
       */
      aaa = $("#datatablesCategory").DataTable({
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
    let categoryLocal = this.category;
    var storageService = firebase.storage();
    var refStorage = storageService.ref("/category").child(this.category.id);
    var uploadTask = refStorage.put(this.imageFile);
    uploadTask.on(
      "state_changed",
      null,
      function (error) {},
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          categoryLocal.url = downloadURL;
          swal({
            title: "Muy bien",
            text: "Información adicional guardada correctamente",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-fill btn-success",
            type: "success",
          }).catch(swal.noop);
        });
      }
    );
  }
}
