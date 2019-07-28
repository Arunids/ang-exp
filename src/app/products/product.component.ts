import { Component, OnInit } from '@angular/core';
import { WebService } from '../shared/services/web.service';
import { ToastService } from '../shared/services/toast.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  upload: string = 'none';
  visibility: any = {
    "listVisible": false,
    "createVisible": false
  }
  product: any = {
    id: 0,
    code: "",
    name: "",
    category_id: "",
    price: 0,
    description: "",
    image: ""
  }
  image_public_id: string = "";
  dataList: any[] = [];
  productList: any[] = [];
  productCategoryList: any[] = [];
  constructor(private webService: WebService, private toast: ToastService) { }

  ngOnInit() {
    this.listProduct();
  }
  listProduct() {

    this.webService.listItem('/api/product', (data: any) => {
      if (data && data.Response.length) {
        this.productList = data.Response;
        data.Response = data.Response.map((v: any) => {
          return {
            id: v.id,
            image: v.image,
            name: v.name,
            code: v.code,
            price: v.price,
            category_name: v.category_name
          }
        });
        this.dataList = data.Response;
       
      }else {
        this.dataList = [];
      }
      this.showVisibility(false, true);
      this.listProductCategory();
    });
    
  }
  listProductCategory() {
    this.webService.listItem('/api/products_category', (data: any) => {
      this.productCategoryList = data.Response;
    });
  }

  showCreate(flag: any) {
    this.product = {
      id: 0,
      code: "",
      name: "",
      category: "",
      price: 0,
      description: "",
      image: ""
    }
    this.upload = 'none';
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
    // if(1){
    //   console.log(this.product);
    //   return;
    // }
    // this.showVisibility(false, false);
    if (this.product.id == 0) {
      this.webService.createItem('/api/product/create', this.product, (data: any) => {
        if (data) {
          if (flag) {
            this.showCreate(false);
            this.listProduct();
          }
          else
            this.listProduct();
        }
      });
    }
    else {
      this.webService.updateItem('/api/product/' + this.product.id, this.product, (data: any) => {
        if (data) {
          this.toast.success("Product Updated Successfully..")
          this.listProduct();
        }
      });
    }
  }
  viewRow(rowData: any) {
    let list: any = this.productList.filter(v => v.id == rowData.id);
    list = list[0];
    // console.log(list);
    this.product.id = list.id;
    this.product.code = list.code;
    this.product.name = list.name;
    this.product.category_id = list.category_id;
    this.product.image = list.image;
    this.image_public_id = this.getPublicImageId(list.image);
    this.product.price = list.price;
    this.product.description = list.description;
    console.log(this.product.image_public_id);
    if (this.product.image) {
      this.upload = 'completed';
    } else {
      this.upload = 'none';
    }
    this.showVisibility(true, false);
    this.webService.setFocus('matcode');
  }
  getPublicImageId(image:string){
    if(!image) return '';
    return image.substring(image.lastIndexOf('/')+1,image.lastIndexOf('.'));
  }
  deleteRow(rowData: any) {
    this.webService.deleteItem('/api/product', rowData, (data: any) => {
      if (data) {
        this.toast.success("Product Deleted..");
        this.showVisibility(false, false);

        this.listProduct();
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
          this.product.image = data.Response.url;
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
    console.log(this.image_public_id);
    this.webService.deleteItem('/api/image/remove', [this.image_public_id], (data: any) => {
      if (data) {
        this.toast.success("Image removed..");
        this.upload = 'none';
      }
    })
  }
}
