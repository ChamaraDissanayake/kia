import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingSuccessInquiryPage } from './booking-success-inquiry.page';

describe('BookingSuccessInquiryPage', () => {
  let component: BookingSuccessInquiryPage;
  let fixture: ComponentFixture<BookingSuccessInquiryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSuccessInquiryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingSuccessInquiryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
