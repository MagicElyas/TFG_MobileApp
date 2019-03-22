import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import * as imagepicker from "nativescript-imagepicker";
import * as camera from "nativescript-camera";
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';

@Component({
  selector: 'ns-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
  moduleId: module.id,
})



export class SelectorComponent implements OnInit {
  imageAssets = [];
  imageSrc: any;
  isSingleMode: boolean = true;
  thumbSize: number = 80;
  previewSize: number = 300;
  imageTaken: ImageAsset;


  constructor(private page: Page) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  escoger_de_galeria(){
    let context = imagepicker.create({
      mode: "single"
    });
    this.startSelection(context);
  };

  tomar_foto(){
    let options = {
      width: 300,
      height: 300,
      keepAspectRatio: true,
      saveToGallery: false
  };
    
    camera.takePicture(options)
        .then(imageAsset => {
          this.imageTaken=imageAsset;
          console.log("imagen tomada");
          console.log(imageAsset);
        }).catch(err=>{
          console.log(err.message);
        });
  };

  private startSelection(context) {
    let that = this;
    context
      .authorize()
      .then(() => {
        that.imageAssets = [];
        that.imageSrc = null;
        return context.present();
      })
      .then((selection) => {
        console.log("Selection done: " + JSON.stringify(selection));
        that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;

        // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
        selection.forEach(function (element) {
          element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
          element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
        });

        that.imageAssets = selection;
        
      }).catch(function (e) {
        console.log(e);
      });
  };


}
