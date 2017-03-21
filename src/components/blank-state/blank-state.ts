import { Component, Input } from '@angular/core';

/*
  Generated class for the BlankState component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'blank-state',
  templateUrl: 'blank-state.html'
})
export class BlankStateComponent {

  @Input() showIcon;
  @Input() iconName;
  @Input() src;
  @Input() msg;
  @Input() showSpinner;

  constructor() {
    
  }

}
