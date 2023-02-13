import { Component, OnInit } from '@angular/core';
import { SharingDirectoryDataService } from '../../servises/directory-servises/sharing-directory-data/sharing-directory-data.service'
import { Drug } from '../../models/drug';
import { User } from '../../models/user';
import { Directory } from '../../models/directory';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { HttpActionsService } from '../../servises/http-actions/http-actions.service'

@Component({
  selector: 'app-directory-edit',
  templateUrl: './directory-edit.component.html',
  styleUrls: ['./directory-edit.component.css']
})
export class DirectoryEditComponent implements OnInit {

  private title: string = "Довідник: редагування препарату";
  private headBtnsVisibility: boolean = false;
  private drugId: string;
  private drug: Drug;
  private directory: Directory;
  private baseDirectory: Directory;
  private currUser: User;

  constructor(private sharingDirectoryDataService: SharingDirectoryDataService,
              private route: ActivatedRoute,
              private router: Router,
              private httpActionsService: HttpActionsService
  ) { }

  ngOnInit() {
    this.drugId = this.route.snapshot.paramMap.get('id');
    this.httpActionsService.getDrugItem(this.drugId)
    .subscribe(drugs => { 
      this.drug = drugs;
    });
  }

  editItem(){
    this.httpActionsService.getDirectoryData()
    .subscribe(directory => {
      this.directory = directory;
      this.directory.editDate = new Date();
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));
      this.directory.editUser = this.currUser.name;
      this.httpActionsService.editDirectoryData(this.directory).subscribe(direct => {
        this.httpActionsService.editDrug(this.drug, this.drugId)
        .subscribe(drug => {
          this.httpActionsService.getDirectoryData()
          .subscribe(dir => {
            this.baseDirectory = dir;
            this.sharingDirectoryDataService.changeDirData(this.baseDirectory);
            this.router.navigate(['/directory/main']);
          });
        });
      });  
    });
  }
}