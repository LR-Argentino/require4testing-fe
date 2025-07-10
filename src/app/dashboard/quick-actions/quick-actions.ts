import {Component} from '@angular/core';
import {QuickAction} from '../../../shared/models/quick-action';

@Component({
  selector: 'app-quick-actions',
  imports: [],
  templateUrl: './quick-actions.html',
  styleUrl: './quick-actions.css'
})
export class QuickActions {
  actions: QuickAction[] = [
    {label: 'New Requirement', primary: true},
    {label: 'New Test Case', primary: false},
    {label: 'New Test Run', primary: true},
    {label: 'View Reports', primary: false}
  ];

  getButtonClass(primary: boolean): string {
    const baseClass = 'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ';

    if (primary) {
      return baseClass + 'bg-white text-gray-900 hover:bg-gray-100 hover:shadow-lg';
    } else {
      return baseClass + 'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600';
    }
  }

  onActionClick(action: string): void {
    console.log(`Action clicked: ${action}`);
  }
}
