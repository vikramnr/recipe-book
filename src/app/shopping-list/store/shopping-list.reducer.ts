import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.action';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient( 'Apples', 112 ),
    new Ingredient( 'Tomatoes', 10 ),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer( state: State = initialState, action: ShoppingListAction.shoppingListActions ) {
  switch ( action.type ) {
    case ShoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListAction.UPDATE_INGREDIENTS:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updateIng = {
        ...ingredient,
        ...action.payload
      };
      const updateIngs = [...state.ingredients];
      updateIngs[state.editedIngredientIndex] = updateIng;
      return {
        ...state,
        ingredients: updateIngs,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListAction.DELETE_INGREDIENTS:
      return {
        ...state,
        ingredients: state.ingredients.filter( ( _, idx ) => idx !== state.editedIngredientIndex ),
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListAction.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
      };
    case ShoppingListAction.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    default:
      return state;
  }
}
