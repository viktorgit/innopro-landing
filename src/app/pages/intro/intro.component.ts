import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent implements OnInit {

  ngOnInit(): void {
      this.initSlider();

      $("#arrow").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#about_us").offset()!.top
        }, 2000);
      });
  }

  initSlider() {
    const scrollStep = 52; // Шаг прокрутки
    const duration = 300; // Продолжительность прокрутки меню
    let currentMenu = 0; // Текущее выбранное меню
    let touchStartY = 0;

    //@ts-ignore
    let throttleTimeout: NodeJS.Timeout | null;
    //@ts-ignore
    document.querySelector(".slide").addEventListener("wheel", function (event) {
      event.preventDefault();
      if (!throttleTimeout) {
        highlightLabelOnScroll(event);
        throttleTimeout = setTimeout(function () {
          throttleTimeout = null;
        }, duration);
      } else {
        throttleTimeout = setTimeout(function () {
          throttleTimeout = null;
          highlightLabelOnScroll(event);
        }, duration);
      }
    });

    $(document).bind("touchstart", function (event: any) {
      touchStartY = event.originalEvent.touches[0].clientY;
    });

    $(".slide").bind("touchend", function (event: any) {
      highlightLabelOnScrollMobile(event);
    });

    // подсветка/сдвиг меню по скроллу
    function highlightLabelOnScroll(event: any) {
      const wrapper = document.querySelector(".slide");
      const elements = wrapper?.querySelectorAll("span");

      let scrollTop = wrapper?.scrollTop;
      let desiredScrollTop;

      if (event.deltaY > 0) {
        // Прокрутка вниз
        desiredScrollTop = (scrollTop || 0) + scrollStep;
      } else {
        // Прокрутка вверх
        desiredScrollTop = (scrollTop || 0) - scrollStep;
      }

      scrollTo(wrapper, desiredScrollTop, duration).then(() => {
        let activeIndex = Math.round(desiredScrollTop / scrollStep);
        activeIndex = activeIndex < 0 ? 0 : activeIndex;
        activeIndex =
          activeIndex > (elements || []).length - 1 ? (elements || []).length - 1 : activeIndex;

        (elements || []).forEach((span, index) => {
          if (index === activeIndex) {
            span.classList.add("active");
          } else {
            span.classList.remove("active");
          }
        });
      });
    }

    // подсветка/сдвиг меню по скроллу mobile
    function highlightLabelOnScrollMobile(event: any) {
      const wrapper = document.querySelector(".slide");
      const elements = wrapper?.querySelectorAll("span");

      var touchEndY = event.originalEvent.changedTouches[0].clientY;
      if (touchStartY > touchEndY + 1) {
        if (elements && currentMenu < elements.length - 1) {
          currentMenu++;
        }
      } else if (touchStartY < touchEndY - 1) {
        if (currentMenu >= 0) {
          currentMenu--;
        }
      }

      const desiredScrollTop = (currentMenu + 1) * scrollStep;

      scrollTo(wrapper, desiredScrollTop, duration).then(() => {
        let activeIndex = currentMenu + 1;

        (elements || []).forEach((span, index) => {
          if (index === activeIndex) {
            span.classList.add("active");
          } else {
            span.classList.remove("active");
          }
        });
      });
    }

    // Функция плавности прокрутки
    function easeInOutQuad(t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    function scrollTo(element: Element | null, to: number, duration: number) {
      const start = element?.scrollTop;
      const change = to - (start || 0);
      const increment = 20;
      let currentTime = 0;

      const animateScroll = function () {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start || 0, change, duration);
        if (element) {
          element.scrollTop = val;
        }
        if (currentTime < duration) {
          setTimeout(animateScroll, increment);
        }
      };

      return new Promise((resolve) => {
        animateScroll();
        setTimeout(resolve, duration);
      });
    }
  }

}
