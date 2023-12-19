import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-check-sheets',
  templateUrl: './check-sheets.component.html',
  styleUrls: ['./check-sheets.component.scss'],
  providers: [DatePipe]
})
export class CheckSheetsComponent implements OnInit {
  @ViewChild('confirmationModal', { static: false })
  confirmModal!: ElementRef;

  modalReference: any;
  images = ""
  today: any;

  checkListArray = [{
    item: "Wrist Strap*",
    idealCondition: [],
    criteria: "Wrist strap bracelet condition intact",
    passOrFail: false,
    qty: "",
    condition: ["A", "B", "C"],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Smock*",
    idealCondition: [],
    criteria: "Smock condition has no cuts and not broken",
    passOrFail: false,
    qty: "",
    condition: ["A", "B", "C"],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Footwear*",
    idealCondition: [],
    criteria: "Heel or toe grounding tab condition (heel straps) Footwear condition",
    passOrFail: false,
    qty: "",
    condition: ["A", "B", "C"],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "ESD Flooring*",
    idealCondition: [],
    criteria: "Flooring condition is presentable",
    passOrFail: false,
    qty: "",
    condition: ["A", "B", "C"],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Floor Mats*",
    idealCondition: [],
    criteria: "Floor mats presentable",
    passOrFail: false,
    qty: "",
    condition: ["A", "B", "C"],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Push Cart",
    idealCondition: [],
    criteria: "Transportmedia antitastic and dissipative\nTransportmedia lined with static - safe material",
    passOrFail: false,
    qty: "",
    condition: ["A", "B", "C"],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Wip Rack",
    idealCondition: [],
    criteria: "Storage media grounded\nSensitive components and assemblies properly stored",
    passOrFail: false,
    qty: "",
    condition: ["A", "B", "C"],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Personnel Checks",
    idealCondition: [],
    criteria: "Personnel wearing wrist strap properly\nPersonnel wearing footwear properly (2 each)\nPersonnel wearing smock correctly\nPersonnnel grounded\nPersonnel transporting product via safe practices\npersonnel loading / unloading product properly\npersonnel following self test production",
    passOrFail: false,
    qty: "",
    condition: ["A", "B", "C"],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Packaging Material",
    idealCondition: [],
    criteria: "ESD packaging labels present and visible",
    passOrFail: false,
    qty: "",
    condition: ["A", "B", "C"],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Air Ionizer",
    idealCondition: [],
    criteria: "Air ionizer present if used\nAir ionizer calibration label updated. Proper use of Use of Air Ionizer",
    passOrFail: false,
    qty: "",
    condition: ["A", "B", "C"],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Training*",
    idealCondition: [],
    criteria: "ESD training program implemented\nNo training records (for imcomplete) (eng, ops, mngt)",
    passOrFail: false,
    qty: "",
    condition: ["A", "B", "C"],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Product Handling*",
    idealCondition: [],
    criteria: "Product not exposed outside of ESD work station\nProduct handled with ESD (gloves / finger cots) product stored properly",
    passOrFail: false,
    qty: "",
    condition: ["A", "B", "C"],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Chairs*",
    idealCondition: [],
    criteria: "Chairs in ESD area are dissipative\nDissipative chairs incorporate drag rain (added protection)",
    passOrFail: false,
    qty: "",
    condition: ["A", "B", "C"],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "Records*",
    idealCondition: [],
    criteria: "Humidity records are available and correct\nHumidity records are available and correct\nTemperature records are available and current",
    passOrFail: false,
    qty: "",
    condition: ["A", "B", "C"],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  {
    item: "ESD Committee  ID*",
    idealCondition: [],
    criteria: "ESD Committee ID must be worn at all times\nESD Committee ID must be worn at all times\nCommittee ID must be presentable ",
    passOrFail: false,
    qty: "",
    condition: ["A", "B", "C"],
    actualPicture: [],
    commentRemarks: "",
    completed: ""
  },
  ]

  openAreaArray: any[] = []

  constructor(private datePipe: DatePipe, private modalService: NgbModal,) { }

  ngOnInit() {
    this.today = this.datePipe.transform(new Date(), "yyyy-MM-dd");
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
    console.log(this.openAreaArray);
  }
  openModal(id: any) {
    this.images = '../../../assets/images/' + id + '.png';
    this.modalReference = this.modalService.open(this.confirmModal, { ariaLabelledBy: 'modal-basic-title', centered: true });
    this.modalReference.result.then((result: any) => {
    }, (reason: any) => {

    });

  }
}
