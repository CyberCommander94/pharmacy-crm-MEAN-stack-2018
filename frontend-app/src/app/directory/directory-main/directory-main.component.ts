import { Component, OnInit, Input } from '@angular/core';
import { SharingDirectoryDataService } from '../../servises/directory-servises/sharing-directory-data/sharing-directory-data.service'
import { Directory } from '../../models/directory';
import { Router } from '@angular/router';
import { HttpActionsService } from '../../servises/http-actions/http-actions.service'

@Component({
  selector: 'app-directory-main',
  templateUrl: './directory-main.component.html',
  styleUrls: ['./directory-main.component.css'],
})
export class DirectoryMainComponent implements OnInit {

  title: string = "Довідник препаратів";
  private headBtnsVisibility: boolean = true;
  private filterStr = {str: ""};
  private directory: Directory;
  private baseDirectory: Directory;
  private nameSort: string = "unactive-sort";
  private costSort: string = "unactive-sort";
  private dateSort: string = "unactive-sort";
  private topSort: boolean = false;

  constructor(private sharingDirectoryDataService: SharingDirectoryDataService,
              private router: Router,
              private httpActionsService: HttpActionsService
  ) { }
  
  editDrug(drugId){
    this.router.navigate(['directory/editItem/' + drugId]);
  }

  deleteDrug(drugId, drugName){
    let acc = confirm(`Ви дійсно хочете видалити препарат "${drugName}" з довідника?`);
    if(acc){
      this.httpActionsService.deleteDrug(drugId)
      .subscribe(drug => {
        this.httpActionsService.getDirectoryData()
        .subscribe(dir => {
        this.baseDirectory = dir;
        this.sharingDirectoryDataService.changeDirData(this.baseDirectory);
        this.router.navigate(['/directory/main']);
        });
      });
    } else {
      return;
    }
  }

  viewDrug(drugId){
    this.router.navigate(['directory/viewItem/' + drugId]);
  }

  private compareCostToTop(drugA: any, drugB: any) {
    return drugA.cost - drugB.cost;
  };

  private compareCostToBottom(drugA: any, drugB: any) {
    return drugB.cost - drugA.cost;
  };

  private compareDateToTop(drugA: any, drugB: any) {
    if(drugA.regDate > drugB.regDate){
      return 1;
    } else if(drugA.regDate < drugB.regDate){
      return -1;
    }
    return 0;
  };

  private compareDateToBottom(drugA: any, drugB: any) {
    if(drugA.regDate < drugB.regDate){
      return 1;
    } else if(drugA.regDate > drugB.regDate){
      return -1;
    }
    return 0;
  };

  private compareNameToTop(drugA: any, drugB: any) {
    if(drugA.name > drugB.name){
      return 1;
    } else if(drugA.name < drugB.name){
      return -1;
    }
    return 0;
  };

  private compareNameToBottom(drugA: any, drugB: any) {
    if(drugA.name < drugB.name){
      return 1;
    } else if(drugA.name > drugB.name){
      return -1;
    }
    return 0;
  };

  sortNameAct(directory: Directory){
    this.nameSort = "active-sort";
    this.costSort = "unactive-sort";
    this.dateSort = "unactive-sort";
    let mas = directory.drugs;
    if(this.topSort){
      mas.sort(this.compareNameToBottom);
      this.topSort = false;
    }
    else{
      mas.sort(this.compareNameToTop);
      this.topSort = true;
    }
    directory.drugs = mas;
    this.sharingDirectoryDataService.changeDirData(directory);
  }

  sortCostAct(directory: Directory){
    this.nameSort = "unactive-sort";
    this.costSort = "active-sort";
    this.dateSort = "unactive-sort";
    let mas = directory.drugs;
    if(this.topSort){
      mas.sort(this.compareCostToBottom);
      this.topSort = false;
    }
    else{
      mas.sort(this.compareCostToTop);
      this.topSort = true;
    }
    directory.drugs = mas;
    this.sharingDirectoryDataService.changeDirData(directory);
  }

  sortDateAct(directory: Directory){
    this.nameSort = "unactive-sort";
    this.costSort = "unactive-sort";
    this.dateSort = "active-sort";
    let mas = directory.drugs;
    if(this.topSort){
      mas.sort(this.compareDateToBottom);
      this.topSort = false;
    }
    else{
      mas.sort(this.compareDateToTop);
      this.topSort = true;
    }
    directory.drugs = mas;
    this.sharingDirectoryDataService.changeDirData(directory);
  }

  ngOnInit() {
    this.sharingDirectoryDataService.dirCurrentData.subscribe(directory => this.directory = directory);
  }
}
