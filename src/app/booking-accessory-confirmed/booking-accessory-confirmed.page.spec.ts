import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingAccessoryConfirmedPage } from './booking-accessory-confirmed.page';

describe('BookingAccessoryConfirmedPage', () => {
  let component: BookingAccessoryConfirmedPage;
  let fixture: ComponentFixture<BookingAccessoryConfirmedPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingAccessoryConfirmedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingAccessoryConfirmedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
