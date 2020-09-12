import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as parallax from 'simple-parallax-js';
import {LandmarksService} from '../../services/http/landmarks.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('bg', {static: true}) bgImage: ElementRef;

  public landmarks = [];
  public showIntro = false;

  constructor(private landmarksService: LandmarksService) {
  }

  ngOnInit(): void {
    new parallax.default(this.bgImage.nativeElement, {scale: 1.5, delay: 0.4});
    this.landmarksService.retrieve().subscribe((res: any) => {
      if (res.success) {
        this.landmarks = res.data;
      }
    });
    window.scrollTo({top: 0});
    setTimeout(() => this.showIntro = true, 1000);
  }

}
