import { Component, OnInit } from '@angular/core';
import { Drug } from '../../models/drug';
import { User } from '../../models/user';
import { Directory } from '../../models/directory';
import { SharingDirectoryDataService } from '../../servises/directory-servises/sharing-directory-data/sharing-directory-data.service'
import { Router } from '@angular/router';
import { HttpActionsService } from '../../servises/http-actions/http-actions.service'

@Component({
  selector: 'app-directory-add',
  templateUrl: './directory-add.component.html',
  styleUrls: ['./directory-add.component.css']
})
export class DirectoryAddComponent implements OnInit {
  private title: string = "Довідник: додати препарат";
  private headBtnsVisibility: boolean = false;
  private newDrug: Drug;
  private currUser: User;
  private directory: Directory;
  private baseDirectory: Directory;
  
  constructor(private sharingDirectoryDataService: SharingDirectoryDataService,
              private router: Router,
              private httpActionsService: HttpActionsService
  ) { }

  ngOnInit() {
    this.newDrug = {} as Drug;
    this.sharingDirectoryDataService.dirCurrentData.subscribe(directory => this.directory = directory);
  }

  addItem(){
    this.httpActionsService.getDirectoryData()
    .subscribe(directory => {
      this.directory = directory;
      this.directory.editDate = new Date();
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));
      this.directory.editUser = this.currUser.name;
      this.httpActionsService.editDirectoryData(this.directory).subscribe(direct => {
        this.httpActionsService.addDrug(this.newDrug)
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