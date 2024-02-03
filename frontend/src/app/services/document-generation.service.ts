import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentGenerationService {
  private apiUrl = 'https://ai-resume-generator.p.rapidapi.com/Documents';

  private headers = {
    'X-RapidAPI-Key': 'b7ce0def4fmsh1d6cbaf8e04552ep16cea3jsn4b3bac2477e0',
    'X-RapidAPI-Host': 'ai-resume-generator.p.rapidapi.com',
  };

  constructor() {}

  generateResume(
    university: string,
    degree: string,
    skills: string
  ): Observable<any> {
    const config: AxiosRequestConfig = {
      headers: this.headers,
      params: {
        university,
        degree,
        skills,
      },
    };

    return new Observable((observer) => {
      axios
        .get(`${this.apiUrl}/GenerateResume`, config)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  generateCoverLetter(
    jobTitle: string,
    jobDescription: string,
    university: string,
    degree: string,
    skills: string
  ): Observable<any> {
    const config: AxiosRequestConfig = {
      headers: this.headers,
      params: {
        jobTitle,
        jobDescription,
        university,
        degree,
        skills,
      },
    };

    return new Observable((observer) => {
      axios
        .get(`${this.apiUrl}/GenerateCoverLetter`, config)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
