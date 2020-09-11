import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-divider-skew',
  templateUrl: './divider-skew.component.html',
  styleUrls: ['./divider-skew.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DividerSkewComponent implements OnInit {

  @Input() mirrored: boolean;
  @Input() inversed: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
