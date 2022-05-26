import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin/admin.service';
import { DialogData } from 'src/app/models/dialog-data';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private adminService: AdminService, private dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  metaData = {
    name: '',
    action: ''
  };
  resultData!: User;

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    this.metaData = this.data.metaData;
    this.resultData = this.data.data;
  }

}
