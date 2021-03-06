import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

declare var navigator: any;

@Component({
  selector: 'app-odoo-player',
  templateUrl: './odoo-player.component.html',
  styleUrls: ['./odoo-player.component.scss']
})
export class OdooPlayerComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('url') url: SafeUrl;
  // tslint:disable-next-line: no-input-rename
  @Input('server') server = '';
  // tslint:disable-next-line: no-input-rename
  @Input('db') db = '';
  // tslint:disable-next-line: no-input-rename
  @Input('user') user = '';
  // tslint:disable-next-line: no-input-rename
  @Input('pass') pass = '';
  @Output() log = new EventEmitter();

  public network = true;

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) { }

  public ngOnInit(): void {
    const this_ = this;

    this.renderer.listen('document', 'offline', () => { // Check OffLine listener
      console.log('Device is Offline - Odoo player');
      console.log(navigator.connection.type);
      this_.network = false;
    });

    this.renderer.listen('document', 'online', () => {  // Check OnLine listener
      console.log('Device is Online - Odoo player');
      console.log(navigator.connection.type);
      this_.network = true;
    });
  }

  public logOut(): void {
    this.log.emit();
  }

  public devMode(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.server + '/web/app?db=' + this.db + '&login=' + this.user +
    '&password=' + this.pass + '&debug=true');
  }

}
