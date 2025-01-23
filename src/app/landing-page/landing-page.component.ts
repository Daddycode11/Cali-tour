import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../auth/register/register.component';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Users, UserType } from '../../models/users';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../auth/login/login.component';
import { TouristHeaderComponent } from '../tourist/tourist-header/tourist-header.component';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../services/cart.service';
import { CartWithProduct } from '../../models/cart';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    TouristHeaderComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  modalService = inject(NgbModal);
  users$: Users | null = null;
  cart$: CartWithProduct[] = [];
  toastr = inject(ToastrService);

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    // Listen to user state changes
    this.authService.listenToUsers().subscribe((user: Users | null) => {
      if (user) {
        // Check if the user object is not null
        this.users$ = user;

        // Check if the user is an Admin
        if (this.users$.type === UserType.ADMIN) {
          console.log('User is an Admin');
          this.router.navigate(['/administrator']); // Navigate to the admin page
        } else {
          // If the user is not an admin, fetch their cart data
          this.cartService
            .getAllMyCart(this.users$.id)
            .subscribe((cartData) => {
              this.cart$ = cartData; // Store the cart data
              console.log(cartData); // Log the cart data
            });
        }
      }
    });
  }

  openRegister(): void {
    this.modalService.open(RegisterComponent);
  }

  openLogin(): void {
    this.modalService.open(LoginComponent);
  }

  logout(): void {
    console.log('Logged out');
    this.authService
      .logout()
      .then(() => this.toastr.success('Successfully Logged out'))
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnDestroy(): void {
    // Add cleanup logic if needed, such as unsubscribing from any observables
  }
}
