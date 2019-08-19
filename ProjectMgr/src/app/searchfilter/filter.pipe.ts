import { Pipe, PipeTransform } from '@angular/core';
import { TaskTable } from '../model/tasktable';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: TaskTable[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();

return items.filter( it => 
        it.projectid.toString().toLowerCase().indexOf(searchText) !== -1
    );

  }
}