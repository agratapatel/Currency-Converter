import React from "react";
import "./App.css";
import "./index.css";
//import { Button } from 'react-bootstrap';
//import "bootstrap/dist/css/bootstrap.min.css";


export default function CurrencyRow(props) {

  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount
  } = props

    return (
      <div class="max-w-xl py-2 appearance-none">
        <div class="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            value={amount}
            onChange={onChangeAmount}
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 pl-5 pr-20 sm:text-sm border-black rounded-md"
          />

          <div class="absolute inset-y-0 right-0 flex items-center">
            <select
              value={selectedCurrency}
              onChange={onChangeCurrency}
              class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
            >
              {currencyOptions.map((option) => (
                <option key={option} value={option} class="px-2">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
}
