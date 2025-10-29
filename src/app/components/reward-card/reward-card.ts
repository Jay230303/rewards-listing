import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reward } from '../../services/data';

@Component({
  selector: 'app-reward-card',
  imports: [CommonModule],
  templateUrl: './reward-card.html',
  styleUrl: './reward-card.scss',
})
export class RewardCard {
  @Input() reward!: Reward;

  get imageUrl(): string {
    return this.reward.display_img_url?.trim() || 'assets/images/placeholder.png';
  }

  get isOutOfStock(): boolean {
    return this.reward.quantity === 0;
  }

  get isLowStock(): boolean {
    return (
      this.reward.quantity !== null &&
      this.reward.low_quantity !== null &&
      this.reward.quantity <= this.reward.low_quantity &&
      this.reward.quantity > 0
    );
  }
}
