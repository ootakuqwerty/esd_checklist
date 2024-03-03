import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { EsdChecksheetService } from '../../services/esd-checksheet.service'
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-esd-report',
  templateUrl: './esd-report-list.component.html',
  styleUrls: ['./esd-report-list.component.css'],
  providers: [DatePipe]
})
export class EsdReportListComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ctr = 0;
  date_filter: any = "0";
  esd_checksheet_list: any;

  constructor(private datePipe: DatePipe,
    private esdChecksheetService: EsdChecksheetService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private utils: UtilsService
  ) {

  }

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
    this.esdChecksheetService.getCheckSheetByDate(payload).subscribe((data) => {
      if (data.Success) {
        $('#esd_table').DataTable().destroy();
        this.esd_checksheet_list = data.Data;
        setTimeout(function () {
          $(function () {
            $('#esd_table').DataTable({
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
