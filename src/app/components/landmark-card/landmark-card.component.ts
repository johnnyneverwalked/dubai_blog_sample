import {Component, Input, OnInit} from '@angular/core';
import {ILandmark} from "../../interfaces/ILandmark";

@Component({
  selector: 'app-landmark-card',
  templateUrl: './landmark-card.component.html',
  styleUrls: ['./landmark-card.component.scss']
})
export class LandmarkCardComponent implements OnInit {

  @Input() landmark: ILandmark;
  @Input() class: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
