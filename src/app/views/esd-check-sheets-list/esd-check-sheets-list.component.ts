import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-esd-check-sheets-list',
  templateUrl: './esd-check-sheets-list.component.html',
  styleUrls: ['./esd-check-sheets-list.component.css']
})
export class EsdCheckSheetsListComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ctr = 0;


  constructor() {

  }

  ngOnInit(): void {
    setTimeout(function () {
      $(function () {
        $('#esd_table').DataTable({
          pageLength: 10,
          processing: true,
        });
      });
    }, 1);
  }
}
