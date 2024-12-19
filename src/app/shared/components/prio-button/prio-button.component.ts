import { Component, inject, Input } from '@angular/core';
import { PrioService } from '../../services/prio.service';

@Component({
  selector: 'app-prio-button',
  standalone: true,
  imports: [],
  templateUrl: './prio-button.component.html',
  styleUrl: './prio-button.component.scss',
})
export class PrioButtonComponent {
  prioData: PrioService = inject(PrioService);

  img: string = 'prio_urgent';
  @Input() id: string = 'urgent';

  ngOnInit() {
    this.img = `prio_${this.id}`;
  }

  select() {
    this.prioData.clear();
    this.prioData.set(this.id);
  }

  name() {
    let initial = this.id[0];
    return this.id.replace(initial, initial.toUpperCase());
  }

  source() {
    return `../../../assets/img/add-task/${this.img}.png`;
  }
}
