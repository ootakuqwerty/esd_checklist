import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { SgaChecksheetService } from 'src/app/services/sga-checksheet.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sga-check-sheet-list',
  templateUrl: './sga-check-sheet-list.component.html',
  styleUrls: ['./sga-check-sheet-list.component.scss'],
  providers: [DatePipe]
})
export class SgaCheckSheetListComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ctr = 0;
  date_filter: any = "0";
  sga_checksheet_list: any;

  constructor(private datePipe: DatePipe,
    private toastr: ToastrService,
    private sgaCheckSheetService: SgaChecksheetService,
    private spinner: NgxSpinnerService,
    private utils: UtilsService) { }


  ngOnInit(): void {
    this.getDateOffset();
  }


  onFilterChange() {
    this.getDateOffset();
  }

  getDateOffset() {
    this.spinner.show()
    let dateToday = new Date();
    let formatDateToday = String(this.datePipe.transform(dateToday, "yyyy-MM-dd")) + "T23:59:00";
    let offsetDate = String(this.datePipe.transform(dateToday.setDate(dateToday.getDate() - this.date_filter), "yyyy-MM-dd")) + "T00:00:00";
    let payload = {
      DateFrom: offsetDate,
      DateTo: formatDateToday
    }
    this.spinner.hide()
    this.sgaCheckSheetService.getCheckSheetByDate(payload).subscribe((data) => {
      if (data.Success) {
        $('#sga_table').DataTable().destroy();
        this.sga_checksheet_list = data.Data;
        setTimeout(function () {
          $(function () {
            $('#sga_table').DataTable({
              pageLength: 10,
              processing: true,
              stateSave: true,
              order: [[0, 'desc']] 
            });
          });
        }, 1);
        this.spinner.hide()
      } else {
        this.toastr.error(data.Message);
        this.spinner.hide()
      }
    })
  }

  getDivision(id: any) {
    return this.utils.getEsdDivisionByID(id).Name
  }
}
