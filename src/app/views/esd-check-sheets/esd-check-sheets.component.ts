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
    AuditVerificationLeadAuditorSigned: false,
    AuditVerificationEsdCoordinator: "",
    AuditVerificationEsdCoordinatorSigned: false,
    TotalItemPass: 0,
    TotalItemFail: 0,
    RankScore: 0,
    Rank: "",
    DateTimeStarted: "",
    DateTimeEnded: "",
    CheckSheet: "",
    OpenArea: "",
    CreatedBy: "0",
    CreatedOn: "",
    UpdatedBy: "0",
    UpdatedOn: "",
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

  addSignatureData = {
    status: false,
    type: '',
    title: '',
    image: '',
    error: false,
  };

  constructor(private datePipe: DatePipe,
    private modalService: NgbModal,
    private userAccountService: UserAccountService,
    private spinner: NgxSpinnerService,
    private esdChecksheetService: EsdChecksheetService,
    private toastr: ToastrService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.spinner.show()
    this.checkListArrayOrig = JSON.parse(this.utilsService.getEsdTemplate().Template);
    this.checkListArray = this.checkListArrayOrig;

    this.model.CreatedOn = String(this.datePipe.transform(new Date(), "yyyy-MM-ddThh:mm:ss"));
    this.userInfo = this.userAccountService.getUserAccount();

    this.auditorList = this.utilsService.getAllEsdPersonelData().filter((process: any) => process.Type == 'Auditor');
    this.leadAuditorList = this.utilsService.getAllEsdPersonelData().filter((process: any) => process.Type == 'Lead_Auditor');
    this.processOwnerList = this.utilsService.getAllEsdPersonelData().filter((process: any) => process.Type == 'Process_Owner');
    this.esdCoordinatorList = this.utilsService.getAllEsdPersonelData().filter((process: any) => process.Type == 'ESD_Coordinator');
    this.esdDivisionList = this.utilsService.getEsdDivisions();

    this.getTotalScore();

    this.checkListArray.forEach((item: any) => {
      this.getPercentCompletion(item);
    })
    if (this.openAreaArray) {
      this.openAreaArray.forEach((item: any) => {
        this.getPercentCompletion(item);
      })
    }
    setTimeout(() => {
      this.spinner.hide()
    }, 100);

  } 
  
  formatDateDisplay(date: any){
    return String(this.datePipe.transform(date, "yyyy-MM-dd hh:mm:ss"))
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
    this.openAreaArray.forEach((item: any) => {
      this.getPercentCompletion(item);
    })
  }

  removeOpenArea(index: any) {
    let alert = confirm("Are you sure you want to delete?");
    if (alert) {
      this.openAreaArray.splice(index, 1);
      this.getTotalScore();
    }
  }

  openModal(id: any) {
    this.images = '../../../assets/images/audit_checksheet/' + id + '.png';
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

  saveChecksheet(isNew: boolean) {
    this.spinner.show();
    let payload = {
      ...this.model
    }
    payload.TotalItemPass = this.totalItemPass;
    payload.TotalItemFail = this.totalItemFailed;
    payload.RankScore = this.rateScore;
    payload.Rank = this.rank;
    payload.CheckSheet = JSON.stringify(this.checkListArray)
    payload.OpenArea = JSON.stringify(this.openAreaArray)
    payload.CreatedBy = this.userInfo.UserID
    payload.UpdatedOn = String(this.datePipe.transform(new Date(), "yyyy-MM-ddThh:mm:ss"));

    if(isNew){
      this.esdChecksheetService.addCheckSheet(payload).subscribe((data) => {
        if (data.Success) {
          this.toastr.success(data.Message)
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.toastr.error(data.Message);
        }
      }, (error: any) => {
        this.spinner.hide();
        this.toastr.error(error)
      })
    }else{
      this.esdChecksheetService.updateCheckSheet(payload).subscribe((data) => {
        if (data.Success) {
          this.toastr.success(data.Message)
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.toastr.error(data.Message);
        }
      }, (error: any) => {
        this.spinner.hide();
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
          item.push(reader.result);
          this.spinner.hide();
        };
      }, 100);
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
    this.spinner.show();
    this.model.DateTimeStarted = String(this.datePipe.transform(new Date(), "yyyy-MM-ddThh:mm:ss"));
    this.model.DateTimeEnded = String(this.datePipe.transform(new Date(), "yyyy-MM-ddThh:mm:ss"));
    this.utilsService.getAutoNumber('QAETD').subscribe((response: any) => {
      this.model.TransactionNumber = response.Data;
      this.saveChecksheet(true)
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

  onClickAddSignature(type: any) {
    if (type == 'auditProperAuditor') {
      this.addSignatureData.status = this.model.AuditProperAuditorSigned
      this.addSignatureData.type = type
      this.addSignatureData.title = 'Audit Proper Auditor Signature';
      this.addSignatureData.image = '../../../assets/images/esd_personel/' + this.model.AuditProperAuditor + '.png';

    } else if (type == 'auditProperLeadAuditor') {
      this.addSignatureData.status = this.model.AuditProperLeadAuditorSigned
      this.addSignatureData.type = type
      this.addSignatureData.title = 'Audit Proper Lead Auditor Signature';
      this.addSignatureData.image = '../../../assets/images/esd_personel/' + this.model.AuditProperLeadAuditor + '.png';
    } else if (type == 'auditProperProcessOwner') {
      this.addSignatureData.status = this.model.AuditProperProcessOwnerSigned
      this.addSignatureData.type = type
      this.addSignatureData.title = 'Audit Proper Process Owner Signature';
      this.addSignatureData.image = '../../../assets/images/esd_personel/' + this.model.AuditProperProcessOwner + '.png';
    } else if (type == 'auditVerificationProcessOwner') {
      this.addSignatureData.status = this.model.AuditVerificationProcessOwnerSigned
      this.addSignatureData.type = type
      this.addSignatureData.title = 'Audit Verification Process Owner Signature';
      this.addSignatureData.image = '../../../assets/images/esd_personel/' + this.model.AuditVerificationProcessOwner + '.png';
    } else if (type == 'auditVerificationLeadAuditor') {
      this.addSignatureData.status = this.model.AuditVerificationLeadAuditorSigned
      this.addSignatureData.type = type
      this.addSignatureData.title = 'Audit Verification Lead Auditor Signature';
      this.addSignatureData.image = '../../../assets/images/esd_personel/' + this.model.AuditVerificationLeadAuditor + '.png';
    } else if (type == 'auditVerificationEsdCoordinator') {
      this.addSignatureData.status = this.model.AuditVerificationEsdCoordinatorSigned
      this.addSignatureData.type = type
      this.addSignatureData.title = 'Audit Verification ESD Coordinator';
      this.addSignatureData.image = '../../../assets/images/esd_personel/' + this.model.AuditVerificationEsdCoordinator + '.png';
    }
    this.addSignatureData.error = false;
    this.modalReference = this.modalService.open(this.signatureModal, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
    this.modalReference.result.then((result: any) => {
      this.spinner.show()
      if (this.addSignatureData.type == 'auditProperAuditor') {
        this.model.AuditProperAuditorSigned = result;
      } else if (this.addSignatureData.type == 'auditProperLeadAuditor') {
        this.model.AuditProperLeadAuditorSigned = result;
      } else if (this.addSignatureData.type == 'auditProperProcessOwner') {
        this.model.AuditProperProcessOwnerSigned = result;
      } else if (this.addSignatureData.type == 'auditVerificationProcessOwner') {
        this.model.AuditVerificationProcessOwnerSigned = result;
      } else if (this.addSignatureData.type == 'auditVerificationLeadAuditor') {
        this.model.AuditVerificationLeadAuditorSigned = result;
      } else if (this.addSignatureData.type == 'auditVerificationEsdCoordinator') {
        this.model.AuditVerificationEsdCoordinatorSigned = result;
      }
      this.spinner.hide()
    }, (reason: any) => { });

  }

  ValidateRequiredFields() {
    let ctr = 0
    if (this.model.TransactionNumber == '') ctr++;
    if (this.model.divOrFloorOrProcess == '') ctr++;
    this.checkListArray.forEach((item: any) => {
      if (!item.notAvailable) {
        if (item.actualPicture.length == 0) ctr++;
        if (item.completed == 'Invalid') ctr++;
        let ifHasTrue = false;
        item.condition.forEach((cond: any) => {
          if (cond.value) ifHasTrue = true;
        })
        if (!ifHasTrue) ctr++;
      }
    })
    if (this.openAreaArray.length > 0) {
      this.openAreaArray.forEach((item: any) => {
        if (!item.notAvailable) {
          if (item.actualPicture.length == 0) ctr++;
          if (item.completed == 'Invalid') ctr++;
          let ifHasTrue = false;
          item.condition.forEach((cond: any) => {
            if (cond.value) ifHasTrue = true;
          })
          if (!ifHasTrue) ctr++;
        }
      })
    }
    return ctr > 0
  }

  imageHasBeenLoaded(event:any, addSignatureData: any){
    addSignatureData.error = true;
  }
}
