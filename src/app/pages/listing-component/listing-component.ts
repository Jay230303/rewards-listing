import { Component, OnInit } from '@angular/core';
import { Data, Reward } from '../../services/data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RewardCard } from '../../components/reward-card/reward-card';

@Component({
  selector: 'app-listing-component',
  imports: [CommonModule, FormsModule, RewardCard],
  templateUrl: './listing-component.html',
  styleUrl: './listing-component.scss',
})
export class ListingComponent implements OnInit {
  rewards: Reward[] = [];
  filtered: Reward[] = [];
  paginated: Reward[] = [];

  query = '';
  sortPanelOpen = false;
  categories = ['e-Voucher', 'Products', 'Evergreen', 'Fashion & Retail','Food'];
  selectedCategories: string[] = [];
  appliedFilters: string[] = [];
  openCategory: string | null = null;

  // 🧭 Pagination
  currentPage = 1;
  itemsPerPage = 20;
  totalPages = 0;

  constructor(private dataService: Data) {}

  ngOnInit(): void {
    this.rewards = this.dataService.getRewards();
    this.filtered = [...this.rewards];
    this.updatePagination();
  }

  /** 🔍 Search and Filter */
  search(): void {
    this.applyFilters();
  }

  toggleCategoryGroup(cat: string): void {
    this.openCategory = this.openCategory === cat ? null : cat;
  }

  toggleCategory(cat: string): void {
    if (this.selectedCategories.includes(cat)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== cat);
      this.appliedFilters = this.appliedFilters.filter(f => f !== cat);
    } else {
      this.selectedCategories.push(cat);
      this.appliedFilters.push(cat);
    }
    this.applyFilters();
  }

  toggleFilter(filter: string): void {
    if (this.appliedFilters.includes(filter)) {
      this.appliedFilters = this.appliedFilters.filter(f => f !== filter);
    } else {
      this.appliedFilters.push(filter);
    }
    this.applyFilters();
  }

  /** 🧠 Core Filtering */
  applyFilters(): void {
    const searchText = this.query.toLowerCase();

    this.filtered = this.rewards.filter(r => {
      if (searchText && !r.name.toLowerCase().includes(searchText)) return false;
      // if (this.selectedCategories.length > 0 && !this.selectedCategories.includes(r.category)) return false;
      if (this.appliedFilters.includes('Below 1000 pts') && r.points > 1000) return false;
      if (this.appliedFilters.includes('Above 1000 pts') && r.points <= 1000) return false;
      return true;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  /** 🔁 Pagination Logic */
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filtered.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginated = this.filtered.slice(start, end);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
    this.scrollToTop();
    
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
      this.scrollToTop();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
      this.scrollToTop();
    }
  }

  removeFilter(filter: string): void {
    this.appliedFilters = this.appliedFilters.filter(f => f !== filter);
    this.selectedCategories = this.selectedCategories.filter(f => f !== filter);
    this.applyFilters();
  }

  clearAll(): void {
    this.query = '';
    this.appliedFilters = [];
    this.selectedCategories = [];
    this.filtered = [...this.rewards];
    this.currentPage = 1;
    this.updatePagination();
  }

  

  closeSortPanel(): void {
    this.sortPanelOpen = false;
  }

  sortBy(order: 'asc' | 'desc'): void {
    this.filtered.sort((a, b) =>
      order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    this.updatePagination();
    this.closeSortPanel();
  }


  selectedSort: 'asc' | 'desc' | null = null;

/** 🔹 Open/close sidebar */
toggleSortPanel(): void {
  this.sortPanelOpen = true;
}

/** 🔹 Reset sort selection */
resetSort(): void {
  this.selectedSort = null;
  this.sortPanelOpen = false;
}

/** 🔹 Apply selected sort order */
applySort(): void {
  if (this.selectedSort === 'asc') {
    this.filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (this.selectedSort === 'desc') {
    this.filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  this.currentPage = 1;
  this.updatePagination();
  this.toggleSortPanel(); // close sidebar
}

scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

}