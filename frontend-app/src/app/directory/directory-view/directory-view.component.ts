import { Component, OnInit } from '@angular/core';
import { SharingDirectoryDataService } from '../../servises/directory-servises/sharing-directory-data/sharing-directory-data.service'
import { Drug } from '../../models/drug';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpActionsService } from '../../servises/http-actions/http-actions.service';

@Component({
  selector: 'app-directory-view',
  templateUrl: './directory-view.component.html',
  styleUrls: ['./directory-view.component.css'],
})
export class DirectoryViewComponent implements OnInit {
  
  private title: String = "Довідник: препарат детально";
  private headBtnsVisibility: Boolean = false;
  private drug: Drug;
  private drugId: String;
  private analogs: any;

  constructor(private sharingDirectoryDataService: SharingDirectoryDataService,
              private route: ActivatedRoute,
              private httpActionsService: HttpActionsService
  ) { }

  ngOnInit() {

    this.drugId = this.route.snapshot.paramMap.get('id');

    this.httpActionsService.getDrugItem(this.drugId)
    .subscribe(drugs => { 
      this.drug = drugs;
      this.analogs = this.drug.analogs[0].split(",");
    });
  }
}
