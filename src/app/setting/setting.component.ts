import { Component, OnInit } from '@angular/core';
import { WebService } from '../shared/services/web.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  upload: string = 'none';
  cloud_image_id:number = 0;
  visibility: any = {
    "listVisible": false,
    "createVisible": false,
    "settingList": false
  }
  setting: any = {
    id: 0,
    logo: "",
    website_title: "",
    website_subtitle: ""
  }
  selectedBanner: any = {
    id: 0,
    title: "",
    description: "",
    url: "",
    image: ""
  }
  image_public_id: string = "";
  dataList: any[] = [];
  imageList: any[] = [];
  constructor(private webService: WebService, private toast: ToastService) { }

  ngOnInit() {
    this.bannerList();
  }
  bannerList() {

    this.webService.listItem('banner', (data: any) => {
      if (data && data.Response.length) {

        data.Response = data.Response.map((v: any) => {
          return {
            id: v.id,
            image: v.image,
            title: v.title,
            description:v.description,
            url: v.url
          }
        });
        this.dataList = data.Response;

      } else {
        this.dataList = [];
      }
      this.showVisibility(false, true);

    });

  }


  showCreate(flag: any) {
    this.selectedBanner = {
      id: 0,
      title: "",
      description: "",
      url: "",
      image: ""
    }
    this.upload = 'none';
    this.showVisibility(true, false);
    this.webService.setFocus('matcode');
  }

  // showList(flag: any) {
  //   this.showVisibility(false, true);
  // }
  hideCreate() {
    this.showVisibility(false, true);
  }
  saveBanner(flag: boolean) {
    // if(1){
    //   console.log(this.banner);
    //   return;
    // }
    // this.showVisibility(false, false);
    let req :any = JSON.parse(JSON.stringify(this.selectedBanner));
    req.image = this.cloud_image_id;
    if (this.selectedBanner.id == 0) {
      this.webService.createItem('banner', req, (data: any) => {
        if (data) {
          if (flag) {
            this.showCreate(false);
            this.bannerList();
          }
          else
            this.bannerList();
        }
      });
    }
    else {
      this.webService.updateItem('banner/' + req.id, req, (data: any) => {
        if (data) {
          this.toast.success("Banner Updated Successfully..")
          this.bannerList();
        }
      });
    }
  }
  viewRow(rowData: any) {
    let list: any = this.dataList.filter(v => v.id == rowData.id);
    list = list[0];
    this.selectedBanner = {
      id: list.id,
      title: list.title,
      description: list.description,
      url: list.url,
      image: list.image
    };
    this.image_public_id = this.getPublicImageId(list.image);
   
   
    if (this.selectedBanner.image) {
      this.upload = 'completed';
    } else {
      this.upload = 'none';
    }
    this.showVisibility(true, false);
    this.webService.setFocus('matcode');
  }
  getPublicImageId(image: string) {
    if (!image) return '';
    return image.substring(image.lastIndexOf('/') + 1, image.lastIndexOf('.'));
  }
  deleteRow(rowData: any) {
    this.webService.deleteItem('banner', rowData, (data: any) => {
      if (data) {
        this.toast.success("Banner Deleted..");
        this.showVisibility(false, false);

        this.bannerList();
      }
    });
  }
  showVisibility(createFlag: boolean, listFlag: boolean) {
    this.visibility.listVisible = listFlag;
    this.visibility.createVisible = createFlag;
  }
  
  uploadImage(elem: any) {
    this.upload = 'started';
    let fileList: FileList = elem.target.files;
    let file: File = fileList[0];
    let formData = new FormData();
    formData.append("source_type","banner");
    formData.append("source_id","0");
    formData.append('image', file, file.name);
    elem.srcElement.value = null;
    this.webService.uploadToCloud(formData).subscribe(
      (data: any) => {
        // console.log(data);
        if (data.Status == "Success") {
          this.upload = 'completed';
          this.image_public_id = data.Response.public_id
          this.selectedBanner.image = data.Response.url;
          this.cloud_image_id = data.Response.current_inserted_id;
        } else {
          this.toast.error('Image upload failed');
          this.upload = 'none';
        }
      }, error => {
        this.toast.error('Image upload failed');
        this.upload = 'none';
      }
    )
  }
  removeImage() {
    this.webService.deleteItem('/api/image/remove', [this.image_public_id], (data: any) => {
      if (data) {
        this.toast.success("Image removed..");
      
        // this.showVisibility(true, false);
        // this.removeBannerImageDB()
      }else{
        this.toast.error("Image removed failed!!!");
      }
      this.upload = 'none';
      
      // this.removeBannerImageDB()
    })
  }
 
  // removeBannerImage(index: number) {
  //   console.log(this.imageList[index].image);
  //   let id = this.getPublicImageId(this.imageList[index].image);
  //   this.webService.deleteItem('/api/image/remove', [id], (data: any) => {
  //     console.log(id);
  //     if (data) {
  //       this.removeBannerImageDB(index);

  //     }else{
  //     this.toast.success("Image removed failed..");
  //     this.removeBannerImageDB(index);
  //     }
  //   })
  // }
  // removeBannerImageDB(){
  //   this.webService.deleteItem('/api/banner/'+ this.selectedBanner.id, "",(data1: any) => {
  //     this.toast.success("Image removed..");
  //   });
  // }

}
