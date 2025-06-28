import { Component, OnInit } from '@angular/core';
import { DataService, DeviceType, ListData } from '../../../core/data.service';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.less'
})
export class ListComponent implements OnInit {

  // state
  public readonly Device = DeviceType.device;
  public readonly Material = DeviceType.material;

  public searchValue = '';
  public readonly selectOptions = [{ label: '全部', value: null }, { label: '仪器设备', value: DeviceType.device }, { label: '材料展示', value: DeviceType.material }];
  public selectionValue: DeviceType | null = null;

  public list$: Observable<ListData[]> = of([]);

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getDataList();
  }

  public onSelectionChange(value: DeviceType | null) {
    this.selectionValue = value;
    this.getDataList();
  }

  public onSearchChange(): void {
    this.getDataList();
  }

  private getDataList(): void {
    this.list$ = this.dataService.getList().pipe(
      map(res => {
        if (!!this.selectionValue) {
          return res.filter(item => item.type === this.selectionValue)
        }
        return res;
      }),
      map(res => {
        if (!!this.searchValue) {
          return res.filter(item => item.title.indexOf(this.searchValue) !== -1);
        }
        return res;
      })
    )
  }
}
