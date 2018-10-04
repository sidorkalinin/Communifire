import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  
  /**
   * Filter an Object with key (searchKeyword) and value (searchText) to check
   * @param items Array to filter
   * @param searchText Value to check
   * @param searchKeyword Key to check
   */
  transform(items = [], searchText: string, searchKeyword: string) {

    if (searchText && items.length && searchKeyword) {
      return items.filter((item) => {
        return item[searchKeyword].toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      })
    } else {
      return items;
    }
  }
}
