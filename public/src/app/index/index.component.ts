import { Component, OnInit, Renderer2, ViewChild, ElementRef, Directive } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  test: Date = new Date();
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  public imgSrc1: string = '../../assets/img/salas.svg';
  public imgSrc2: string = '../../assets/img/comedores.svg';
  public imgSrc3: string = '../../assets/img/dormitorios.svg';
  public imgSrc4: string = '../../assets/img/decoracion.svg';
  public imgSrc5: string = '../../assets/img/escritorios.svg';
  public imgSrc6: string = '../../assets/img/exteriores.svg';
  public imgSrc7: string = '../../assets/img/alfombras.svg';
  public imgSrc8: string = '../../assets/img/iluminacion.svg';
  public imgSrc9: string = '../../assets/img/bar.svg';
  public imgSrc10: string = '../../assets/img/niños.svg';
  constructor(location: Location, private renderer: Renderer2, private element: ElementRef) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }


  ngOnInit(): void {
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
  }

  sidebarOpen() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    body.classList.add('nav-open');
    this.sidebarVisible = true;
  }
  
  sidebarClose() {
    var body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }
  sidebarToggle() {
    if (this.sidebarVisible == false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  tests(id) {
    console.log(id);
    // tslint:disable-next-line: triple-equals
    if (id == 'icoServ1') {
      return this.imgSrc1 = '../../assets/img/salas_blanco.svg';
      // tslint:disable-next-line: triple-equals
    } else if (id == 'icoServ2') {
      return this.imgSrc2 = '../../assets/img/comedores_blanco.svg';
    } else if (id == 'icoServ3') {
      return this.imgSrc3 = '../../assets/img/dormitorios_blanco.svg';
    } else if (id == 'icoServ4') {
      return this.imgSrc4 = '../../assets/img/decoracion_blanco.svg';
    } else if (id == 'icoServ5') {
      return this.imgSrc5 = '../../assets/img/escritorios_blanco.svg';
    } else if (id == 'icoServ6') {
      return this.imgSrc6 = '../../assets/img/exteriores_blanco.svg';
    } else if (id == 'icoServ7') {
      return this.imgSrc7 = '../../assets/img/alfombra_blanco.svg';
    } else if (id == 'icoServ8') {
      return this.imgSrc8 = '../../assets/img/iluminacion_blanco.svg';
    } else if (id == 'icoServ9') {
      return this.imgSrc9 = '../../assets/img/bar_blanco.svg';
    } else if (id == 'icoServ10') {
      return this.imgSrc10 = '../../assets/img/niños_blanco.svg';
    }
  }

  tests2(id) {
    console.log(id);
    if (id == 'icoServ1') {
      return this.imgSrc1 = '../../assets/img/salas.svg';
    } else if (id == 'icoServ2') {
      return this.imgSrc2 = '../../assets/img/comedores.svg'
    }
    else if (id == 'icoServ3') {
      return this.imgSrc3 = '../../assets/img/dormitorios.svg'
    }
    else if (id == 'icoServ4') {
      return this.imgSrc4 = '../../assets/img/decoracion.svg'
    }
    else if (id == 'icoServ5') {
      return this.imgSrc5 = '../../assets/img/escritorios.svg'
    }
    else if (id == 'icoServ6') {
      return this.imgSrc6 = '../../assets/img/exteriores.svg'
    }
    else if (id == 'icoServ7') {
      return this.imgSrc7 = '../../assets/img/alfombras.svg'
    }
    else if (id == 'icoServ8') {
      return this.imgSrc8 = '../../assets/img/iluminacion.svg'
    }
    else if (id == 'icoServ9') {
      return this.imgSrc9 = '../../assets/img/bar.svg'
    }
    else if (id == 'icoServ10') {
      return this.imgSrc10 = '../../assets/img/niños.svg'
    }
  }




  isLogin() {
    if (this.location.prepareExternalUrl(this.location.path()) === '#/pages/login') {
      return true;
    }
    return false;
  }

  isRegister() {
    if (this.location.prepareExternalUrl(this.location.path()) === '#/pages/register') {
      return true;
    }
    return false;
  }

  getPath() {
    // console.log(this.location);
    return this.location.prepareExternalUrl(this.location.path());
  }

}
