import {Component} from '@angular/core';
import {TestCase} from '../../shared/models/test-case';
import {Status} from '../../shared/enums/status';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDragPreview,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {Card} from '../card/card';

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  cases: TestCase[];
}

@Component({
  selector: 'app-kanban-board',
  imports: [
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    CdkDragPreview,
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
  };

  // Weitere Test Cases hinzufügen für bessere Demo
  protected readonly testCase2: TestCase = {
    id: 2,
    title: 'Another Test Case',
    description: 'This is another test case for testing drag and drop.',
    requirementId: 103,
    status: Status.OPEN,
    testResult: null,
    createdBy: 2,
    updatedAt: new Date().toISOString(),
    creationDate: new Date().toDateString(),
  };

  columns: KanbanColumn[] = [
    {
      id: 'open',
      title: 'Open',
      color: 'bg-yellow-500',
      cases: [
        this.testCase,
        this.testCase2
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-blue-500',
      cases: []
    },
    {
      id: 'closed',
      title: 'Closed',
      color: 'bg-green-500',
      cases: []
    }
  ];

  // TODO: https://dribbble.com/shots/25080871-Task-Management-Saas-Web-App-Board-Task

  drop(event: CdkDragDrop<TestCase[]>) {
    console.log('Drop event triggered:', event); // Debug Log

    if (event.previousContainer === event.container) {
      // Reorder within same column
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('Moved within same column');
    } else {
      // Move between columns
      const task = event.previousContainer.data[event.previousIndex];
      console.log('Moving task between columns:', task);

      // Update task status based on target column
      const targetColumnId = event.container.id;
      switch (targetColumnId) {
        case 'open':
          task.status = Status.OPEN;
          // TODO: call partial update here
          break;
        case 'in-progress':
          task.status = Status.IN_PROGRESS;
          // TODO: call partial update here
          break;
        case 'closed':
          task.status = Status.CLOSED;
          // TODO: call partial update here
          break;
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log('Task moved and status updated to:', task.status);
    }
  }
}
