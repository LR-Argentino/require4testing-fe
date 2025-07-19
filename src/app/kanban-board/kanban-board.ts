import {Component} from '@angular/core';
import {TestCase} from '../../shared/models/test-case';
import {Status} from '../../shared/enums/status';
import {Card} from '../card/card';

@Component({
  selector: 'app-kanban-board',
  imports: [
    Card
  ],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.css'
})
export class KanbanBoard {
  protected readonly testCase: TestCase = {
    id: 1,
    title: 'Sample Test Case',
    description: 'This is a sample test case description.',
    requirementId: 102,
    status: Status.OPEN,
    testResult: null,
    createdBy: 2,
    updatedAt: new Date().toISOString(),
    creationDate: new Date().toDateString(),
    testRun: []
  };
}
