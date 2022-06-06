import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';

declare var $: any;
//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    // icon: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/home',
        title: 'Inicio',
        type: 'link',
        icontype: 'pe-7s-home'
    }, {
        path: '/products',
        title: 'Mis productos',
        type: 'link',
        icontype: 'pe-7s-box2'
    }
];

export const ROUTESADMIN: RouteInfo[] = [
    {
        path: '/categorias',
        title: 'Menu 1',
        type: 'link',
        icontype: 'pe-7s-graph1'
    },
    {
        path: '/register',
        title: 'Menu 2',
        type: 'link',
        icontype: 'pe-7s-user'
    },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {
    public menuItems: any[];
    infoUser: any;
    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        var $sidebar = $('.sidebar-wrapper');
        var $bgLogo = $('.bgLogo');
        $sidebar.css('background-color','#000000');
        $bgLogo.css('background-color','#000000');


        // this.infoUser = JSON.parse(localStorage.getItem('infoUser'));

        // if (this.infoUser.login_type == 0) {
        //     this.menuItems = ROUTESADMIN.filter(menuItem => menuItem);
        // } else {
        //     this.menuItems = ROUTES.filter(menuItem => menuItem);
        // }

        var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        // this.menuItems = ROUTES.filter(menuItem => menuItem);

        isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        var $sidebar = $('.sidebar');
        $sidebar.css('background-color', 'green');

        if (isWindows) {
            // if we are on windows OS we activate the perfectScrollbar function
            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
            $('html').addClass('perfect-scrollbar-on');
        } else {
            $('html').addClass('perfect-scrollbar-off');
        }
    }
    ngAfterViewInit() {
        var $sidebarParent = $('.sidebar .nav > li.active .collapse li.active > a').parent().parent().parent();

        var collapseId = $sidebarParent.siblings('a').attr("href");

        $(collapseId).collapse("show");
    }
}
