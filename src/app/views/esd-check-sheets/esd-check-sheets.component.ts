import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserAccountService } from '../../services/user-account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EsdChecksheetService } from '../../services/esd-checksheet.service';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../services/utils.service'

@Component({
  selector: 'app-esd-check-sheets',
  templateUrl: './esd-check-sheets.component.html',
  styleUrls: ['./esd-check-sheets.component.scss'],
  providers: [DatePipe]
})
export class EsdCheckSheetsComponent implements OnInit {
  @ViewChild('confirmationModal', { static: false })
  confirmModal!: ElementRef;

  @ViewChild('uploadedModal', { static: false })
  uploadedModal!: ElementRef;

  modalReference: any;
  images = ""
  uploadedImagesList: any;
  userInfo: any
  model = {
    TransactionNumber: "",
    Date: "",
    Division: "",
    auditProperAuditor: "",
    auditProperLeadAuditor: "",
    auditProperProcessOwner: "",
    auditVerificationProcessOwner: "",
    auditVerificationLeadOwner: "",
    auditVerificationEsdCoordinator: "",
    start: "test",
    end: ""
  }
  header = {
    ID: '',
    controlNo: '',
    process: '',
    date: ''
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

  constructor(private datePipe: DatePipe,
    private modalService: NgbModal,
    private userAccountService: UserAccountService,
    private spinner: NgxSpinnerService,
    private esdChecksheetService: EsdChecksheetService,
    private toastr: ToastrService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.checkListArrayOrig = JSON.parse(this.utilsService.getEsdTemplate().Template);
    this.checkListArray = this.checkListArrayOrig;

    this.header.date = String(this.datePipe.transform(new Date(), "yyyy-MM-dd"));
    this.model.Date = String(this.datePipe.transform(new Date(), "yyyy-MM-dd"));
    this.userInfo = this.userAccountService.getUserAccount();

    this.auditorList = this.utilsService.getAllEsdPersonelData().filter((process: any) => process.Type == 'Auditor');
    this.leadAuditorList = this.utilsService.getAllEsdPersonelData().filter((process: any) => process.Type == 'Lead_Auditor');
    this.processOwnerList = this.utilsService.getAllEsdPersonelData().filter((process: any) => process.Type == 'Process_Owner');
    this.esdCoordinatorList = this.utilsService.getAllEsdPersonelData().filter((process: any) => process.Type == 'ESD_Coordinator');
    this.esdDivisionList = this.utilsService.getEsdDivisions();
  }

  addOpenArea() {
    this.openAreaArray.push({
      item: "",
      idealCondition: [],
      criteria: "",
      notAvailable: false,
      passOrFail: false,
      qty: [0, 0],
      condition: [
        {
          name: "A",
          value: false
        },
        {
          name: "B",
          value: false
        },
        {
          name: "C",
          value: false
        }
      ],
      actualPicture: [],
      commentRemarks: "",
      completed: ""
    })
  }

  removeOpenArea(index: any) {
    this.openAreaArray.splice(index, 1)
  }

  openModal(id: any) {
    this.images = '../../../assets/images/' + id + '.png';
    this.modalReference = this.modalService.open(this.confirmModal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
    this.modalReference.result.then((result: any) => {
    }, (reason: any) => {

    });

  }

  openUploadedModal(item: any) {
    this.uploadedImagesList = item
    this.modalReference = this.modalService.open(this.uploadedModal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
    this.modalReference.result.then((result: any) => {
    }, (reason: any) => {

    });

  }

  createRadioName(index: any) {
    return String(index)
  }

  radioItemChange(items: any, name: any) {
    items.forEach((item: any) => {
      if (item.name != name) {
        item.value = false
      } else item.value = true
    });
  }

  saveChecksheet() {
    this.spinner.show();
    let payload = {
      ControlNo: this.header.controlNo,
      Process: this.header.process,
      Date: this.header.date,
      CheckSheet: JSON.stringify(this.checkListArray),
      OpenArea: JSON.stringify(this.openAreaArray),
      CreatedBy: this.userInfo.UserID,
      UpdatedBy: "0",

    }
    if (this.header.ID == "") {
      this.esdChecksheetService.addCheckSheet(payload).subscribe((data) => {
        if (data.Success) {
          window.scroll(0, 0)
          this.header.ID = data.Data.ID;
          this.spinner.hide();
          this.toastr.success(data.Message)
        } else {
          this.spinner.hide();
          this.toastr.error(data.Message)
        }

      }, (error) => {
        this.spinner.hide();
        console.log(error);
        this.toastr.error(error)
      })
    } else {
      this.esdChecksheetService.updateCheckSheet(this.header.ID, payload).subscribe((data) => {
        if (data.Success) {
          window.scroll(0, 0)
          this.toastr.success(data.Message)
          this.spinner.hide();
        } else {
          this.toastr.error(data.Message)
          this.spinner.hide();
        }

      }, (error) => {
        this.spinner.hide();
        console.log(error);
        this.toastr.error(error)
      })
    }
  }

  importFile(event: any, item: any) {
    try {
      this.spinner.show();
      setTimeout(() => {
        if (event.target.files.length == 0) {
          console.log("No file selected!");
          return
        }
        let file: File = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          item.actualPicture.push(reader.result)
          this.spinner.hide();
        };
      }, 500);
    } catch (error) {
      this.spinner.hide();
    }
  }

  removeImage(item: any, i: any) {
    var result = confirm('Are you sure you want to remove this image?')
    if (result) item = item.splice(i, 1);
  }

  clear() {
    var alert = confirm("Are you sure you want to clear?");
    if (alert == true) {
      this.header.ID = "";
      this.header.controlNo = "";
      this.header.process = "";
      this.header.date = String(this.datePipe.transform(new Date(), "yyyy-MM-dd"));
      this.checkListArray = this.checkListArrayOrig
      this.openAreaArray = [];
      window.scroll(0, 0)
    }
  }

  searchControlNo(event: any) {
    let controlNo = event.target.value;
    if (controlNo != "") {
      this.esdChecksheetService.getCheckSheet(controlNo).subscribe((data: any) => {
        if (data.Success) {
          this.header.ID = data.Data.ID;
          this.header.process = data.Data.Process;
          this.header.date = String(this.datePipe.transform(data.Data.Date, "yyyy-MM-dd"));
          this.checkListArray = JSON.parse(data.Data.CheckSheet);
          this.openAreaArray = JSON.parse(data.Data.OpenArea);
        }
      }, (error: any) => {
        console.log(error)
        this.toastr.error(error)
      })
    }
  }

  startTimer() {
    this.model.start = Date.now.toString();
    this.utilsService.getAutoNumber('QAETD').subscribe((response: any) => {
      this.model.TransactionNumber = response.Data
    })
  }

  getPercentCompletion(item: any) {
    if ((item.qty[0] != 0 && item.qty[1] != 0) && item.qty[0] <= item.qty[1]) {
      let percent = (item.qty[0] / item.qty[1]) * 100
      item.completed = this.toFixed(percent, 0);
    } else item.completed = "Invalid"
  }

  getTotalScore() {
    let totalItemFailed = 0
    let totalItemPass = 0

    this.checkListArray.forEach((item: any) => {
      if (item.passOrFail) totalItemPass += 1
      else totalItemFailed += 1
    });

    this.openAreaArray.forEach((item: any) => {
      if (item.passOrFail) totalItemPass += 1
      else totalItemFailed += 1
    });

    this.totalItemPass = totalItemPass;
    this.totalItemFailed = totalItemFailed;

    let totalLength = this.checkListArray.length + this.openAreaArray.length

    let score = (totalItemPass / totalLength * 100)
    this.rateScore = this.toFixed(score, 0);
    if (this.rateScore >= 91 && this.rateScore <= 100) this.rank = "A"
    else if (this.rateScore >= 81 && this.rateScore <= 90) this.rank = "B"
    else if (this.rateScore >= 71 && this.rateScore <= 80) this.rank = "C"
    else if (this.rateScore <= 70) this.rank = "D"
  }

  toFixed(num: any, fixed: any) {
    fixed = fixed || 0;
    fixed = Math.pow(10, fixed);
    return Math.floor(num * fixed) / fixed;
  }
}
