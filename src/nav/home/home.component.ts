import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  displayText = '';
  text =
    'EXPLORE THE WONDERS OF THE CULTURE\nAND TOURIST DESTINATION CALINTAAN';
  i = 0;
  isDeleting = false;
  speed = 100; // Adjust typing speed

  constructor(private router: Router) {}

  ngOnInit() {
    this.typeWriter();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  typeWriter() {
    if (!this.isDeleting) {
      this.displayText = this.text.substring(0, this.i).replace('\n', '<br>');
      this.i++;
      if (this.i > this.text.length) {
        this.isDeleting = true;
        setTimeout(() => this.typeWriter(), 1500); // Pause before deleting
        return;
      }
    } else {
      this.displayText = this.text.substring(0, this.i).replace('\n', '<br>');
      this.i--;
      if (this.i === 0) {
        this.isDeleting = false;
        setTimeout(() => this.typeWriter(), 500); // Pause before retyping
        return;
      }
    }
    setTimeout(() => this.typeWriter(), this.isDeleting ? 50 : 100); // Speed control
  }
}

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

@Component({
  selector: 'app-card',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
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
