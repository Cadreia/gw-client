import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-add-official-agency',
  templateUrl: './add-official-agency.component.html',
  styleUrls: ['./add-official-agency.component.scss']
})
export class AddOfficialAgencyComponent implements OnInit {
  addAgencyForm: FormGroup;
  loader: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private adminService: AdminService,
    private toaster: MessageService
    ) { }

  ngOnInit() {
    this.addAgencyForm = this.formBuilder.group({
      agency_name: ['', Validators.required],
      admin_email: ['', [Validators.required, Validators.email]],
      agency_reg_number: ['', Validators.required]
    });

    if (!this.sharedService.IsAdmin()) {
      this.router.navigate(['public/users/account/overview']);
      }
  }

  onSubmit() {
    this.loader = true;
    console.log(this.addAgencyForm.value);
    this.adminService.addOfficialAgency(this.addAgencyForm.value).subscribe(
      (response: any) => {
        this.loader = false;
        console.log('success', response);
        this.router.navigate(['public/users/account/officialAgency']);
        this.toaster.successAddAgency();
      }, (error: any) => {
        this.loader = false;
        console.log(error);
        if (!(error && Object.keys(error).length === 0)) {
          if (error.errorCode === 0) {
            this.toaster.offlineMessage();
          }
          if (error.errorCode === 500) {
            this.toaster.internalError();
          }
          if (error.errorCode === 401) {
            if (error.code === 'ACCESS_DENIED') {
              this.toaster.accessDenied();
            }
          } else if (error.errorCode === 404) {
            if (error.code === 'RESOURCE_NOT_FOUND') {
              this.toaster.adminEmailNotExist();
            } else if (error.code === 'USER_ALREADY_IN_AN_AGENCY') {
              this.toaster.adminEmailInUse();
            }
          }
        }
      }
    );
  }
}
