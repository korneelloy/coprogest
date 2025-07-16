import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleLabel'
})
export class RoleLabelPipe implements PipeTransform {

  private labels: { [key: string]: string } = {
    "assistant": "Assistant",
    "coowner": "Copropriétaire",
    "manager": "Gestionnaire"
  };

  transform(value: string): string {
    return this.labels[value] || value;
  }
}
