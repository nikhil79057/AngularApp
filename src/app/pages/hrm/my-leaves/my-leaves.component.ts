import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ExportToCsv } from "export-to-csv";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Toaster } from "ngx-toast-notifications";
import { LeaveService } from "src/app/services/leave.service";
import { LookupsService } from "src/app/services/lookups.service";
import { Config } from "src/app/utility/config";
import Swal from "sweetalert2";
import { EmployeeService } from "../../hrm/employee.service";

@Component({
  selector: "app-my-leaves",
  templateUrl: "./my-leaves.component.html",
  styleUrls: ["./my-leaves.component.scss"],
})
export class MyLeavesComponent implements OnInit {
  title = "My Leaves";
  UserId: any;
  res: any;

  // For Table
  displayedColumns: string[] = [
    "Profile",
    "Date-&-time",
    "Leave-duration",
    "leave_Type",
    "Status",
    "Actions",
  ];
  displayedColumns1: string[] = ["attachmentName", "attachmentUrl"];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  fileToUpload: File = null;
  userInfo: any;
  Login_key: any;
  _LeaveType: any;
  _AccountHeadType: any;
  EmployeeList: any;
  employee_Leave: any;
  timeoffForm: any;
  AttachmentForm: any;
  Id: any;
  roleid: any;
  ModalOpen: boolean;
  submitted: boolean = false;
  _LeaveStatus: any;
  Hideuser: boolean = false;
  AllTasks: any;
  dates: any;
  pending: MatTableDataSource<any>;
  PendingLeave: any;
  employeeleaveReq: any;
  SavaUpdate: any;
  userType: any;
  employeeDate: any;
  single_day: boolean = false;
  multi_day: boolean = false;
  Half_day: boolean = false;
  LeaveType: any;
  Ltype: any;
  Stype: any;
  Mtype: any;
  HLtype: any;
  Htype: any;
  leaveId: 0;
  dataSource1: MatTableDataSource<unknown>;
  attachmentId: any;
  ModalOpen2: boolean;
  LeaveStatus: any;
  AttachmentValue: boolean = false;

  constructor(
    private api: LeaveService,
    private employeeApi: EmployeeService,
    private config: Config,
    private CommonApi: LookupsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toaster: Toaster
  ) {
    this.timeoffForm = this.formBuilder.group({
      id: 0,
      user_Id: 0,
      leave_Type: "Annual_Leave",
      from_Date: "2022-09-19T12:25:20.681Z",
      to_Date: "2022-09-19T12:25:20.681Z",
      leave_Sub_Type: "",
      amount: 0,
      requested_Date: "2022-09-19T12:25:20.681Z",
      status: "Pending",
      remark: "",
      hourType: "",
      adminNote: "",
      type: "",
    });
    this.AttachmentForm = this.formBuilder.group({
      attachmentId: 0,
      entityId: 0,
      entityType: "",
      attachmentName: "",
      attachmentUrl: "",
      attachmentType: "",
      added_By: "",
      dts: "2020-10-04T08:11:56.170Z",
    });
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    this.UserId = this.userInfo.user_Id;
    this.roleid = this.userInfo.role_Id;
    this.userType = this.userInfo.role_Id;

    if (this.roleid == 0 || this.roleid == 1) {
      this.Hideuser = true;
      this.getAllLeaveReq();
    } else if (this.roleid == 9) {
      this.Hideuser = true;
      this.getAllseemanager(this.UserId);
    } else if (this.roleid == 2) {
      this.Hideuser = false;
      this.getAllData(this.UserId);
    } else {
    }
    this.getEmployeeList();
    this.GetleaveList();
    this.GetStatusList();
  }

  IsManager() {
    if (this.userType === 9 || this.userType === 2) {
      return true;
    } else {
      return false;
    }
  }

  IsAdmin() {
    if (this.roleid === 0 || this.roleid === 1) {
      return true;
    } else {
      return false;
    }
  }

  IsAdminandManager() {
    if (this.roleid === 0 || this.roleid === 9 || this.roleid === 1) {
      return true;
    } else {
      return false;
    }
  }
  IsEmployee() {
    if (this.userType === 2) {
      return true;
    } else {
      return false;
    }
  }
  IsOnlymanager() {
    if (this.roleid === 9) {
      return true;
    } else {
      return false;
    }
  }

  IsOnlyEmployee() {
    if (this.roleid === 2) {
      return true;
    } else {
      return false;
    }
  }

  // Add Leave req
  addLeave() {
    if (
      this.timeoffForm.value.leave_Type == "" ||
      this.timeoffForm.value.status == " "
    ) {
      this.toaster.open({
        text: "Please enter valid data",
        position: "top-right",
        type: "danger",
      });
      return;
    }
    if (this.timeoffForm.value.hourType === null) {
      this.timeoffForm.value.hourType = "";
      return;
    }
    if (this.timeoffForm.value.adminNote === null) {
      this.timeoffForm.value.adminNote = "";
      return;
    }
    if (this.timeoffForm.value.leave_Type == "Emergency_Leave") {
      if (this.timeoffForm.value.remark == "") {
        this.toaster.open({
          text: "Please enter Remark",
          position: "top-right",
          type: "danger",
        });
        return;
      }
    }
    if (this.timeoffForm.value.remark === null) {
      this.timeoffForm.value.remark = "";
      return;
    }
    this.submitted = true;
    this.config.startLoader();
    if (this.timeoffForm.value.id == null) {
      this.timeoffForm.value.id = 0;
    }
    if (this.timeoffForm.value.leave_Sub_Type == "singleday") {
      this.timeoffForm.value.from_Date = this.timeoffForm.value.from_Date;
      this.timeoffForm.value.to_Date = this.timeoffForm.value.from_Date;
    }
    if (this.timeoffForm.value.leave_Sub_Type == "multiday") {
      this.timeoffForm.value.from_Date = this.timeoffForm.value.from_Date;
      this.timeoffForm.value.to_Date = this.timeoffForm.value.to_Date;
    }
    if (this.timeoffForm.value.leave_Sub_Type == "halfday") {
      this.timeoffForm.value.from_Date = this.timeoffForm.value.from_Date;
      this.timeoffForm.value.to_Date = this.timeoffForm.value.from_Date;
    }
    this.timeoffForm.value.user_Id = this.UserId;
    this.timeoffForm.value.type = this.timeoffForm.value.leave_Type;
    this.timeoffForm.value.status = this.timeoffForm.value.status;
    this.timeoffForm.value.requested_Date = this.timeoffForm.value.from_Date;
    this.timeoffForm.value.amount = this.timeoffForm.value.amount;
    this.timeoffForm.value.leave_Sub_Type =
      this.timeoffForm.value.leave_Sub_Type;
    this.timeoffForm.value.hourType = this.timeoffForm.value.hourType;
    this.timeoffForm.value.remark = this.timeoffForm.value.remark;
    this.timeoffForm.value.adminNote = this.timeoffForm.value.adminNote;
    console.log("testtt", this.timeoffForm.value);
    this.api.postLeave(this.timeoffForm.value).subscribe((res) => {
      this.config.stopLoader();
      if (res.status == 1) {
        if (this.roleid == 0 || this.roleid == 1) {
          this.ModalOpen = false;
          this.ModalOpen2 = false;
          this.toaster.open({
            text: res.message,
            position: "top-right",
            type: "success",
          });
          this.timeoffForm.reset();
          if (this.roleid == 1 || this.roleid == 0) {
            this.getAllLeaveReq();
          } else if (this.roleid == 9) {
            this.getAllseemanager(this.UserId);
          } else {
            this.getAllData(this.UserId);
          }
        } else {
          Swal.fire({
            title: "Do you want to add Attachment?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.value) {
              this.AttachmentValue = true;
              this.leaveId = res.employee_Leave.id;
              this.ModalOpen = true;
              if (this.roleid == 0) {
                this.getAllLeaveReq();
              } else if (this.roleid == 9) {
                this.getAllseemanager(this.UserId);
              } else {
                this.getAllData(this.UserId);
              }
            } else {
              this.ModalOpen = false;
              this.toaster.open({
                text: "Saved Successfull",
                position: "top-right",
                type: "success",
              });
              this.timeoffForm.reset();
              if (this.roleid == 0) {
                this.getAllLeaveReq();
              } else if (this.roleid == 9) {
                this.getAllseemanager(this.UserId);
              } else {
                this.getAllData(this.UserId);
              }
            }
          });
        }
      } else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
    (error) => {
      console.log(error);
    };
  }

  openModel2(Id) {
    this.ModalOpen2 = true;
    this.router.navigate(["/hrm/edit-employees/" + Id]);
  }

  saveAttatchment() {
    if (
      this.AttachmentForm.value.attachmentName == null ||
      this.AttachmentForm.value.attachmentName == "" ||
      this.AttachmentForm.value.attachmentName == "undefined"
    ) {
      this.toaster.open({
        text: "Please fill the Attachment Name",
        position: "top-right",
        type: "danger",
      });
      return;
    }
    if (this.fileToUpload == null) {
      this.toaster.open({
        text: "Please select the Attachment File",
        position: "top-right",
        type: "danger",
      });
      return;
    }
    this.submitted = false;
    this.config.startLoader();
    if (this.AttachmentForm.value.attachmentId == null) {
      this.AttachmentForm.value.attachmentId = 0;
    }
    this.AttachmentForm.value.entityId = this.leaveId;
    this.AttachmentForm.value.dts = "2020-10-04T08:11:56.170Z";
    this.api.postFile(this.fileToUpload).subscribe(
      (data) => {
        this.AttachmentForm.value.attachmentUrl = data.result;
        this.api
          .attachmentSaveUpdate(this.AttachmentForm.value)
          .subscribe((res) => {
            console.log("att", res);

            this.config.stopLoader();
            if (res.status == 1) {
              this.ModalOpen = false;
              this.toaster.open({
                text: res.message,
                position: "top-right",
                type: "success",
              });
              this.AttachmentForm.reset();
              this.getAttachments();
            } else {
            }
          });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Delete Attachment
  DeleteAtt(Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.config.startLoader();
        this.api.DeleteAttachment(Id).subscribe((res) => {
          if (res.status == 1) {
            this.toaster.open({
              text: res.message,
              position: "top-right",
              type: "danger",
            });
            this.config.stopLoader();
            this.getAttachments();
          } else {
            this.toaster.open({
              text: res.message,
              position: "top-right",
              type: "danger",
            });
          }
        });
      }
    });
  }

  getAttachments() {
    this.api.getByEntity(this.leaveId).subscribe(
      (res) => {
        this.config.stopLoader();
        this.dataSource1 = new MatTableDataSource(res.attachment);
        this.dataSource1.sort = this.sort;
        this.dataSource1.paginator = this.paginator;
      },
      (err) => {}
    );
  }

  singleday() {
    this.single_day = true;
    this.multi_day = false;
    this.Half_day = false;
  }

  Multiday() {
    this.single_day = false;
    this.multi_day = true;
    this.Half_day = false;
  }

  Halfday() {
    this.single_day = false;
    this.multi_day = false;
    this.Half_day = true;
  }

  // Edit
  getById(id) {
    this.ModalOpen = true;
    this.config.startLoader();
    this.api.editLeave(id).subscribe((res) => {
      this.dates = res.employee_Leave;
      this.leaveId = res.employee_Leave.id;
      this.LeaveStatus = res.employee_Leave.status;

      if (res.employee_Leave.leave_Sub_Type == "singleday") {
        this.singleday();
      } else if (res.employee_Leave.leave_Sub_Type == "multiday") {
        this.Multiday();
        this.multi_day = true;
      } else {
        this.Halfday();
      }
      this.getAttachments();
      this.timeoffForm.patchValue({
        id: res.employee_Leave.id,
        user_Id: res.employee_Leave.user_Id,
        leave_Type: res.employee_Leave.leave_Type,
        from_Date: res.employee_Leave.from_Date,
        to_Date: res.employee_Leave.to_Date,
        amount: res.employee_Leave.amount,
        requested_Date: res.employee_Leave.requested_Date,
        status: res.employee_Leave.status,
        remark: res.employee_Leave.remark,
        leave_Sub_Type: res.employee_Leave.leave_Sub_Type,
        hourType: res.employee_Leave.hourType,
        attachmentName: res.employee_Leave.attachmentName,
        attachmentUrl: res.employee_Leave.attachmentUrl,
        adminNote: res.employee_Leave.adminNote,
      });
      this.config.stopLoader();
    });
  }

  // Approve
  Approve(id) {
    this.ModalOpen2 = true;
    this.config.startLoader();
    this.api.editLeave(id).subscribe((res) => {
      this.timeoffForm.patchValue({
        id: res.employee_Leave.id,
        user_Id: res.employee_Leave.user_Id,
        leave_Type: res.employee_Leave.leave_Type,
        from_Date: res.employee_Leave.from_Date,
        to_Date: res.employee_Leave.to_Date,
        amount: res.employee_Leave.amount,
        requested_Date: res.employee_Leave.requested_Date,
        status: "Approved",
        remark: res.employee_Leave.remark,
        leave_Sub_Type: res.employee_Leave.leave_Sub_Type,
        hourType: res.employee_Leave.hourType,
        attachmentName: res.employee_Leave.attachmentName,
        attachmentUrl: res.employee_Leave.attachmentUrl,
        adminNote:
          this.roleid == 1 || this.roleid == 0 ? "Admin Note" : "Manager Note",
      });
    });
    this.config.stopLoader();
  }

  // Reject
  Rejected(id) {
    this.ModalOpen2 = true;
    this.config.startLoader();
    this.api.editLeave(id).subscribe((res) => {
      this.timeoffForm.patchValue({
        id: res.employee_Leave.id,
        user_Id: res.employee_Leave.user_Id,
        leave_Type: res.employee_Leave.leave_Type,
        from_Date: res.employee_Leave.from_Date,
        to_Date: res.employee_Leave.to_Date,
        amount: res.employee_Leave.amount,
        requested_Date: res.employee_Leave.requested_Date,
        status: "Rejected",
        remark: res.employee_Leave.remark,
        leave_Sub_Type: res.employee_Leave.leave_Sub_Type,
        hourType: res.employee_Leave.hourType,
        attachmentName: res.employee_Leave.attachmentName,
        attachmentUrl: res.employee_Leave.attachmentUrl,
        adminNote: this.roleid == 0 ? "Admin Note" : "Manager Note",
      });

      this.config.stopLoader();
    });
  }

  //  Delete Leave req
  delete(Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.config.startLoader();
        this.api.DeleteById(Id).subscribe((res) => {
          if (res.status == 1) {
            this.toaster.open({
              text: "Deleted Successfully!",
              position: "top-right",
              type: "success",
            });
            this.config.stopLoader();
            this.timeoffForm.reset();
            if (this.roleid == 0) {
              this.getAllLeaveReq();
            } else if (this.roleid == 9) {
              this.getAllseemanager(this.UserId);
            } else {
              this.getAllData(this.UserId);
            }
          } else {
            this.toaster.open({
              text: res.message,
              position: "top-right",
              type: "danger",
            });
            if (this.roleid == 0 && 1) {
              this.Hideuser = true;
              this.getAllLeaveReq();
              // this.getAllData(0);
            } else {
              this.getAllData(this.UserId);
            }
          }
        });
      }
    });
  }

  getAllseemanager(UserId) {
    this.config.startLoader();
    this.api.getBymanager(UserId).subscribe((res) => {
      this.employeeleaveReq = res.employeeleavelist;
      this.config.stopLoader();
      if (res.status == "1") {
        this.dataSource = new MatTableDataSource(res.employeeleavelist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.toaster.open({
          text: res.message,
          position: "top-right",
          type: "danger",
        });
      }
    });
  }
  // only manager leave
  OpenManagerLeave() {
    this.config.startLoader();
    this.api.getmanagerLeave(this.UserId).subscribe((res) => {
      this.employeeleaveReq = res.employeeleavelist;
      this.config.stopLoader();
      if (res.status == "1") {
        this.dataSource = new MatTableDataSource(res.employeeleavelist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.toaster.open({
          text: res.message,
          position: "top-right",
          type: "danger",
        });
      }
    });
  }
  //  All Leave Request
  getAllLeaveReq() {
    this.config.startLoader();
    this.api.getAll().subscribe((res) => {
      this.employeeleaveReq = res.employeeleavelist;
      this.LeaveType = res.employeeleavelist;
      this.config.stopLoader();
      if (res.status == "1") {
        this.dataSource = new MatTableDataSource(res.employeeleavelist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.toaster.open({
          text: res.message,
          position: "top-right",
          type: "danger",
        });
      }
    });
  }

  // Individual employee leave data
  getAllData(userid) {
    this.config.startLoader;
    this.api.getByList(userid).subscribe((res) => {
      // console.log("EmployeeLaveReq", res);
      this.employeeleaveReq = res.employeeleavelist;
      if (res.singleday === "") {
        this.employeeDate = res.employeeleavelist.singleday;
      } else if (res.from_Date === "") {
        this.employeeDate = res.employeeleavelist.from_Date;
        this.employeeDate = res.employeeleavelist.to_Date;
      } else if (res.halfday === "") {
        this.employeeDate = res.employeeleavelist.halfday;
      }
      this.config.stopLoader();
      if (res.status == "1") {
        this.dataSource = new MatTableDataSource(res.employeeleavelist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.toaster.open({
          text: res.message,
          position: "top-right",
          type: "danger",
        });
      }
    });
  }

  // Calculate Date
  calculateAdavance() {
    if (this.timeoffForm.value.leave_Sub_Type == "singleday") {
      let d1 = Date.parse(this.timeoffForm.value.from_Date);
      let d2 = Date.parse(this.timeoffForm.value.from_Date);
      var timeDiff = d1 - d2;
      var diff = timeDiff / (1000 * 3600 * 24);
      var day = Math.floor(diff) + 1;
      this.timeoffForm.patchValue({
        amount: day,
      });
    } else if (this.timeoffForm.value.leave_Sub_Type == "multiday") {
      let d1 = Date.parse(this.timeoffForm.value.to_Date);
      let d2 = Date.parse(this.timeoffForm.value.from_Date);
      var timeDiff = d1 - d2;
      var diff = timeDiff / (1000 * 3600 * 24);
      var day = Math.floor(diff) + 1;
      this.timeoffForm.patchValue({
        amount: day,
      });
    } else if (this.timeoffForm.value.leave_Sub_Type == "halfday") {
      this.timeoffForm.patchValue({
        amount: 0.5,
      });
    } else {
      // console.log("Something went wrong");
    }
  }

  // Leave Type
  GetleaveList() {
    this.CommonApi.GetByType("_LeaveType").subscribe(
      (res) => {
        this._LeaveType = res.lookupList;
        // console.log("_LeaveType", this._LeaveType);
      },
      (err) => {
        // console.log("Error");
      }
    );
  }

  // Export Data
  export() {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Leave List",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: "Leave list",
    };
    const csvExporter = new ExportToCsv(options);
    let final = this.dataSource.filteredData.map(
      ({
        fullName,
        leave_Type,
        status,
        from_Date,
        to_Date,
        amount,
        remark,
      }) => ({
        fullName,
        leave_Type,
        status,
        from_Date,
        to_Date,
        amount,
        remark,
      })
    );
    csvExporter.generateCsv(final);
  }

  // Leave Status
  GetStatusList() {
    this.CommonApi.GetByType("_LeaveStatus").subscribe(
      (res) => {
        this._LeaveStatus = res.lookupList;
      },
      (err) => {
        // console.log("Error");
      }
    );
  }

  // Search
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getEmployeeList() {
    this.employeeApi.getAllEmployeesListByIsActive(true).subscribe(
      (res) => {
        this.EmployeeList = res.user;
      },
      (err) => {}
    );
  }

  Openmodel() {
    this.ModalOpen = true;
    this.timeoffForm.patchValue({
      status: "Pending",
    });
  }

  cancel() {
    this.submitted = false;
    this.ModalOpen = false;
    this.timeoffForm.reset();
    location.reload();
    this.timeoffForm.patchValue({
      leave_Type: "Annual_Leave",
    });
    if (this.roleid == 0) {
      this.Hideuser = true;
      this.getAllLeaveReq();
    } else if (this.roleid == 9) {
      this.Hideuser = true;
      this.getAllseemanager(this.UserId);
    } else if (this.roleid == 2) {
      this.Hideuser = false;
      this.getAllData(this.UserId);
    } else {
      // console.log("Somting Went Wrong");
    }
  }

  selectEmployee(userId) {
    this.getAllData(userId);
  }

  SelectEmployee2(userId) {
    this.getAllData(userId);
  }

  selectStatus(val) {
    this.config.startLoader();
    this.api.getByListbystatus(val).subscribe((res) => {
      this.config.stopLoader();
      if (res.status == "1") {
        this.dataSource = new MatTableDataSource(res.employeeleavelist);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        // console.log("Something went wrong");
      }
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.api.postFile(this.fileToUpload).subscribe(
      (data) => {
        // do something, if upload success
        // console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Download Attachment

  Attachment(fileName) {
    var url =
      this.config.APIUrl + "Leave/AttachmentDownload?fileName=" + fileName;
    window.open(url);
    console.log("Attachment-fileName=>", fileName);
  }

  public captureScreen() {
    var hiddenDiv = document.getElementById("render");
    var contentElement = document.getElementById("content");
    // hiddenDiv.style.display = 'block';
    // contentElement.style.fontSize = "25px"
    // contentElement.style.lineHeight = "25px"

    var data = document.getElementById("contentToConvert");
    html2canvas(data).then((canvas) => {
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png", 1.0);
      var doc = new jsPDF("p", "mm");
      var position = 0;
      doc.addImage(
        contentDataURL,
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(
          contentDataURL,
          "JPEG",
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        heightLeft -= pageHeight;
      }
      doc.save("EmployeeLeave.pdf");
    });
    hiddenDiv.style.display = "none";
    contentElement.style.fontSize = "14px";
    contentElement.style.lineHeight = "14px";
  }
}
