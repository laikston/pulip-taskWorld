import { Component, OnInit } from '@angular/core';
import { TaskBox } from '../task-box/task-box';
import { TaskFileBoxComponent } from '../task-file-box/task-file-box.component';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-task-file',
  templateUrl: './task-file.component.html',
  styleUrls: ['./task-file.component.css']
})
export class TaskFileComponent implements OnInit {
  public projectId: number;
  public taskId: number;
  public data: TaskBox;
  public files: UploadFile[] = [];
  constructor(
    private dataService: DataService
  ) { }
  ngOnInit() { }
  public dropped(event: UploadEvent){
    this.files = event.files;
    for (const droppedFile of event.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const formData = new FormData();
          if(console)  console.log(droppedFile.relativePath, file);
          
          formData.append('project_idx', String(this.projectId))
          formData.append('task_idx', String(this.taskId));
          formData.append('file', file, droppedFile.relativePath);
           
          this.dataService.addFile(formData, this.uploadFileComplete, this);           
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        if(console)  console.log(droppedFile.relativePath, fileEntry);
      }
    }    
  };
  uploadFileComplete(_data, _this){
    if(console)  console.log(_data);
  }
  
  public fileOver(event){
    if(console)  console.log(event);
  }
  public fileLeave(event){
    if(console)  console.log(event);
  }
}
