import { Component, OnInit } from '@angular/core';
import { DynamicDataService } from '../../services/dynamicData.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sga-check-sheet',
  templateUrl: './sga-check-sheet.component.html',
  styleUrls: ['./sga-check-sheet.component.scss']
})
export class SgaCheckSheetComponent implements OnInit {

  member: any;
  sga = {
    Title: "",
    Present: "",
    Target: "",

    Members: [] as string[],
    MembersCount: 0
  }

  divisionList: any;
  categoryList: any;
  constructor(private dynamicDataService: DynamicDataService,
    private toastr: ToastrService,) {

  }

  ngOnInit(): void {
    this.getDivisions();
    this.getThemeRegistrationControllers();
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

  addMember() {
    this.sga.Members.push(this.member)
    this.member = ""
    this.sga.MembersCount = this.sga.Members.length;
  }

  removeMember(index: any) {
    this.sga.Members.splice(index, 1);
    this.sga.MembersCount = this.sga.Members.length;
  }
}
