import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusLabel'
})
export class StatusLabelPipe implements PipeTransform {

  private labels: { [key: string]: string } = {
    "accepted": "Cette résolution a été définitivement adoptée.",
    "rejected": "Cette résolution a été définitivement rejetée.",
  };

  transform(value: string): string {
    return this.labels[value] || 'Statut non défini.';
  }
}
