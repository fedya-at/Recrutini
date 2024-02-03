import { Component } from '@angular/core';
import { DocumentGenerationService } from '../services/document-generation.service';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.css'],
})
export class ResumesComponent {
  resumeData: {
    university: string;
    degree: string;
    skills: string;
  } = { university: '', degree: '', skills: '' };

  coverLetterData: {
    jobTitle: string;
    jobDescription: string;
    university: string;
    degree: string;
    skills: string;
  } = {
    jobTitle: '',
    jobDescription: '',
    university: '',
    degree: '',
    skills: '',
  };

  constructor(private documentGenerationService: DocumentGenerationService) {}

  generateResume(): void {
    this.documentGenerationService
      .generateResume(
        this.resumeData.university,
        this.resumeData.degree,
        this.resumeData.skills
      )
      .subscribe(
        (response) => {
          console.log('Generated Resume:', response);
        },
        (error) => {
          console.error('Error generating Resume:', error);
        }
      );
  }

  generateCoverLetter(): void {
    this.documentGenerationService
      .generateCoverLetter(
        this.coverLetterData.jobTitle,
        this.coverLetterData.jobDescription,
        this.coverLetterData.university,
        this.coverLetterData.degree,
        this.coverLetterData.skills
      )
      .subscribe(
        (response) => {
          console.log('Generated Cover Letter:', response);
        },
        (error) => {
          console.error('Error generating Cover Letter:', error);
        }
      );
  }
}
