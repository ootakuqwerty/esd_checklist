import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DynamicTemplateService } from 'src/app/services/dynamic-template.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sga-patrol-form',
  templateUrl: './sga-patrol-form.component.html',
  styleUrls: ['./sga-patrol-form.component.scss'],
  providers: [DatePipe]
})
export class SgaPatrolFormComponent implements OnInit {

  header = {
    date: ''
  }
  vericationScore: number = 0;
  verificationRating: number = 0;

  patrolSheet: any;

  constructor(private datePipe: DatePipe,
    private dynamicTemplateService: DynamicTemplateService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.header.date = String(this.datePipe.transform(new Date(), "yyyy-MM-dd"));
    this.getTemplate();
  }

  getTemplate() {
    this.dynamicTemplateService.getDynamicTemplate("sga_verification_patrol_sheet").subscribe((data: any) => {
      if (data.Success) {
        this.patrolSheet = (JSON.parse(data.Data.Template))
      } else {
        console.log(data.Message)
        this.toastr.error(data.Message)
      }
    })
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
}

