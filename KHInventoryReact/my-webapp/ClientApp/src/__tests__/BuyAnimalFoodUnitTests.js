import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  screen,
} from '@testing-library/react';
import BuyAnimalFood from '../Pages/BuyAnimalFood/BuyAnimalFood';
import '@testing-library/jest-dom/extend-expect';
import selectEvent from 'react-select-event'
import { Router } from 'react-router-dom';

import { createMemoryHistory } from 'history'
const history = createMemoryHistory();
const route = '/InventoryStatus'
history.push(route)

describe('<NewMessageForm />', () => {
  let getByTestId;

  afterEach(cleanup);

  describe('AnimalFoods loaded', () => {
    beforeEach(() => {
      ({ getByTestId } = render(<Router history={history}>
        <BuyAnimalFood />
      </Router>));

    });


    test('AnimalFoods loaded', () => {
      expect(screen.getByText("توضیحات")).toBeInTheDocument();
      expect(getByTestId("AnimalFoodId")).toBeInTheDocument();

      fireEvent.change(getByTestId("AnimalFoodId"), {    target: { value: "1" },  });

      expect(getByTestId('AnimalFoodId')).toHaveTextContent('سبوس')
      expect(getByTestId('AnimalFoodId')).toHaveValue('1')


      expect(getByTestId("PerUnitPrice")).toHaveValue(15000);
      expect(getByTestId("PerUnitPriceMoney")).toHaveTextContent('15,000');
      expect(getByTestId("TotalPrice")).toHaveValue(0);


      fireEvent.change(getByTestId("Quan"), {    target: { value: 15 },  });


      expect(getByTestId("TotalPrice")).toHaveValue(15000*15);


      fireEvent.click(getByTestId("submitBuyAnimalFood"));


    //  expect(getByTestId("InventoryStatus")).toHaveTextContent('InventoryStatus');

      







    });
 
  });
});
