import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NavigationService} from '../../services/navigation/navigation.service';
import {AuthService} from '../../services/http/auth.service';
import {pulsate} from '../../animations/enter-leave.animation';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [pulsate]
})

export class NavBarComponent implements OnInit {

  @Output() login = new EventEmitter<void>();
  @Output() signup = new EventEmitter<void>();

  @ViewChild("container") container: ElementRef;

  constructor(
    public navService: NavigationService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout().subscribe(res => {
      window.localStorage.removeItem("token");
      this.auth.user = null;
    });
  }

}
