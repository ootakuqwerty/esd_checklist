import { DatePipe, JsonPipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserAccountService } from '../../services/user-account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EsdChecksheetService } from '../../services/esd-checksheet.service';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-esd-report',
  templateUrl: './esd-report.component.html',
  styleUrls: ['./esd-report.component.scss'],
  providers: [DatePipe]
})
export class EsdReportComponent {
  @ViewChild('content', { static: true }) el!: ElementRef;

  @ViewChild('confirmationModal', { static: false })
  confirmModal!: ElementRef;

  @ViewChild('uploadedModal', { static: false })
  uploadedModal!: ElementRef;

  @ViewChild('signatureModal', { static: false })
  signatureModal!: ElementRef;


  modalReference: any;
  images = ""
  uploadedImagesList: any;
  userInfo: any
  model = {
    TransactionNumber: "",
    divOrFloorOrProcess: "",
    AuditProperAuditor: "",
    AuditProperAuditorSigned: false,
    AuditProperLeadAuditor: "",
    AuditProperLeadAuditorSigned: false,
    AuditProperProcessOwner: "",
    AuditProperProcessOwnerSigned: false,
    AuditVerificationProcessOwner: "",
    AuditVerificationProcessOwnerSigned: false,
    AuditVerificationLeadAuditor: "",
    AuditVerificationLeadOwnerSigned: false,
    AuditVerificationEsdCoordinator: "",
    AuditVerificationEsdCoordinatorSigned: false,
    TotalItemPass: 0,
    TotalItemFail: 0,
    RankScore: 0,
    Rank: "",
    ReverifyTotalItemPass: 0,
    ReverifyTotalItemFail: 0,
    ReverifyScore: 0,
    ReverifyRank: "",
    DateTimeStarted: "",
    DateTimeEnded: "",
    CheckSheet: "",
    OpenArea: "",
    CreatedBy: "0",
    CreatedOn: "",
    UpdatedBy: "0",
    UpdatedOn: "",
  }

  checkListArrayOrig = [];

  checkListArray: any

  openAreaArray: any[] = []
  esdPersonel: any

  processOwnerList: any
  auditorList: any;
  leadAuditorList: any;
  esdCoordinatorList: any;
  esdDivisionList: any;

  totalItemPass: any = 0;
  totalItemFailed: any = 0;
  rateScore: any = 0;
  rank: any = '';

  addSignatureData = {
    status: false,
    type: '',
    title: '',
    image: '',
    error: false,
  };

  paramsId: any
  division: any

  isHideReverify = false;

  constructor(private datePipe: DatePipe,
    private modalService: NgbModal,
    private userAccountService: UserAccountService,
    private spinner: NgxSpinnerService,
    private esdChecksheetService: EsdChecksheetService,
    private toastr: ToastrService,
    private utilsService: UtilsService,
    private ActivatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.spinner.show();
    this.auditorList = this.utilsService.getAllEsdPersonnelData().filter((process: any) => process.Type == 'Auditor');
    this.leadAuditorList = this.utilsService.getAllEsdPersonnelData().filter((process: any) => process.Type == 'Lead_Auditor');
    this.processOwnerList = this.utilsService.getAllEsdPersonnelData().filter((process: any) => process.Type == 'Process_Owner');
    this.esdCoordinatorList = this.utilsService.getAllEsdPersonnelData().filter((process: any) => process.Type == 'ESD_Coordinator');
    this.esdDivisionList = this.utilsService.getEsdDivisions();

    this.ActivatedRoute.params.subscribe((param) => {
      this.paramsId = param['id'];
      if (this.paramsId != 0) {
        this.esdChecksheetService.getCheckSheetByTransactionNumber(this.paramsId).subscribe((data: any) => {
          if (data.Success) {
            this.model.TransactionNumber = data.Data.TransactionNumber;
            this.model.CreatedOn = data.Data.CreatedOn;
            this.model.divOrFloorOrProcess = data.Data.divOrFloorOrProcess;
            this.division = this.getDivision(this.model.divOrFloorOrProcess)
            this.model.DateTimeStarted = data.Data.DateTimeStarted;

            this.model.AuditProperAuditor = data.Data.AuditProperAuditor;
            this.model.AuditProperAuditorSigned = data.Data.AuditProperAuditorSigned;
            this.model.AuditProperLeadAuditor = data.Data.AuditProperLeadAuditor;
            this.model.AuditProperLeadAuditorSigned = data.Data.AuditProperLeadAuditorSigned;
            this.model.AuditProperProcessOwner = data.Data.AuditProperProcessOwner;
            this.model.AuditProperProcessOwnerSigned = data.Data.AuditProperProcessOwnerSigned;

            this.model.AuditVerificationEsdCoordinator = data.Data.AuditVerificationEsdCoordinator;
            this.model.AuditVerificationEsdCoordinatorSigned = data.Data.AuditVerificationEsdCoordinatorSigned;
            this.model.AuditVerificationLeadAuditor = data.Data.AuditVerificationLeadAuditor;
            this.model.AuditVerificationLeadOwnerSigned = data.Data.AuditVerificationLeadOwnerSigned;
            this.model.AuditVerificationProcessOwner = data.Data.AuditVerificationProcessOwner;
            this.model.AuditVerificationProcessOwnerSigned = data.Data.AuditVerificationProcessOwnerSigned;

            this.checkListArray = JSON.parse(data.Data.CheckSheet);
            this.openAreaArray = JSON.parse(data.Data.OpenArea);

            this.model.Rank =  data.Data.Rank
            this.model.RankScore =  data.Data.RankScore
            this.model.TotalItemFail =  data.Data.TotalItemFail
            this.model.TotalItemPass = data.Data.TotalItemPass
            
            if(this.model.Rank == "A") this.isHideReverify = true; 
            
            this.model.ReverifyRank =  data.Data.ReverifyRank
            this.model.ReverifyScore =  data.Data.ReverifyScore
            this.model.ReverifyTotalItemPass =  data.Data.ReverifyTotalItemPass
            this.model.ReverifyTotalItemFail = data.Data.ReverifyTotalItemFail

            this.model.DateTimeStarted = data.Data.DateTimeStarted
            this.model.DateTimeEnded = data.Data.DateTimeEnded
            this.spinner.hide()
          } else {
            this.toastr.error(data.Message)
          }
        })
      }
    })
  }

  formatDateDisplay(date: any) {
    return String(this.datePipe.transform(date, "yyyy-MM-dd hh:mm:ss"))
  }

  exportPDF() {
    this.spinner.show()
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
    });
  }

  getConditionValue(conditions: any) {
    let condition = conditions.find((item: any) => item.value == true);
    return condition ? condition.name : ""
  }
  
  getDivision(id: any) {
    return this.utilsService.getEsdDivisionByID(id).Name
  }
}
