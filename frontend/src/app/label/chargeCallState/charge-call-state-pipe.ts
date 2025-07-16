import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chargeCallState',
  standalone: true
})
export class ChargeCallStatePipe implements PipeTransform {

  private labels: { [key: string]: string } = {
    "to_be_sent": "A envoyer",
    "send": "Envoyé",
    "remainder": "Montant restant",
    "paid": "Payé",
  };

  transform(value: string): string {
    return this.labels[value] || 'Statut non défini.';
  }
}
