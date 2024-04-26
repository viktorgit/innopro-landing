import { Component, OnInit } from '@angular/core';
import { Menu, Navigation } from '../../types/menu';
import { MobileMenuService } from '../../service/mobile-menu.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  menu = Menu;
  navigation = Navigation;

  constructor(private mobileMenu: MobileMenuService) {}

  ngOnInit(): void {
    this.mobileMenu.initMobileMenu();
  }
}
