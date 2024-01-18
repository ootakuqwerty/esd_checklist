import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

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

  patrolSheet = [{
    id: 1,
    title: "1)  Report Presentation",
    level1: ["No report presentation (1)", false, 1],
    level2: ["With report but using an old format of template (2)", false, 2],
    level3: ["Less than 79% completion of report using updated template (3)", false, 3],
    level4: ["80% Fto 90% completion of report using updated template (4)", false, 4],
    level5: ["100% completion of report using updated template (5)", false, 5],
    remarks: ""
  }, {
    id: 2,
    title: "2)  Project theme category",
    level1: ["Activity is related to Morale, Control, Equipment (1)", false, 1],
    level2: ["Activity is related to Safety & Environment (2)", false, 2],
    level3: ["Activity is related to Delivery (3)", false, 3],
    level4: ["Activity is related to Quality (4)", false, 4],
    level5: ["Activity is related to Human error elimination and Cost down reduction (5)", false, 5],
    remarks: ""
  }, {
    id: 3,
    title: "3) Background of activity",
    level1: ["Background is rarely relevant to the activity (1)", false, 1],
    level2: ["Background is nearly relevant to the activity (2)" , false, 2],
    level3: ["Background is understandable but with insufficiency (3)", false, 3],
    level4: ["Background is clearly and understandable thru statement (4)", false, 4],
    level5: ["Background is clearly and understandable with supporting data (5)", false, 5],
    remarks: ""
  }, {
    id: 4,
    title: "4) Problem Point of the activity",
    level1: ["Problem is not relevant to the activity (1)" , false, 1],
    level2: ["Problem is nearly relevant to the activity (2)", false, 2],
    level3: ["Problem is understandable but with insufficiency (3)", false, 3],
    level4: ["Problem is clearly and understandable thru statement (4)", false, 4],
    level5: ["Problem is clearly and understandable with supporting data (5)", false, 5],
    remarks: ""
  }, {
    id: 5,
    title: "5) Objective of activity",
    level1: ["Objective is not relevant to the title of activity (1)", false, 1],
    level2: ["", false, 2],
    level3: ["", false, 3],
    level4: ["", false, 4],
    level5: ["Objective is relevant to the title of activity (5)", false, 5],
    remarks: ""
  }, {
    id: 6,
    title: "6) Master Plan update",
    level1: ["Old format of Master plan (1)", false, 1],
    level2: ["With wrong entry of details (2)", false, 2],
    level3: ["Updated plan, not distributed task to each member (3)", false, 3],
    level4: ["Updated plan, but no signatories, distributed task (4)", false, 4],
    level5: ["With complete details on master plan, (updated plan, with signatories, task is distributed, with title, correct sem.) (5)", false, 5],
    remarks: ""
  }, {
    id: 7,
    title: "7) Benchmark of activity",
    level1: ["Benchmark is presented thru picture / statement (1)", false, 1],
    level2: ["", false, 2],
    level3: ["", false, 3],
    level4: ["", false, 4],
    level5: ["Clearly presented the data using 7QC tools (5)", false, 5],
    remarks: ""
  }, {
    id: 8,
    title: "8) Cause Identification / Analysis",
    level1: ["No fishbone analysis (2)", false, 2],
    level2: ["Analysis of the problem is insufficient/not clear (4)", false, 4],
    level3: ["Analysis of the problem is clearly stated thru fishbone diagram but no 5W analysis (6)", false, 6],
    level4: ["Analysis of the problem is clearly stated thru fishbone diagram but 5W analysis is not clear (8)", false, 8],
    level5: ["Analysis of the problem is clearly stated thru fishbone diagram and 5W analysis (10)", false, 10],
    remarks: ""
  }, {
    id: 9,
    title: "9) Implementation of activity",
    level1: ["Implementation items is rare from the title of activity (2)", false, 2],
    level2: ["Not tally Master plan vs. slides (4)", false, 4],
    level3: ["Incomplete implementation items base from master plan (6)", false, 6],
    level4: ["Tally Master plan vs. actual slides (8)", false, 8],
    level5: ["Implementation is based from the result of 5W analysis (10)", false, 10],
    remarks: ""
  }, {
    id: 10,
    title: "10) Effectiveness of activity (result)",
    level1: ["Achievement is 79% below on the set target or goal (2)", false, 2],
    level2: ["Achievement is 80% to 89% on the set target or goal (4)", false, 4],
    level3: ["Achievement is 90% to 99% on the set target or goal (6)", false, 6],
    level4: ["Achievement is exactly on the set target or goal (8)", false, 8],
    level5: ["Achievement more than the set target or goal (10)", false, 10],
    remarks: ""
  }, {
    id: 11,
    title: "11) Efficiency of activity(duration)",
    level1: ["Schedule of activity is not finished/stop (1)", false, 1],
    level2: ["", false, 4],
    level3: ["", false, 6],
    level4: ["", false, 8],
    level5: ["Schedule of activity is done on time or ahead on schedule (5)", false, 5],
    remarks: ""
  }, {
    id: 12,
    title: "12) Education / Awareness)",
    level1: ["No education (1)", false, 1],
    level2: ["Lacking of  members to be educated (2)", false, 2],
    level3: ["Lacking of evidence thru plan vs. actual of members to be educated (3)", false, 3],
    level4: ["Lacking of evidence thru IPN record (4)", false, 4],
    level5: ["All concerned personnel are educated (head count plan vs. actual, IPN, picture) (5)", false, 5],
    remarks: ""
  }, {
    id: 13,
    title: "13) Standardization (NEED)",
    level1: ["Standardization is below 59% completion (2)", false, 2],
    level2: ["Standardization is 69% to 79% completion (4)", false, 4],
    level3: ["Standardization schedule is 80% to 99% completion (6)", false, 6],
    level4: ["Standardized but not yet uploaded to e-docs (8)", false, 8],
    level5: ["Standard is uploaded to e-docs) (10)", false, 10],
    remarks: ""
  }, {
    id: 0,
    title: "NO NEED",
    level1: ["Not applicable for ideal condition (2)", false, 2],
    level2: ["Posting of Ideal Condition is below 69% completion (4)", false, 4],
    level3: ["Posting of Ideal condition is 70% to 79% completion (6)", false, 6],
    level4: ["Posting of Ideal condition is 80% to 99% completion (8)", false, 8],
    level5: ["Activity is with Ideal Condition 100%) (10)", false, 10],
    remarks: ""
  }, {
    id: 14,
    title: "14) Horizontal Application",
    level1: ["Not applicable for horizontal application (1)", false, 1],
    level2: ["Horizontal application is below 69% completion (2)", false, 2],
    level3: ["Horizontal application is 70 to 79% completion (3)", false, 3],
    level4: ["Horizontal application is 80% to 99% completion (4)", false, 4],
    level5: ["Activity is with Ideal Condition 100%) (5)", false, 5],
    remarks: ""
  }, {
    id: 15,
    title: "15) Interview with member",
    level1: ["Member did not know the activity (1)", false, 1],
    level2: ["Member know the activity but did not know the background (2)", false, 2],
    level3: ["Member know the background/problem but did not know the result/effectiveness of activity (3)", false, 3],
    level4: ["Member know the background/problem and effectiveness (4)", false, 4],
    level5: ["Member has broad knowledge about the activity) (5)", false, 5],
    remarks: ""
  }, {
    id: 16,
    title: "16) Total project status",
    level1: ["Activity is not yet implemented (1)", false, 1],
    level2: ["", false, 2],
    level3: ["", false, 3],
    level4: ["", false, 4],
    level5: ["Activity is established and well implemented) (5)", false, 5],
    remarks: ""
  }]


  constructor(private datePipe: DatePipe,) { }

  ngOnInit(): void {
    this.header.date = String(this.datePipe.transform(new Date(), "yyyy-MM-dd"));
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

