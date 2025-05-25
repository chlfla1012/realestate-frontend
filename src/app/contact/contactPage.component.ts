import { OnInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'contact-page',
  templateUrl: './contactPage.component.html',
  styleUrls: ['./contactPage.component.css']
})
export class ContactPageComponent implements OnInit {

  constructor(private el: ElementRef) {}
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
  ngOnInit(): void {
    setTimeout(() => {
        const elements = this.el.nativeElement.querySelectorAll('.fade-in-on-load, .slide-up-on-load');
        elements.forEach((el: Element) => el.classList.add('visible'));
      }, 0);
  }
}
