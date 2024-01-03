import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
@Component({
  selector: 'app-job-status',
  templateUrl: './job-status.component.html',
  styleUrls: ['./job-status.component.css'],
})
export class JobStatusComponent implements OnInit {
  appliedJobs!: any[];

  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.candidateService.getAppliedJobs().subscribe((jobs) => {
      this.appliedJobs = jobs;
    });
  }

  getStatusColorClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'not seen':
        return 'bg-secondary text-white';
      case 'reviewing':
        return 'bg-warning text-white';
      case 'accepted':
        return 'bg-success text-white';
      default:
        return 'bg-light text-dark';
    }
  }
}
