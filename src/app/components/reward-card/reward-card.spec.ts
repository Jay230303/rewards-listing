import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardCard } from './reward-card';

describe('RewardCard', () => {
  let component: RewardCard;
  let fixture: ComponentFixture<RewardCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
