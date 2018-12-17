import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {
    transform(items: any[], text: string, campo:string): any {
    	// console.log(text);
		let filter = text?text.toLocaleLowerCase():'';
		return filter && items ? items.filter(item => item[campo].toLocaleLowerCase().indexOf(filter) != -1) : items;
    }
}