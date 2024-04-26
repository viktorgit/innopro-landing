import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileMenuService {

  constructor() {}

  initMobileMenu() {
    //@ts-ignore
    document.getElementById('burger_menu').addEventListener('click', () => {
      //@ts-ignore
      document.getElementById('modile_menu').classList.toggle('none');
      //@ts-ignore
      document.getElementById('burger_menu').classList.toggle('pos_fix');
    });
    
    //@ts-ignore
    const closeButtons = [...document.getElementsByClassName('win_close')];
    closeButtons.forEach((elem) => {
      elem.addEventListener('click', () => {
        //@ts-ignore
        document.getElementById('modile_menu').classList.add('none');
        //@ts-ignore
        document.getElementById('burger_menu').classList.remove('pos_fix');
      });
    });
  }
}
