import {Component, OnInit} from '@angular/core';
import {Priority} from '../../../shared/enums/priority';
import {Status} from '../../../shared/enums/status';
import {DatePipe, NgClass} from '@angular/common';
import {TestCase} from '../../../shared/models/test-case';

@Component({
  selector: 'app-requirement-table',
  imports: [
    NgClass,
    DatePipe,
  ],
  templateUrl: './test-case-table.html',
  styleUrl: './test-case-table.css'
})
export class TestCaseTable implements OnInit {
  protected modalVisible = false;

  protected Priority = Priority;
  protected Status = Status;

  protected isDrawerOpen = false;
  protected selectedRequirement: TestCase | null = null;


  ngOnInit(): void {
    // this.requirementService.getRequirements();
  }


  openRequirementDrawer(testCase: TestCase): void {
    this.selectedRequirement = testCase;
    this.isDrawerOpen = true;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
    this.selectedRequirement = null;
  }


  closeModal() {
    this.modalVisible = false;
  }
}
