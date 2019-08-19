import { Pipe, PipeTransform } from '@angular/core';
import { TaskCountDetails } from '../model/taskcountdetails';
@Pipe({
  name: 'projfilter'
})
export class ProjFilterPipe implements PipeTransform {
  transform(items: TaskCountDetails[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();

return items.filter( it => 
        it.projectid.toString().toLowerCase().indexOf(searchText) !== -1
    );

  }
}