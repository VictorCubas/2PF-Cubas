import { Injectable } from '@angular/core';
import { alumnos } from 'src/assets/data/alumnos.data';
import { Student } from './models';
import { BehaviorSubject, Observable, Subject, map, mergeMap, take } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private alumnos: Student[] = [];
  private alumnos$ = new BehaviorSubject<Student []>([]);

  constructor(private httpClient: HttpClient) { 
    //this.alumnos = alumnos;
    this.loadAlumnos();
  }

  loadAlumnos(): void{
    // this.alumnos$.next(this.alumnos)

    this.httpClient.get<Student []>(environment.baseApiUrl + '/students', {
      headers: new HttpHeaders({
        'token': '123456789'
      })
    }).subscribe({
      next: (response) => {
        // this.alumnos = response
        this.alumnos$.next(response);
      }
    });
  }

  getAlumnos(): Subject<Student[]>{
    return this.alumnos$;
  }

  createAlumno(alumno: Student): void{
    
    this.httpClient.post<Student>(environment.baseApiUrl + '/students', {...alumno})
    .pipe(
      mergeMap((userCreate) => this.alumnos$.pipe(
        take(1),
        map(
          (arrayActual) => [...arrayActual, userCreate])
        )
      )
    ).subscribe({
      next: (nuevoArray) => {
        // console.log(response);
        // this.alumnos = [...this.alumnos, response];
        this.alumnos$.next(nuevoArray);
      }
    });

  }

  updateAlumno(alumno: Student): void{
    // const index = this.alumnos.findIndex(a => a.id === alumno.id);

    // if (index !== -1) {
    //   // Actualizar el estudiante en el array
    //   this.alumnos[index] = alumno;

    //   //emitimos
    //   this.alumnos$.next(this.alumnos);
    // }

    this.httpClient.put(environment.baseApiUrl + '/students/' + alumno.id, alumno)
    .subscribe({
      next: () => this.loadAlumnos()
    })
  }

  deleteAlumnoById(id: number): void{
    this.httpClient.delete(environment.baseApiUrl + '/students/' + id)
    .pipe(
      mergeMap((usuarioEliminado) => this.alumnos$.pipe(
        take(1),
        map((arrayActual) => arrayActual.filter((u) => u.id !== id)
      )))
    ).subscribe({
      next: (arrayActualizado) => this.alumnos$.next(arrayActualizado)
    })
  }


  // this.alumnos$.pipe(take(1)).subscribe({
  //   next: (arrayActual) => {
      
  //   }
  // })

  getAlumnoById(id: number): Observable<Student | null> {
    return this.alumnos$.pipe(
      map(alumnos => alumnos.find(alumno => alumno.id === id) || null),
      take(1)
    );
  }
  
}
