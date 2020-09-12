import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ILandmark} from '../../../interfaces/ILandmark';
import {LandmarksService} from '../../../services/http/landmarks.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {cloneDeep} from "lodash";
import * as parallax from "simple-parallax-js";
import swal from 'sweetalert2';

@Component({
  selector: 'app-landmark-edit',
  templateUrl: './landmark-edit.component.html',
  styleUrls: ['./landmark-edit.component.scss']
})
export class LandmarkEditComponent implements OnInit, OnDestroy {

  public landmark: ILandmark;
  public form: FormGroup;
  public loading: boolean;

  private _unsub$: Subject<void> = new Subject<void>();

  @ViewChild("photo", {static: true}) photo: ElementRef;

  constructor(
    private landmarkService: LandmarksService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    window.scrollTo({top: 0});
    new parallax.default(this.photo.nativeElement, {scale: 1.5, delay: 0.5});

    this.form = this.fb.group({
      short_info: null,
      description: null,
      url: null,
      photo: null,
      title: [null, Validators.required]
    });

    this.route.params.pipe(takeUntil(this._unsub$)).subscribe(val => {
      this.landmarkService.findById(val._id).subscribe((res: any) => {
        if (res.success) {
          this.landmark = res.data;
          this.form.patchValue(res.data || {});
          this.form.get("photo").reset();
        }
      });
    });
  }

  ngOnDestroy() {
    this._unsub$.next();
  }

  save() {
    const data = cloneDeep(this.form.value);
    const formData = new FormData();
    for (let key in data) {
      formData.set(key, data[key]);
    }
    this.loading = true;
    this.landmarkService.update(this.landmark.objectId, formData).subscribe((res: any) => {
      if (res.success) {
        this.landmark = res.data;
        this.form.patchValue(res.data || {});
        this.loading = false;

        swal.fire({
          title: "Success",
          icon: "success",
          text: "The update was successful!",
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        swal.fire({
          title: "Oops!",
          icon: "error",
          text: res.error?.message || "Something went wrong...",
          timer: 3000,
          showConfirmButton: false
        });
      }
    }, error => {
      this.loading = false;
      swal.fire({
        title: "Oops!",
        icon: "error",
        text: "Something went wrong...",
        timer: 2000,
        showConfirmButton: false
      });
    });
  }

  dzChange(evt) {
    if (evt.addedFiles.length) {
      this.form.get("photo").reset();
      setTimeout(() => {
        this.form.patchValue({photo: evt.addedFiles[0]});
      }, 100);
    } else if (evt.rejectedFiles.length) {
      swal.fire({
        title: "Oops!",
        icon: "error",
        text: evt.rejectedFiles[0].reason === "size"
          ? "The photo is too large..."
          : evt.rejectedFiles[0].reason === "type"
            ? "This file type is not supported..."
            : "Something went wrong...",
        timer: 3000,
        showConfirmButton: false
      });
    }

    console.log(evt);
  }

}
