import {Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";
import {ETaskStatus} from "../interfaces/manage-task.interface";

interface ITaskStatus {
  pending: string;
  onwork: string;
  done: string;
}
@Directive({
  selector: '[appStatusColor]'
})
export class StatusColorDirectve implements OnInit {

  @Input('statusValue') statusVal!: string;
  @Input('statusBgColor') statusBgColor: string = '';
  @Input('statusColor') statusColor: string = '';

  bdColors: ITaskStatus = {
    [ETaskStatus.Pending]: 'grey',
    [ETaskStatus.OnWork]: 'green',
    [ETaskStatus.Done]: 'blue',
  }

  textColors: ITaskStatus = {
    [ETaskStatus.Pending]: 'white',
    [ETaskStatus.OnWork]: 'white',
    [ETaskStatus.Done]: 'white',
  }
  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    console.log(this.el.nativeElement);
    console.log(this.statusVal);
    // background-color: beige; padding: 5px 10px; border: 1px solid red; border-radius: 10px;
    this.renderer.setStyle(this.el.nativeElement,
      'background-color',this.statusBgColor ? this.statusBgColor : this.bdColors[this.statusVal as keyof ITaskStatus]);
    this.renderer.setStyle(this.el.nativeElement,
      'padding', '5px 10px');
    this.renderer.setStyle(this.el.nativeElement,
      'border-radius', '10px');
    this.renderer.setStyle(this.el.nativeElement,
      'color', this.statusColor ? this.statusColor : this.textColors[this.statusVal as keyof ITaskStatus]);
  }

}
