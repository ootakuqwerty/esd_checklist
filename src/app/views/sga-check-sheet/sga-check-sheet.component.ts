import { Component, OnInit } from '@angular/core';
import { DynamicDataService } from '../../services/dynamicData.service';
import { ToastrService } from 'ngx-toastr';
import { SgaChecksheetService } from '../../services/sga-checksheet.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAccountService } from 'src/app/services/user-account.service';

@Component({
  selector: 'app-sga-check-sheet',
  templateUrl: './sga-check-sheet.component.html',
  styleUrls: ['./sga-check-sheet.component.scss']
})
export class SgaCheckSheetComponent implements OnInit {

  userInfo: any
  member: any;
  memberCount: any;
  membersList: any = [];

  ID = "";
  sga = {
    Title: "",
    Present: "",
    Target: "",
    Division: 0,
    Bldg: "",
    Floor: "",
    Department: "",
    DepartmentManager: "",
    SectionManager: "",
    SectionChief: "",
    Section: "",
    SgaLeader: "",
    EmployeeNo: "",
    ShiftOfLeader: "",
    LocalNo: "",
    EmailAddress: "",
    Category: 0,
    ControlNo: "",
    Type: "",
    GroupMember: "",
    MembersCount: 0,
    CreatedBy: "",
    UpdatedBy: "0"
  }

  divisionList: any;
  categoryList: any;
  constructor(private dynamicDataService: DynamicDataService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private sgaCheckSheetService: SgaChecksheetService,
    private userAccountService: UserAccountService) {
  }

  ngOnInit(): void {
    this.spinner.show()
    this.getDivisions();
    this.getThemeRegistrationControllers();
    this.userInfo = this.userAccountService.getUserAccount();

    setTimeout(() => {
      this.spinner.hide()
    }, 100);
  }

  getDivisions() {
    this.dynamicDataService.getDivision().subscribe((data: any) => {
      if (data.Success) {
        this.divisionList = data.Data;
      } else {
        this.toastr.error(data.Message)
      }
    })
  }

  getThemeRegistrationControllers() {
    this.dynamicDataService.getThemeRegistrationControllers().subscribe((data: any) => {
      if (data.Success) {
        this.categoryList = data.Data;
      } else {
        this.toastr.error(data.Message)
      }
    })
  }

  saveChecksheet() {
    this.spinner.show();
    this.sga.CreatedBy = this.userInfo.UserID;
    this.sga.GroupMember = JSON.stringify(this.membersList);
    if (this.ID == "") {
      this.sgaCheckSheetService.addCheckSheet(this.sga).subscribe((data: any) => {
        if (data.Success) {
          window.scroll(0, 0)
          this.ID = data.Data.ID;
          this.spinner.hide();
          this.toastr.success(data.Message)
          this.clear();
        } else {
          this.spinner.hide();
          this.toastr.error(data.Message)
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        this.toastr.error(error)
      })
    }
    this.spinner.hide();
  }

  clear() {
    this.sga.Bldg = "";
    this.sga.Category = 0;
    this.sga.ControlNo = "";
    this.sga.Department = "";
    this.sga.DepartmentManager = "";
    this.sga.Division = 0;
    this.sga.EmailAddress = "";
    this.sga.EmployeeNo = "";
    this.sga.Floor = "";
    this.sga.GroupMember = "";
    this.sga.LocalNo = "";
    this.sga.Present = "";
    this.sga.Section = "";
    this.sga.SectionChief = "";
    this.sga.SectionManager = "";
    this.sga.SgaLeader = "";
    this.sga.ShiftOfLeader = "";
    this.sga.Target = "";
    this.sga.Title ="";
    this.sga.Type = "" ;

    this.membersList = [];
    this.memberCount = this.membersList.length;
  }

  addMember() {
    this.membersList.push(this.member)
    this.member = ""
    this.memberCount = this.membersList.length;
  }

  removeMember(index: any) {
    this.membersList.splice(index, 1);
    this.memberCount = this.membersList.length;
  }
}
