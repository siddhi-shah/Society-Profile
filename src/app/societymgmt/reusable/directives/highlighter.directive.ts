import { Directive , ElementRef,HostListener,Input} from '@angular/core';

@Directive({
  selector: '[appHighlighter]'
})
export class HighlighterDirective {
 

  @Input('appHighlighter') highlightColor: string ;

  constructor(public el:ElementRef) { 
  }



  highlight(color:string)
  {
      this.el.nativeElement.style.backgroundColor=color;
  }
  @HostListener('click', ['$event']) onClick($event){
    this.el.nativeElement.style.backgroundColor=this.highlightColor;
  }

}
