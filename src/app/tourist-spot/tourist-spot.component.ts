import { Component, inject } from '@angular/core';
import { TouristSpot } from '../../models/tourist.spot';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateBookingComponent } from '../tourist/create-booking/create-booking.component';
import { CommonModule } from '@angular/common';
import { Users } from '../../models/users';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tourist-spot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tourist-spot.component.html',
  styleUrls: ['./tourist-spot.component.css'],
})
export class TouristSpotComponent {
  modalService = inject(NgbModal);
  touristSpots: TouristSpot[] = [
    {
      name: 'Mts. Iglit-Baco Natural Park',
      imageUrl: '../../assets/mts_iglit_baco.jpg',
      description:
        'A protected area known for its biodiversity and scenic landscapes.',
      location: 'Mindoro',
      price: 100,
    },
    {
      name: 'Bato Tabao Fish Sanctuary',
      imageUrl: '../../assets/bato_tabao.jpg',
      description: 'A marine sanctuary teeming with aquatic life.',
      location: 'Coastal Area',
      price: 100,
    },
    {
      name: 'Luli Island',
      imageUrl: '../../assets/luli_island.jpg',
      description:
        'A beautiful island that appears and disappears with the tide.',
      location: 'Offshore',
      price: 100,
    },
    {
      name: 'Marsumbol Reservoir',
      imageUrl: '../../assets/marsumbol_reservoir.jpg',
      description:
        'A freshwater reservoir perfect for sightseeing and relaxation.',
      location: 'Mindoro',
      price: 100,
    },
    {
      name: 'Wawa Mangrove',
      imageUrl: '../../assets/wawa_mangrove.jpg',
      description:
        'A vital mangrove ecosystem home to various wildlife species.',
      location: 'Coastal Area',
      price: 100,
    },
    {
      name: 'Makatiklas Falls',
      imageUrl: '../../assets/makatiklas_falls.jpg',
      description: 'A majestic waterfall surrounded by lush forest.',
      location: 'Mindoro',
      price: 100,
    },
    {
      name: 'Salugsog Falls',
      imageUrl: '../../assets/salugsog_falls.jpg',
      description: 'A picturesque waterfall with crystal-clear waters.',
      location: 'Mindoro',
      price: 100,
    },
    {
      name: 'Green Hills',
      imageUrl: '../../assets/green_hills.jpg',
      description: 'Rolling green hills offering breathtaking views.',
      location: 'Mindoro',
      price: 100,
    },
    {
      name: 'Anahawin River',
      imageUrl: '../../assets/anahawin_river.jpg',
      description: 'A serene river ideal for kayaking and nature trips.',
      location: 'Mindoro',
      price: 100,
    },
    {
      name: 'Medalla Park',
      imageUrl: '../../assets/medalla_park.jpg',
      description: 'A relaxing park with historical significance.',
      location: 'Mindoro',
      price: 100,
    },
    {
      name: 'Saint Michael Parish Church',
      imageUrl: '../../assets/saint_michael_church.jpg',
      description: 'A historic church with stunning architecture.',
      location: 'Mindoro',
      price: 100,
    },
    {
      name: 'Old Bell Tower',
      imageUrl: '../../assets/old_bell_tower.jpg',
      description: 'A heritage site showcasing colonial-era architecture.',
      location: 'Mindoro',
      price: 100,
    },
    {
      name: 'Queen’s Ranch Grotto',
      imageUrl: '../../assets/queens_ranch_grotto.jpg',
      description: 'A serene grotto known for its religious significance.',
      location: 'Mindoro',
      price: 100,
    },
  ];
  user$: Users | null = null;

  constructor(private authService: AuthService, private toastr: ToastrService) {
    authService.listenToUsers().subscribe((data: Users | null) => {
      this.user$ = data;
    });
  }

  navigateToViewTouristSpot(spot: TouristSpot) {}

  createBooking(spot: TouristSpot) {
    if (this.user$ == null) {
      this.toastr.error('No user found');
      return;
    }
    const modal = this.modalService.open(CreateBookingComponent);
    modal.componentInstance.spot = spot;
  }
}
