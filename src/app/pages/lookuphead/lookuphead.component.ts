import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { LookupsService } from "src/app/services/lookups.service";
// import { Config } from 'protractor';
import { Config } from "src/app/utility/config";
import Swal from "sweetalert2";
import { Lookuphead1Service } from "./lookuphead1.service";
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";


@Component({
  selector: "app-lookuphead",
  templateUrl: "./lookuphead.component.html",
  styleUrls: ["./lookuphead.component.scss"],
})
export class LookupheadComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [
    "lookup_Type",
    "lookup_SubType",
    "lookup_Value",
    "lookup_Name",
    "action",
  ];
  // displayedColumns: string[] = ['lookup_Type', 'action'];
  EditForm: FormGroup;
  submitted: boolean;
  ModalOpen: boolean;
  digital_Signature_Id: number;
  clients: any;
  dataSource: MatTableDataSource<unknown>;
  lookup_Id: any;
  LookUpStatus: any;

  constructor(
    private LookupApi: Lookuphead1Service,
    private config: Config,
    private LookupFormBuilder: FormBuilder,
    private router: Router,
    private CommonApi: LookupsService,
    private toaster: Toaster

  ) {
    this.EditForm = this.LookupFormBuilder.group({
      lookup_Id: 0,
      lookup_Type: "",
      lookup_Value: "",
      lookup_Name: "",
      is_Deleted: false,
      short_Order: "",
      lookup_Icon: "",
      lookup_Color: "",
      discription: "",
      lookup_SubType: "",
    });
  }

  ngOnInit() {
    this.Getall();
    this.GetleaveList();
  }
  Getall() {
    this.config.startLoader();
    this.LookupApi.getList().subscribe((res) => {
      if (res.status == "1") {
        this.config.stopLoader();
        this.dataSource = new MatTableDataSource(res.lookupList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.config.stopLoader();
      }
    });
  }

  cancel() {
    this.submitted = false;
    this.EditForm.reset();
    this.ModalOpen = false;
  }

  addLookup() {
    this.lookup_Id = 0;
    this.ModalOpen = true;
    this.EditForm.reset();
  }

  saveLookup() {
    this.submitted = true;
    if (this.EditForm.value.lookup_Id == null) {
      this.EditForm.value.lookup_Id = 0;
    }
    this.EditForm.value.is_Deleted = false;
    this.EditForm.value.lookup_Color = "";
    this.EditForm.value.discription = "";
    this.EditForm.value.short_Order = "";
    this.EditForm.value.lookup_Type = this.EditForm.value.lookup_Type;
    this.EditForm.value.lookup_SubType = this.EditForm.value.lookup_Type;
    this.EditForm.value.lookup_Name = this.EditForm.value.lookup_Name;
    this.EditForm.value.lookup_Value = this.EditForm.value.lookup_Name;
    this.EditForm.value.lookup_Id = parseInt(this.EditForm.value.lookup_Id);
    this.LookupApi.AddUpdate(this.EditForm.value).subscribe((res) => {
      // console.log("lookUp", res);
      if (res.status == "1") {
        this.ModalOpen = false;
        this.toaster.open({
          text: res.message,
          position: 'top-right',
          type: "success",
        });
        this.Getall();
        this.EditForm.reset();
      } else {
        this.toaster.open({
          text: res.message,
          position: 'top-right',
          type: "danger",
        });
      }
    });
  }

  async loadLookup(lookup_Id) {
    this.ModalOpen = true;
    this.lookup_Id = lookup_Id;
    this.LookupApi.GetById(this.lookup_Id).subscribe(
      (res) => {
        //console.log("respond", res);
        this.EditForm.patchValue({
          lookup_Id: res.lookup.lookup_Id,
          lookup_Type: res.lookup.lookup_Type,
          lookup_Value: res.lookup.lookup_Value,
          lookup_Name: res.lookup.lookup_Name,
          is_Deleted: res.lookup.is_Deleted,
          short_Order: res.lookup.short_Order,
          lookup_Icon: res.lookup.lookup_Icon,
          lookup_Color: res.lookup.lookup_Color,
          discription: res.lookup.discription,
          lookup_SubType: res.lookup.lookup_SubType,
        });
      },
      (err) => {
        throw new Error(err);
        //console.log("errrrr", err);
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  delete(lookup_Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      //icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.LookupApi.DeleteById(lookup_Id).subscribe((res) => {
          //console.log("ddddddee", res);
          if (res.status == 1) {
            this.toaster.open({
              text: "Deleted Successfully!",
              position: 'top-right',
              type: "success",
            });
            this.Getall();
          } else {
            this.toaster.open({
              text: res.message,
              position: 'top-right',
              type: "danger",
            });

            this.Getall();
          }
        });
      }
    });
  }

  // LookUp type
  GetleaveList() {
    this.CommonApi.GetHeader().subscribe(
      (res) => {
        this.LookUpStatus = res.result;
        // console.log("Header", this.LookUpStatus);
      },
      (err) => {
        // console.log("Error");
      }
    );
  }
}
