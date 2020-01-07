import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as  shoppingListActions from './store/shopping-list.action';

@Component( {
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
} )
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(
    private store: Store<fromShoppingList.AppState>,

  ) { }

  ngOnInit() {
    this.ingredients = this.store.select( 'shoppingList' );
  }

  onEditItem( index: number ) {
    // this.slService.startedEditing.next( index );
    this.store.dispatch( new shoppingListActions.StartEdit( index ) );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
