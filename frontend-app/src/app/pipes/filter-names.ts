import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterNamesDrugs'
})
export class FilterNamePipe implements PipeTransform{
    transform(drugs: any[], filterStr: string): any[]{
        if (!filterStr) return drugs;
        return drugs.filter(drug =>{
            return drug.name.toLowerCase().includes(filterStr.toLowerCase());
        });
    }
}