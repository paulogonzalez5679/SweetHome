import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { CategoryService } from '../../../services/categorias/categorias.service';
import { CompanyService } from '../../../services/company/company.service';
import * as  firebase from 'firebase/app'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public infoUser: any;
  public company: Company;
  public category: Category;
  public arrayCategory: any[];
  public imageFile: any;
  public disabled: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.infoUser = JSON.parse(localStorage.getItem('infoUser'));
    this.getCategories();
    this.company = {};
    if (this.infoUser.category == undefined) {
      var id = new Date().getTime();
      this.company = {
        id: id.toString(),
        calificacion_promedio: 5.0,
        url: '',
        email: this.infoUser.email,
        category: '',
      };
    } else {
      this.disabled =  true;
      this.companyService.getCompany(this.infoUser).subscribe((company) => {
        this.company = company;
        this.company = company;
        this.category = this.arrayCategory[this.company.category];
      });
    }
  }

  async getCategories() {
    await this.categoryService.getCategories().subscribe((categorySnapshot) => {
      this.arrayCategory = [];
      categorySnapshot.forEach((categoryData) => {
        this.arrayCategory.push(categoryData.payload.doc.data());
      });
    });
  }

  saveUser(company: Company, valid) {
    this.companyService.saveCompany(this.category, company, this.infoUser);
    this.disabled =  true;

  }

  selectCategory(e) {
    this.category = this.arrayCategory[e.target.value];
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
        // this.imageSrc = e.target.result;
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

  uploadDocumentToStorage() {
    // let serviceGlobal = this.registerService;
    let infoUserLocal = this.infoUser;
    let categoryLocal = this.category;
    let companyLocal = this.company;
    let savecompanyLocal = this.companyService;
    var storageService = firebase.storage();
    var refStorage = storageService.ref("/company").child(this.company.id);
    var uploadTask = refStorage.put(this.imageFile);
    uploadTask.on('state_changed', null,
      function (error) {
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          companyLocal.url = downloadURL;
          // savecompanyLocal(companyLocal, true);
          savecompanyLocal.saveCompany(categoryLocal, companyLocal, infoUserLocal)
          swal({
            title: "Muy bien",
            text: "Información logo guardado correctamente",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-fill btn-success",
            type: "success"
          }).catch(swal.noop)
        });
      });
  };
}
