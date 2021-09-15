import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DamageEstimateRespondPage } from './damage-estimate-respond.page';

describe('DamageEstimateRespondPage', () => {
  let component: DamageEstimateRespondPage;
  let fixture: ComponentFixture<DamageEstimateRespondPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DamageEstimateRespondPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DamageEstimateRespondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
