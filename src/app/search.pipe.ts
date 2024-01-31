import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // first arg should be the item which have to be transformed 
  // second arg - based on which the transformationhave to be done
  transform(allEmployee:any[], searchKey:string): any[] {
    const result:any = []

    if(!allEmployee || searchKey==""){
      return allEmployee
    }
    allEmployee.forEach((item:any)=>{
      // include returns boolean value
      if(item.name.trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
        result.push(item)
      }

    })
    return result;
  }

}
