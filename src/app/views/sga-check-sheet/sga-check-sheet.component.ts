import { Component, OnInit } from '@angular/core';
import { DynamicDataService } from '../../services/dynamicData.service';
import { ToastrService } from 'ngx-toastr';
import { SgaChecksheetService } from '../../services/sga-checksheet.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAccountService } from 'src/app/services/user-account.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    PresentUom: "",
    Target: "",
    TargetUom: "",
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
    UpdatedBy: "0",
  }

  divisionList: any;
  categoryList: any;
  uomList: any;
  buildingList: any;
  floorList: any;
  departmentList: any;
  sectionList: any;
  shiftOfLeaderList: any;
  personnelList: any
  departmentManagerList: any;
  sectionManagerList: any;
  sectionChiefList: any;
  sgaLeader: any;

  paramsId: any

  constructor(private dynamicDataService: DynamicDataService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private sgaCheckSheetService: SgaChecksheetService,
    private userAccountService: UserAccountService,
    private utilsService: UtilsService,
     private ActivatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.spinner.show();

    this.getThemeRegistrationControllers();
    this.userInfo = this.userAccountService.getUserAccount();
    this.uomList = this.utilsService.getSgaUomData();
    this.buildingList = this.utilsService.getSgaBuilding();
    this.floorList = this.utilsService.getSgaFloor();
    this.departmentList = this.utilsService.getSgaDepartment();
    this.sectionList = this.utilsService.getSgaSection();
    this.divisionList = this.utilsService.getSgaDivisions();
    this.shiftOfLeaderList = this.utilsService.getSgaSectionChief();

    this.departmentManagerList = this.utilsService.getSgaPersonnelData().filter((sga: any) => sga.Type == "department_manager");
    this.sectionManagerList = this.utilsService.getSgaPersonnelData().filter((sga: any) => sga.Type == "section_manager");
    this.sectionChiefList = this.utilsService.getSgaPersonnelData().filter((sga: any) => sga.Type == "section_chief");
    this.sgaLeader = this.utilsService.getSgaPersonnelData().filter((sga: any) => sga.Type == "sga_leader");

    this.ActivatedRoute.params.subscribe((param) => {
      this.paramsId = param['id'];
      if (this.paramsId != 0) {
        this.sgaCheckSheetService.getSgaCheckSheet(this.paramsId).subscribe((data: any) =>{
        this.sga.ControlNo = data.Data.ControlNo;
        this.sga.Title = data.Data.Title;
        this.sga.Present = data.Data.Present;
        this.sga.PresentUom = data.Data.PresentUom;
        this.sga.Target = data.Data.Target;
        this.sga.TargetUom = data.Data.TargetUom;
        this.sga.Division = data.Data.Division;
        this.sga.Bldg = data.Data.Bldg;
        this.sga.Floor = data.Data.Floor;
        this.sga.Department = data.Data.Department;
        this.sga.DepartmentManager = data.Data.DepartmentManager;
        this.sga.SectionManager = data.Data.SectionManager;
        this.sga.Section = data.Data.Section;
        this.sga.SectionChief = data.Data.SectionChief;
        this.sga.EmployeeNo = data.Data.EmployeeNo;
        this.sga.SgaLeader = data.Data.SgaLeader;
        this.sga.ShiftOfLeader = data.Data.ShiftOfLeader;
        this.sga.LocalNo = data.Data.LocalNo;
        this.sga.EmailAddress = data.Data.EmailAddress;
        this.sga.Category = data.Data.Category;
        this.sga.Type = data.Data.Type;
        this.sga.GroupMember = data.Data.GroupMember;
        this.membersList = JSON.parse(this.sga.GroupMember);
      })
      }
    })
    setTimeout(() => {
      this.spinner.hide()
    }, 100);
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

    if (this.sga.ControlNo == "") {
      this.utilsService.getSGAAutoNumber().subscribe((auto) => {
        let division = this.utilsService.getSgaDivisions().find((item: any) => item.ID == this.sga.Division)
        let bldg = this.utilsService.getSgaBuilding().find((item: any) => item.ID == this.sga.Bldg)
        let floor = this.utilsService.getSgaFloor().find((item: any) => item.ID == this.sga.Floor)
        let dept = this.utilsService.getSgaDepartment().find((item: any) => item.ID == this.sga.Department)

        let autoNumber = `${division.Name}-${bldg.Name}-${floor.Name}-${dept.Name}-${auto.Data}`;
        this.sga.ControlNo = autoNumber;

        this.sgaCheckSheetService.addCheckSheet(this.sga).subscribe((data: any) => {
          if (data.Success) {
            window.scroll(0, 0)
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
      }, (error: any) => {
        this.spinner.hide();
        console.log(error);
        this.toastr.error(error)
      })
    }else{
      this.sga.UpdatedBy = this.userInfo.UserID;
      console.log(this.sga)
      this.sgaCheckSheetService.updateCheckSheet(this.sga).subscribe((data: any) => {
        if (data.Success) {
          window.scroll(0, 0)
          this.spinner.hide();
          this.toastr.success(data.Message)
          // this.clear();
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
    this.sga.Title = "";
    this.sga.Type = "";

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

  onChangeEmpNo() {
    let person = this.utilsService.getSgaPersonnelData().find((sga: any) => sga.Type == "sga_leader" && sga.EmpNo == this.sga.EmployeeNo)
    if (person != undefined) {
      this.sga.SgaLeader = person.Name;
    } else this.sga.SgaLeader = "";
  }
}
