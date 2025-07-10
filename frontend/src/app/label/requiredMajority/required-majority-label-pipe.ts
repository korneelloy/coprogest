import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requiredMajorityLabel',
  standalone: true
})
export class RequiredMajorityLabelPipe implements PipeTransform {

  private labels: { [key: string]: string } = {
    "24": "Article 24 - Majorité simple des voix exprimées (abstentions non prises en compte)",
    "25": "Article 25 - Majorité absolue requise (pas de second vote possible)",
    "25-1": "Article 25-1 - Second vote possible à la majorité simple, si le quorum est atteint",
    "26": "Article 26 - Double majorité : au moins 2/3 des voix de tous les copropriétaires ET la majorité en nombre des copropriétaires présents ou représentés",
    "unanimity": "Article 26-1 - Unanimité de tous les copropriétaires requise",
    "no_vote": "Sans vote - Décision prise sans procédure de vote"
  };

  transform(value: string): string {
    return this.labels[value] || value;
  }
}
