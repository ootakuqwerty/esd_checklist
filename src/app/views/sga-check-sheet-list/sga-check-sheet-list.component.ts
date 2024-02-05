import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SgaChecksheetService } from 'src/app/services/sga-checksheet.service';

@Component({
  selector: 'app-sga-check-sheet-list',
  templateUrl: './sga-check-sheet-list.component.html',
  styleUrls: ['./sga-check-sheet-list.component.scss'],
  providers: [DatePipe]
})
export class SgaCheckSheetListComponent implements OnInit {

  date_filter = "1"

  constructor(private datePipe: DatePipe,
    private toastr: ToastrService,
    private sgaCheckSheet: SgaChecksheetService) { }


  ngOnInit(): void {

  }

  getAllTheme() {
    
  }

  onFilterChange(){
    console.log(this.date_filter)
    this.getDateOffset();
  }

  getDateOffset(){

  }
}
