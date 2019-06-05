import { Directive , ElementRef,HostListener,Input} from '@angular/core';

@Directive({
  selector: '[appHighlighter]'
})
export class HighlighterDirective {
 

  @Input('appHighlighter') highlightColor: string ;

  constructor(public el:ElementRef) { 
   // el.nativeElement.style.backgroundColor="red";
  }



  highlight(color:string)
  {
      this.el.nativeElement.style.backgroundColor=color;
     
  }
  @HostListener('click', ['$event']) onClick($event){
    console.info('clicked: ' + $event);
    this.el.nativeElement.style.backgroundColor=this.highlightColor;
  }

  // @HostListener ('mouseenter') onMouseEnter()
  // {
  //   this.highlight(this.highlightColor || 'red');
  // }
  // @HostListener('mouseleave') onmouseleave()
  // {
  //   this.highlight(null);
  // }
  

}
