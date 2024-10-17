import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HeaderComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    $('#slick-slider').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: true,
      dots: true,
    });
  }
}
