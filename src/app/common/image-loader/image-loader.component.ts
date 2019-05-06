import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent implements OnInit {
  
  @Input() loader:string='../../assets/image/spinner.gif';
  @Input() height:number=32;
  @Input() width:number=32;
  @Input() image:string;

  isLoading:boolean;
  
  constructor() { 
    this.isLoading=true;
  }
  ngOnInit(){
    
  }

  hideLoader(){
    this.isLoading=false;
  }
}
