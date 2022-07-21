import { Component } from '@angular/core';
import { AzureBlobStorageService } from './azure-blob-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appBlobs';
  
  picturesList:string[] = [];
  picturesDownloaded: string[] = []
  sas = ''

  constructor(private blobService:AzureBlobStorageService){}
  
  ngOnInit():void{
    this.reloadImagesList();
  }

  public setSas(event:any) {
    this.sas = event.target.value
  }

  public imageSelected(file:File){
    this.blobService.uploadImage(this.sas,file,file.name,()=>{
      this.reloadImagesList();
    })
  }

  public deleteImage(name:string){
    this.blobService.deleteImage(this.sas,name,()=>{
      this.reloadImagesList();
    })
  }

  private reloadImagesList(){
    this.blobService.listImages().then(list=>{
      this.picturesList = list;
    })
  }

  public downloadImage(name:string){
    this.blobService.downloadImage(name,blob=>{
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    })
  }

  
}
