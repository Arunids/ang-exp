import { Component, OnInit } from '@angular/core';
import { WebService } from '../shared/services/web.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  upload: string = 'none';
  image_public_id: string = "";
  visibility: any = {
    "listVisible": false,
    "createVisible": false
  }
  category: any = {
    id: 0,
    code: "",
    name: ""
  }
  dataList: any[] = [];
  constructor(private webService: WebService, private toast: ToastService) { }

  ngOnInit() {
    this.listProductCategory();
  }
  listProductCategory() {
    // this.showVisibility(false, false);
    this.webService.listItem('/api/products_category', (data: any,message:string) => {
      if(data && data.Response.length){
      data.Response = data.Response.map((v: any) => {
        return {
          id: v.id,
          code: v.code,
          name: v.name,
          image: v.image
        }
      });
      this.dataList = data.Response;
    }
    else {
      this.dataList = [];
    }
    this.showVisibility(false, true);

    });
  }

  showCreate(flag: any) {
    this.category = {
      id: 0,
      code: "",
      name: "",
      image:""
    }
    this.showVisibility(true, false);
    this.webService.setFocus('matcode');
  }

  showList(flag: any) {
    this.showVisibility(false, true);
  }
  hideCreate() {
    this.showVisibility(false, true);
  }
  save(flag: boolean) {
    
    if (this.category.id == 0) {
      this.webService.createItem('/api/products_category/create', this.category, (data: any) => {
        if (data) {
          if (flag) {
            this.showCreate(false);
          }
          else
            this.listProductCategory();
        }
      });
    }
    else {
      this.webService.updateItem('/api/products_category/' + this.category.id, this.category, (data: any) => {
        if (data) {
          this.toast.success("Product Category Updated Successfully..")
          this.listProductCategory();
        }
      });
    }
  }
  viewRow(rowData: any) {
    console.log(rowData);
    this.category = {
      id: rowData.id,
      code: rowData.code,
      name: rowData.name,
      image:rowData.image
    }
    this.upload = 'completed'
    this.showVisibility(true, false);
    this.webService.setFocus('matcode');
  }
  deleteRow(rowData: any) {
    this.webService.deleteItem('/api/products_category/', rowData, (data: any) => {
      if (data) {
        this.toast.success("Product Category Deleted..");
        this.showVisibility(false, false);

        this.listProductCategory();
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

    formData.append('image', file, file.name);
    elem.srcElement.value = null;
    this.webService.uploadToCloud(formData).subscribe(
      (data: any) => {
        // console.log(data);
        if (data.Status == "Success") {
          this.upload = 'completed';
          this.image_public_id = data.Response.public_id
          this.category.image = data.Response.url;
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
      this.toast.success("Image removed..");
        this.upload = 'none';
    })
  }
}