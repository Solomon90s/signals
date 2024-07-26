import { Component, signal, computed, effect, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../interfaces/user-request';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css'],
})
export class PropertiesPageComponent implements OnDestroy, OnInit {

  public counter = signal(10);

  // * mutaciones
  public user = signal<User>({
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
  });

  public fullName = computed(
    () => ` ${this.user().first_name} ${this.user().last_name}`
  );

  // * Efectos signals
  public userChangedEffect = effect(() => {
    console.log(`${this.user().first_name} - ${this.counter()}`);
  });

  ngOnInit(): void {
    setInterval( () => {
      this.counter.update( current => current +1 );

      if ( this.counter() === 15 )

      // * Destruimos el efecto
      this.userChangedEffect.destroy();
    }, 1000);
  }

  ngOnDestroy(): void {}

  increaseBy(value: number) {
    this.counter.update((current) => current + value);
  }

  onFieldUpdated(field: keyof User, value: string) {
    this.user.update((current) => {
      // * Aquí vamos a modificar los campos
      switch (field) {
        case 'email':
          current.email = value;
          break;
        case 'avatar':
          current.avatar = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'id':
          current.id = Number(value);
          break;
        default:
          console.log('Valor no permitido');
          break;
      }
      return current;
    });
  }
}
