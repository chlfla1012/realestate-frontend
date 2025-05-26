import { AfterViewInit, Component, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
@Component({
  selector: 'landing-page',
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.css'],
  animations: [
      trigger('toggleAnswer', [
        state('open', style({
          height: '*',
          opacity: 1,
          padding: '1rem 0'
        })),
        state('closed', style({
          height: '0px',
          opacity: 0,
          padding: '0 0'
        })),
        transition('open <=> closed', [
          animate('300ms ease-in-out')
        ])
      ])
    ]
})
export class LandingPageComponent implements AfterViewInit {

  constructor(private el: ElementRef) {}

  faqList = [
    {
      question: '導入費用は？',
      answer: '導入費用につきましては、お気軽にお問い合わせください。',
      open: false,
    },
    {
      question: 'セキュリティ対策は？',
      answer: '通信はSSL対応、データは暗号化してクラウド上で安全に管理されます。',
      open: false,
    },
    {
      question: 'モバイル対応していますか？',
      answer: 'はい、スマートフォンやタブレットでも快適にご利用いただけます。',
      open: false,
    }
  ];
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  toggleFAQ(index: number): void {
    this.faqList[index].open = !this.faqList[index].open;
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // 한 번만 실행
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = this.el.nativeElement.querySelectorAll('.fade-in-on-scroll, .slide-up-on-scroll');
    elements.forEach((el: Element) => observer.observe(el));
  }

}
