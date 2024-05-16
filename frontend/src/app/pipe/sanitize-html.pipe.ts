import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private domSantizer:DomSanitizer){}
  transform(value:string):SafeHtml{
    return this.domSantizer.bypassSecurityTrustHtml(value);
  }

}
