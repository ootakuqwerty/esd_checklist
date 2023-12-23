import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('confirmationModal', { static: false })
  confirmModal!: ElementRef;

  modalReference: any;
  modalHeaderText = "";

  accessId = [
    {
      id: 0,
      name: "Super Admin"
    },
    {
      id: 1,
      name: "Admin"
    },
    {
      id: 2,
      name: "Auditor"
    },
    {
      id: 3,
      name: "User"
    },
  ]

  modalFields = {
    Username: "",
    Password: "",
    Fullname: "",
    AccessID: 0,
    IsDisabled: false,
    CreatedBy: "0",
    UpdatedBy: "0"
  }

  usersList: any
  constructor(private userService: UserService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.spinner.show();
    this.userService.userList().subscribe((data: any) => {
      this.usersList = data;
      console.log(this.usersList);
      this.spinner.hide();
    }, (error) => {
      console.log(error);
      this.toastr.error(error)
    })
  }

  findUserRole(id: any) {
    let access = this.accessId.find((access: any) => access.id == id)
    if (access != undefined) return access.name
    else return ""
  }

  openModal(item: any) {
    if (item == 0) {
      this.modalHeaderText = "Add User"
      this.modalFields.Username = "";
      this.modalFields.Password = "";
      this.modalFields.Fullname = "";
      this.modalFields.AccessID = 0;
      this.modalFields.IsDisabled = false;
    }
    else {
      this.modalHeaderText = "Update User"
      this.modalFields.Username = item.Username;
      this.modalFields.Password = item.Password;
      this.modalFields.Fullname = item.Fullname;
      this.modalFields.AccessID = item.AccessID;
      this.modalFields.IsDisabled = item.IsDisabled;
    }

    this.modalReference = this.modalService.open(this.confirmModal, { ariaLabelledBy: 'modal-basic-title', centered: true });
    this.modalReference.result.then((result: any) => {
      if (result) {
        this.modalFields.AccessID = Number(this.modalFields.AccessID)
        if (item == 0) {
          this.spinner.show();
          this.userService.addUser(this.modalFields).subscribe((data: any) => {
            this.toastr.success("Successfully added new user")
            this.getUser();
          }, (error) => {
            console.log(error);
            this.toastr.error(error)
          })
        } else { 
          this.spinner.show();
          this.userService.updateUser(item.UserID,this.modalFields).subscribe((data: any) =>{
            this.toastr.success("Successfully updated user")
            this.getUser();
          },(error: any) =>{
            console.log(error);
            this.toastr.error(error)
          })

        }
      } else { }
    }, (reason: any) => {

    });

  }
}
