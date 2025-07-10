import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateLabel'
})
export class StateLabelPipe implements PipeTransform {

  private labels: { [key: string]: string } = {
    "to_be_paid": "À payer",
    "contested": "Facture en litige",
    "paid": "Payé"
  };

  transform(value: string): string {
    return this.labels[value] || value;
  }
}
