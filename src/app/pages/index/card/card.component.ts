import { Component, Input, OnInit } from '@angular/core';
import { ListData } from '../../../core/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.less'
})
export class CardComponent implements OnInit {

  @Input({required: true}) list$!: Observable<ListData[]>;
  public hoverId: string | undefined;

  constructor() {}

  ngOnInit(): void {

  }

  public onMouseEnter(id: string): void {
    console.log('mouse enter');
    this.hoverId = id;
  }

  public onMouseOut(): void {
    console.log('mouse out');
    delete this.hoverId;
  }
}
