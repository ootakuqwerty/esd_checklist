import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DynamicTemplateService } from 'src/app/services/dynamic-template.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SgaChecksheetService } from 'src/app/services/sga-checksheet.service';
import { EsdChecksheetService } from 'src/app/services/esd-checksheet.service';
import { UserAccountService } from 'src/app/services/user-account.service';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-sga-patrol-form',
  templateUrl: './sga-patrol-form.component.html',
  styleUrls: ['./sga-patrol-form.component.scss'],
  providers: [DatePipe]
})
export class SgaPatrolFormComponent implements OnInit {

  params = {
    ControlNo: '',
    SgaAuditor: '',
    SgaLeader: '',
    sgaTitle: '',
    date: '',
    sgaDeptDiv: '',
  }
  vericationScore: number = 0;
  verificationRating: number = 0;
  patrolSheet: any;
  paramsId: any;
  sgaAuditorList: any;
  isNew: boolean = true;
  userInfo: any;
  isExport: boolean = false;
  sgaLeader: any;

  constructor(private datePipe: DatePipe,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private utilsService: UtilsService,
    private ActivatedRoute: ActivatedRoute,
    private sgaCheckSheetService: SgaChecksheetService,
    private utils: UtilsService,
    private userAccountService: UserAccountService,) { }

  ngOnInit(): void {
    this.spinner.show()
    this.userInfo = this.userAccountService.getUserAccount();
    this.params.date = String(this.datePipe.transform(new Date(), "yyyy-MM-dd"));
    this.patrolSheet = JSON.parse(this.utilsService.getSgaTemplate().Template);
    this.sgaAuditorList = this.utilsService.getSgaPersonnelData().filter((sga: any) => sga.Type == "sga_auditor");
    this.sgaLeader = this.utilsService.getSgaPersonnelData().filter((sga: any) => sga.Type == "sga_leader");

    this.ActivatedRoute.params.subscribe((param) => {
      this.paramsId = param['id'];
      if (this.paramsId != 0) {
        this.sgaCheckSheetService.getPatrolFormByControlNumber(this.paramsId).subscribe((data) => {
          this.params.ControlNo = this.paramsId;
          if (data.Success) {
            this.params.SgaAuditor = data.Data.SgaAuditor;
            this.patrolSheet = JSON.parse(data.Data.LevelOfAssessment);
            this.params.SgaLeader = data.Data.SgaLeader;
            this.isNew = false;
          }
          this.sgaCheckSheetService.getSgaCheckSheet(this.paramsId).subscribe((data2: any) => {
            this.params.sgaTitle = data2.Data.Title;
            this.params.sgaDeptDiv = `${this.getDivision(data2.Data.Division)} / ${this.getDepartment(data2.Data.Department)}`
          })
          this.computeTotalGradeAndRating()
          this.spinner.hide()
        })
      }
    })
  }

  savePatrolForm() {
    let payload = {
      ...this.params,
      LevelOfAssessment: JSON.stringify(this.patrolSheet),
      Score: String(this.vericationScore),
      Rating: String(this.verificationRating),
      CreatedBy: this.userInfo.UserID,
      UpdatedBy: this.userInfo.UserID,
    }

    if (this.isNew) {
      this.sgaCheckSheetService.addPatrolForm(payload).subscribe((data: any) => {
        if (data.Success) {
          window.scroll(0, 0)
          this.spinner.hide();
          this.isNew = false;
          this.toastr.success(data.Message)
        } else {
          this.spinner.hide();
          this.toastr.error(data.Message)
        }
      }, (error: any) => {
        this.spinner.hide();
        console.log(error);
        this.toastr.error(error)
      })
    } else {
      this.sgaCheckSheetService.updatePatrolForm(payload).subscribe((data: any) => {
        if (data.Success) {
          window.scroll(0, 0)
          this.spinner.hide();
          this.toastr.success(data.Message)
        } else {
          this.spinner.hide();
          this.toastr.error(data.Message)
        }
      }, (error: any) => {
        this.spinner.hide();
        console.log(error);
        this.toastr.error(error)
      })
    }
  }

  exportPdf() {
    this.spinner.show()
    this.isExport = true;
    setTimeout(() => {
      var data = document.getElementById('contentToConvert') as HTMLElement;  //Id of the table
      html2canvas(data).then(canvas => {
        // Few necessary setting options  
        let imgWidth = 208;
        let pageHeight = 295;
        let imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
        let position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save(this.paramsId); // Generated PDF   
        this.spinner.hide()
        this.isExport = false
      });
    }, 500);
  }

  getID(id: any, index: any, itemId: any) {
    let combinedID = String(id) + String(index) + String(itemId);
    return combinedID
  }

  createRadioName(index: any) {
    return String(index)
  }

  radioItemChange(item: any, level: number) {
    switch (level) {
      case 1: {
        item.level1[1] = true;
        item.level2[1] = false;
        item.level3[1] = false;
        item.level4[1] = false;
        item.level5[1] = false;
        break;
      }
      case 2: {
        item.level1[1] = false;
        item.level2[1] = true;
        item.level3[1] = false;
        item.level4[1] = false;
        item.level5[1] = false;
        break;
      }
      case 3: {
        item.level1[1] = false;
        item.level2[1] = false;
        item.level3[1] = true;
        item.level4[1] = false;
        item.level5[1] = false;
        break;
      }
      case 4: {
        item.level1[1] = false;
        item.level2[1] = false;
        item.level3[1] = false;
        item.level4[1] = true;
        item.level5[1] = false;
        break;
      }
      case 5: {
        item.level1[1] = false;
        item.level2[1] = false;
        item.level3[1] = false;
        item.level4[1] = false;
        item.level5[1] = true;
        break;
      }
    }
    this.computeTotalGradeAndRating()
  }

  computeTotalGradeAndRating() {
    let score = 0
    this.patrolSheet.forEach((sheet: any) => {
      if (sheet.level1[1] == true) score += Number(sheet.level1[2])
      if (sheet.level2[1] == true) score += Number(sheet.level2[2])
      if (sheet.level3[1] == true) score += Number(sheet.level3[2])
      if (sheet.level4[1] == true) score += Number(sheet.level4[2])
      if (sheet.level5[1] == true) score += Number(sheet.level5[2])
    })
    this.vericationScore = score;
    this.computeVerificationRating();

  }

  computeVerificationRating() {
    if (this.vericationScore >= 1 && this.vericationScore <= 4) this.verificationRating = 1;
    if (this.vericationScore >= 5 && this.vericationScore <= 8) this.verificationRating = 2;
    if (this.vericationScore >= 9 && this.vericationScore <= 12) this.verificationRating = 3;
    if (this.vericationScore >= 13 && this.vericationScore <= 16) this.verificationRating = 4;
    if (this.vericationScore >= 17 && this.vericationScore <= 20) this.verificationRating = 5;
    if (this.vericationScore >= 21 && this.vericationScore <= 24) this.verificationRating = 6;
    if (this.vericationScore >= 25 && this.vericationScore <= 28) this.verificationRating = 7;
    if (this.vericationScore >= 29 && this.vericationScore <= 32) this.verificationRating = 8;
    if (this.vericationScore >= 33 && this.vericationScore <= 36) this.verificationRating = 9;
    if (this.vericationScore >= 37 && this.vericationScore <= 40) this.verificationRating = 10;
    if (this.vericationScore >= 41 && this.vericationScore <= 44) this.verificationRating = 11;
    if (this.vericationScore >= 45 && this.vericationScore <= 48) this.verificationRating = 12;
    if (this.vericationScore >= 49 && this.vericationScore <= 52) this.verificationRating = 13;
    if (this.vericationScore >= 53 && this.vericationScore <= 56) this.verificationRating = 14;
    if (this.vericationScore >= 57 && this.vericationScore <= 60) this.verificationRating = 15;
    if (this.vericationScore >= 61 && this.vericationScore <= 64) this.verificationRating = 16;
    if (this.vericationScore >= 65 && this.vericationScore <= 68) this.verificationRating = 17;
    if (this.vericationScore >= 69 && this.vericationScore <= 72) this.verificationRating = 18;
    if (this.vericationScore >= 73 && this.vericationScore <= 76) this.verificationRating = 19;
    if (this.vericationScore >= 77 && this.vericationScore <= 80) this.verificationRating = 20;
    if (this.vericationScore >= 81 && this.vericationScore <= 84) this.verificationRating = 21;
    if (this.vericationScore >= 85 && this.vericationScore <= 88) this.verificationRating = 22;
    if (this.vericationScore >= 89 && this.vericationScore <= 92) this.verificationRating = 23;
    if (this.vericationScore >= 93 && this.vericationScore <= 96) this.verificationRating = 24;
    if (this.vericationScore >= 97 && this.vericationScore <= 100) this.verificationRating = 25;
  }

  getDivision(id: any) {
    return this.utils.getSgaDivisionByID(id).Name
  }

  getDepartment(id: any) {
    return this.utils.getSgaDepartmentByID(id).Name
  }
}

