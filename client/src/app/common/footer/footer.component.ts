import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  dateNow: string = "";

  ngOnInit() {
    this.dateNow = this.getDate().toString();
  }

  private getDate() {
    return new Date().getFullYear();
  }

}
