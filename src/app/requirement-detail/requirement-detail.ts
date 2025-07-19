import {Component} from '@angular/core';
import {Requirement} from '../../shared/models/requirement';
import {Priority} from '../../shared/enums/priority';
import {Status} from '../../shared/enums/status';

@Component({
  selector: 'app-requirement-detail',
  imports: [],
  templateUrl: './requirement-detail.html',
  styleUrl: './requirement-detail.css'
})
export class RequirementDetail {
  protected readonly mockRequirements: Requirement[] = [
    {
      id: 1,
      title: 'User Authentication System',
      description: 'Implement secure login and registration functionality',
      priority: Priority.MEDIUM,
      status: Status.OPEN,
      createdBy: 101,
      createdAt: new Date('2024-07-15T08:00:00'),
      updatedAt: new Date('2024-07-17T10:30:00')
    },
    {
      id: 2,
      title: 'Database Migration Tool',
      description: 'Create automated migration scripts for database updates',
      priority: Priority.MEDIUM,
      status: Status.OPEN,
      createdBy: 102,
      createdAt: new Date('2024-07-14T14:20:00'),
      updatedAt: new Date('2024-07-16T16:45:00')
    },
    {
      id: 3,
      title: 'API Documentation',
      description: 'Complete documentation for REST API endpoints',
      priority: Priority.MEDIUM,
      status: Status.OPEN,
      createdBy: 103,
      createdAt: new Date('2024-07-10T09:15:00'),
      updatedAt: new Date('2024-07-12T11:30:00')
    },
    {
      id: 4,
      title: 'Performance Optimization',
      description: 'Optimize database queries and improve response times',
      priority: Priority.MEDIUM,
      status: Status.OPEN,
      createdBy: 101,
      createdAt: new Date('2024-07-16T13:45:00'),
      updatedAt: new Date('2024-07-17T09:20:00')
    },
    {
      id: 5,
      title: 'Mobile Responsive Design',
      description: 'Ensure application works seamlessly on mobile devices',
      priority: Priority.MEDIUM,
      status: Status.OPEN,
      createdBy: 104,
      createdAt: new Date('2024-07-13T11:30:00'),
      updatedAt: new Date('2024-07-17T08:15:00')
    }
  ];
}
