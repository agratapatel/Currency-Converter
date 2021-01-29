import React from "react";
//import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";


export default function CurrencyRow(props) {

  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount
  } = props

    return (
      <form class="row g-3">
        <div class="col-auto">
          <input type="number" class="form-control" value={amount} onChange={onChangeAmount}/>
        </div>
        <div class="col-auto">
          <select value={selectedCurrency} onChange={onChangeCurrency} class="form-control">
            {currencyOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </form>
    );
}
