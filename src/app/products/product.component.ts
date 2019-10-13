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
    "createVisible": false,
    "productImageList": false
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
  imageList: any[] = [];
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

      } else {
        this.dataList = [];
      }
      this.listProductCategory();
      this.showVisibility(false, true);

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
    this.visibility.productImageList = false;
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
  getPublicImageId(image: string) {
    if (!image) return '';
    return image.substring(image.lastIndexOf('/') + 1, image.lastIndexOf('.'));
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
  addImageToProduct(elem: any) {
    // console.log(elem);
    this.visibility.productImageList = true;
    this.showVisibility(false, false);
    this.imageList = [];
    this.webService.listItem('/api/product/image/' + elem, (data: any) => {
      if (data && data.Response.length) {
        console.log(data.Response);

        this.imageList = data.Response.map((v: any) => {
          return {
            id:v.id,
            product_id:v.product_id,
            image: v.image,
            upload: v.image ? 'completed' : 'none'
          }
        });
        this.imageList.push({id:0,  product_id:elem,"image": "", "upload": "none" });
        
      } else {
        this.imageList.push({id:0,product_id:elem, "image": "", "upload": "none" });
      }

      // this.showVisibility(false, true);

    });

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
    this.webService.deleteItem('/api/image/remove', [this.image_public_id], (data: any) => {
      if (data) {
        this.toast.success("Image removed..");
        this.upload = 'none';
      }
    })
  }
  uploadProductImage(elem: any,index:number) {
    
    this.imageList[this.imageList.length - 1].upload = 'started';
    let fileList: FileList = elem.target.files;
    let file: File = fileList[0];
    let formData = new FormData();

    formData.append('image', file, file.name);
    elem.srcElement.value = null;
    this.webService.uploadToCloud(formData).subscribe((data: any) => {
        console.log(this.imageList[index]);
        if (data.Status == "Success") {
          console.log(data.Response.url);
          let reqJson = {
            product_id:this.imageList[index].product_id,
            image:data.Response.url,
            image_type:""
          }
          this.webService.createItem('/api/product/image', reqJson, (data1: any) => {
           
            this.imageList[this.imageList.length - 1].id = data1.Response;
            this.imageList[this.imageList.length - 1].upload = 'completed';
            this.imageList[this.imageList.length - 1].image = data.Response.url;
            this.imageList.push({id:0,product_id:this.imageList[index].product_id, "image": "", "upload": "none" });  
          });
         

        } else {
          this.toast.error('Image upload failed');
          this.imageList[this.imageList.length - 1].upload = 'none';
        }
      }, error => {
        this.toast.error('Image upload failed');
        this.imageList[this.imageList.length - 1].upload = 'none';
      }
    )
  }
  removeProductImage(index: number) {
    console.log(this.imageList[index].image);
    let id = this.getPublicImageId(this.imageList[index].image);
    this.webService.deleteItem('/api/image/remove', [id], (data: any) => {
      console.log(id);
      if (data) {
        this.removeProductImageDB(index);
      
      }else{
      this.toast.success("Image removed failed..");
      this.removeProductImageDB(index);
      }
    })
  }
  removeProductImageDB(index:number){
    this.webService.deleteItem('/api/product/image/'+ [this.imageList[index].id], "",(data1: any) => {
      this.toast.success("Image removed..");
      this.imageList.splice(index, 1);
    });
  }
}
