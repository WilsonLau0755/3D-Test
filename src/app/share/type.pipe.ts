import { Pipe, PipeTransform } from "@angular/core";
import { DeviceType } from "../core/data.service";

@Pipe({
  name: 'typePipe',
  standalone: true
})
export class TypePipe implements PipeTransform {

  transform(value: DeviceType): string {
    return this.labelEnum[value];
  }

  public readonly labelEnum = {
    [DeviceType.device]: '仪器设备',
    [DeviceType.material]: '材料展示'
  }
}
