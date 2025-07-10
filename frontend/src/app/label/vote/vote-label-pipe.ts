import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voteLabel'
})
export class VoteLabelPipe implements PipeTransform {

  private labels: { [key: string]: string } = {
    "for": "Pour",
    "against": "Contre",
    "abstention": "Abstention",
  };

  transform(value: string): string {
    return this.labels[value] || '-';
  }
}
