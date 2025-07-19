import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {TestCase} from '../../shared/models/test-case';

const STATUS_CLASSE = {
  'OPEN': 'bg-blue-500',
  'IN_PROGRESS': 'bg-yellow-500',
  'CLOSED': 'bg-green-500'
}

const STATUS_TEXT_CLASSE = {
  'OPEN': 'bg-blue-50 text-blue-700',
  'IN_PROGRESS': 'bg-yellow-50 text-yellow-700',
  'CLOSED': 'bg-green-50 text-green-700'
}

const STATUS_TEXT = {
  'OPEN': 'Open',
  'IN_PROGRESS': 'In Progress',
  'CLOSED': 'Closed'
}

@Component({
  selector: 'app-card',
  imports: [
    NgClass
  ],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input({required: true}) testCase!: TestCase;

  protected getStatusClasses(): string {
    return STATUS_CLASSE[this.testCase.status];
  }

  protected getStatusTextClasses(): string {
    return STATUS_TEXT_CLASSE[this.testCase.status];
  }

  protected getStatusText(): string {
    return STATUS_TEXT[this.testCase.status];
  }
}
