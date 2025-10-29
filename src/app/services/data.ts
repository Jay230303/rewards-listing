import { Injectable } from '@angular/core';

export interface Reward {
  pk: number;
  name: string;
  points: number;
  display_img_url: string;
  quantity: number | null;
  valid_until: string;
  low_quantity: number | null;
  category: string | null;
}

@Injectable({ providedIn: 'root' })
export class Data {
  getRewards(): Reward[] {
    const rewards = [
    {
      pk: 1,
      name: 'Coffee Mug',
      points: 150,
      display_img_url: 'assets/images/mug.jpg',
      quantity: 14,
      valid_until: '2025-12-31',
      low_quantity: 10,
      category: 'Fashion & Retail'
    },
    {
      pk: 2,
      name: 'Wireless Earbuds',
      points: 2500,
      display_img_url: 'assets/images/earbuds.jpg',
      quantity: 2,
      valid_until: '2025-06-30',
      low_quantity: 5,
      category: 'Products',
    },
    {
      pk: 3,
      name: 'T-Shirt',
      points: 800,
      display_img_url: 'assets/images/tshirt.jpg',
      quantity: 0,
      valid_until: '2024-11-30',
      low_quantity: 5,
      category: 'Products',
    },
  ];

  // Generate more mock data automatically (total 50)
  for (let i = 4; i <= 50; i++) {
    rewards.push({
      pk: i,
      name: `Sample Reward ${i}`,
      points: Math.floor(Math.random() * 5000) + 100,
      display_img_url: 'assets/images/placeholder.jpg',
      quantity: Math.floor(Math.random() * 20),
      valid_until: `2025-${String(Math.floor(Math.random() * 12 + 1)).padStart(2, '0')}-${String(Math.floor(Math.random() * 28 + 1)).padStart(2, '0')}`,
      low_quantity: 5,
      category: ['Products', 'e-Voucher', 'Evergreen', 'Fashion & Retail'][Math.floor(Math.random() * 4)]
    });
  }

  return rewards;
  }
}