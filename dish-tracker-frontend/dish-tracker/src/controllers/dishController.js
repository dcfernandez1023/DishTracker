import { v4 as uuidv4 } from 'uuid';

/*
  controller method to create new dish; can be modified in the future to call an api that interfaces with a database
*/
export function createDish(currentDishes, newDish, callback, callbackOnError) {
  try {
    newDish.id = generateId();
    currentDishes.push(newDish);
    callback(currentDishes);
  }
  catch(error) {
    callbackOnError(error);
  }
}

/*
  controller method to delete an existing dish; can be modified in the future to call an api that interfaces with a database
*/
export function deleteDish(currentDishes, deleteDishId, callback, callbackOnError) {
  try {
    for(var i = 0; i < currentDishes.length; i++) {
      let dish = currentDishes[i]
      if(dish.id === deleteDishId) {
        currentDishes.splice(i, 1);
        break;
      }
    }
    callback(currentDishes);
  }
  catch(error) {
    callbackOnError(error);
  }
}

function generateId() {
  return uuidv4 + new Date().getTime().toString();
}
