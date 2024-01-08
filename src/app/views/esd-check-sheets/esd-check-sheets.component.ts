import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserAccountService } from '../../services/user-account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EsdChecksheetService } from '../../services/esd-checksheet.service';
import { ToastrService } from 'ngx-toastr';

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
  header = {
    ID: '',
    controlNo: '',
    process: '',
    date: ''
  }

  checkListArrayOrig = [{
    item: "Wrist Strap*",
    idealCondition: [],
    criteria: "Wrist strap bracelet condition intact",
    passOrFail: false,
    qty: [0, 0],
    condition: [{ name: "A", value: false }, { name: "B", value: false }, { name: "C", value: false }],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Smock*",
    idealCondition: [],
    criteria: "Smock condition has no cuts and not broken",
    passOrFail: false,
    qty: [0, 0],
    condition: [{ name: "A", value: false }, { name: "B", value: false }, { name: "C", value: false }],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Footwear*",
    idealCondition: [],
    criteria: "Heel or toe grounding tab condition (heel straps) Footwear condition",
    passOrFail: false,
    qty: [0, 0],
    condition: [{ name: "A", value: false }, { name: "B", value: false }, { name: "C", value: false }],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "ESD Flooring*",
    idealCondition: [],
    criteria: "Flooring condition is presentable",
    passOrFail: false,
    qty: [0, 0],
    condition: [{ name: "A", value: false }, { name: "B", value: false }, { name: "C", value: false }],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Floor Mats*",
    idealCondition: [],
    criteria: "Floor mats presentable",
    passOrFail: false,
    qty: [0, 0],
    condition: [{ name: "A", value: false }, { name: "B", value: false }, { name: "C", value: false }],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Push Cart",
    idealCondition: [],
    criteria: "Transportmedia antitastic and dissipative\nTransportmedia lined with static - safe material",
    passOrFail: false,
    qty: [0, 0],
    condition: [{ name: "A", value: false }, { name: "B", value: false }, { name: "C", value: false }],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Wip Rack",
    idealCondition: [],
    criteria: "Storage media grounded\nSensitive components and assemblies properly stored",
    passOrFail: false,
    qty: [0, 0],
    condition: [{ name: "A", value: false }, { name: "B", value: false }, { name: "C", value: false }],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Personnel Checks",
    idealCondition: [],
    criteria: "Personnel wearing wrist strap properly\nPersonnel wearing footwear properly (2 each)\nPersonnel wearing smock correctly\nPersonnnel grounded\nPersonnel transporting product via safe practices\npersonnel loading / unloading product properly\npersonnel following self test production",
    passOrFail: false,
    qty: [0, 0],
    condition: [{ name: "A", value: false }, { name: "B", value: false }, { name: "C", value: false }],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Packaging Material",
    idealCondition: [],
    criteria: "ESD packaging labels present and visible",
    passOrFail: false,
    qty: [0, 0],
    condition: [{ name: "A", value: false }, { name: "B", value: false }, { name: "C", value: false }],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Air Ionizer",
    idealCondition: [],
    criteria: "Air ionizer present if used\nAir ionizer calibration label updated. Proper use of Use of Air Ionizer",
    passOrFail: false,
    qty: [0, 0],
    condition: [{ name: "A", value: false }, { name: "B", value: false }, { name: "C", value: false }],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Training*",
    idealCondition: [],
    criteria: "ESD training program implemented\nNo training records (for imcomplete) (eng, ops, mngt)",
    passOrFail: false,
    qty: [0, 0],
    condition: [{ name: "A", value: false }, { name: "B", value: false }, { name: "C", value: false }],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Product Handling*",
    idealCondition: [],
    criteria: "Product not exposed outside of ESD work station\nProduct handled with ESD (gloves / finger cots) product stored properly",
    passOrFail: false,
    qty: [0, 0],
    condition: [{ name: "A", value: false }, { name: "B", value: false }, { name: "C", value: false }],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Chairs*",
    idealCondition: [],
    criteria: "Chairs in ESD area are dissipative\nDissipative chairs incorporate drag rain (added protection)",
    passOrFail: false,
    qty: [0, 0],
    condition: [{ name: "A", value: false }, { name: "B", value: false }, { name: "C", value: false }],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Records*",
    idealCondition: [],
    criteria: "Humidity records are available and correct\nHumidity records are available and correct\nTemperature records are available and current",
    passOrFail: false,
    qty: [0, 0],
    condition: [{ name: "A", value: false }, { name: "B", value: false }, { name: "C", value: false }],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "ESD Committee  ID*",
    idealCondition: [],
    criteria: "ESD Committee ID must be worn at all times\nESD Committee ID must be worn at all times\nCommittee ID must be presentable ",
    passOrFail: false,
    qty: [0, 0],
    condition: [{ name: "A", value: false }, { name: "B", value: false }, { name: "C", value: false }],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  ]

  checkListArray: any

  openAreaArray: any[] = []

  constructor(private datePipe: DatePipe,
    private modalService: NgbModal,
    private userAccountService: UserAccountService,
    private spinner: NgxSpinnerService,
    private esdChecksheetService: EsdChecksheetService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.checkListArray = this.checkListArrayOrig
    this.header.date = String(this.datePipe.transform(new Date(), "yyyy-MM-dd"));
    this.userInfo = this.userAccountService.getUserAccount();
  }

  addOpenArea() {
    this.openAreaArray.push({
      item: "",
      idealCondition: [],
      criteria: "",
      passOrFail: false,
      qty: "",
      condition: ["A", "B", "C"],
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
    this.header.ID = "";
    this.header.controlNo = "";
    this.header.process = "";
    this.header.date = String(this.datePipe.transform(new Date(), "yyyy-MM-dd"));
    this.checkListArray = this.checkListArrayOrig
    this.openAreaArray = [];
    window.scroll(0, 0)
  }

  searchControlNo(event: any) {
    let controlNo = event.target.value;
    if(controlNo != ""){
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
}
