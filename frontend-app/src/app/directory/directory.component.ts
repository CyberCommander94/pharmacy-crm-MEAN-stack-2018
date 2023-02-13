import { Component, OnInit } from '@angular/core';
import { Directory } from '../models/directory'
import { HttpActionsService } from '../servises/http-actions/http-actions.service'
import { SharingDirectoryDataService } from '../servises/directory-servises/sharing-directory-data/sharing-directory-data.service'

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
  providers: [
    SharingDirectoryDataService,
    HttpActionsService
  ]})

export class DirectoryComponent implements OnInit {

  constructor(private sharingDirectoryDataService: SharingDirectoryDataService, 
              private httpActionsService: HttpActionsService
  ) { }
  
  directoryData: Directory;

  ngOnInit() {
    this.httpActionsService.getDirectoryData()
    .subscribe(directory => {
      this.directoryData = directory;
      this.sharingDirectoryDataService.changeDirData(this.directoryData);
      this.sharingDirectoryDataService.dirCurrentData.subscribe(dir => this.directoryData = dir);
    });
  }
}
