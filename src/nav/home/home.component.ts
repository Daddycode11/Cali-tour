import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HeaderComponent implements AfterViewInit {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

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
export class CardComponent {
  cardItems = [
    {
      image:
        'https://i.pinimg.com/originals/c1/c0/44/c1c044665aff95010b0c2c51be038321.png',
      title: 'Destination 1',
      description: 'Discover the beauty of this amazing place.',
    },
    {
      image:
        'https://i.pinimg.com/originals/c1/c0/44/c1c044665aff95010b0c2c51be038321.png',
      title: 'Destination 2',
      description: 'Enjoy a unique and unforgettable experience.',
    },
    {
      image:
        'https://i.pinimg.com/originals/c1/c0/44/c1c044665aff95010b0c2c51be038321.png',
      title: 'Destination 3',
      description: 'Explore the vibrant culture and scenic views.',
    },
  ];
}
