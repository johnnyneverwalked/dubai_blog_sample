import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {ILandmark} from '../../../interfaces/ILandmark';
import {Subject} from 'rxjs';
import {LandmarksService} from '../../../services/http/landmarks.service';
import * as parallax from "simple-parallax-js";
import * as leaf from "leaflet";
// @ts-ignore
import icon from "leaflet/dist/images/marker-icon.png/";
import swal from "sweetalert2";

@Component({
  selector: 'app-landmark-index',
  templateUrl: './landmark-index.component.html',
  styleUrls: ['./landmark-index.component.scss']
})
export class LandmarkIndexComponent implements OnInit, OnDestroy{

  public landmark: ILandmark;

  private map: any;

  private _unsub$: Subject<void> = new Subject<void>();

  @ViewChild("photo", {static: true}) photo: ElementRef;
  @ViewChild("mapContainer", {static: true}) mapContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private landmarkService: LandmarksService
  ) {
  }

  ngOnInit(): void {
    window.scrollTo({top: 0});
    new parallax.default(this.photo.nativeElement, {scale: 1.5, delay: 0.5});
    leaf.Marker.prototype.options.icon = leaf.icon({
      iconUrl: icon
    });

    this.route.params.pipe(takeUntil(this._unsub$)).subscribe((params: any) => {
      this.landmarkService.findById(params._id).subscribe((res: any) => {
        if (res.success) {
          this.landmark = res.data;
          this.map = leaf.map(this.mapContainer.nativeElement, {
            center: leaf.latLng(res.data.location?.longitude, res.data.location?.latitude),
            zoom: 13
          });

          leaf.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(this.map);

          leaf.marker(leaf.latLng(res.data.location?.longitude, res.data.location?.latitude))
            .addTo(this.map)
            .bindPopup(res.data.title)
            .openPopup();
        } else {
          swal.fire({
            title: "Oops!",
            icon: "error",
            text: "Something went wrong...",
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
    });
  }

  ngOnDestroy() {
    this._unsub$.next();
  }

}
