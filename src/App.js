import React, { useEffect, useState } from 'react';
import './App.css';
import "./index.css";
//import { Button } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import CurrencyRow from "./CurrencyRow";
//import './logo.svg';
//import './logo512.png';

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = parseFloat(amount * exchangeRate).toFixed(2);
  } else {
    toAmount = amount
    fromAmount = parseFloat(amount / exchangeRate).toFixed(2);
  }

  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[26]
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(Object.keys(data.rates)[11]);
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  }, [])

  useEffect(() => {
    if (fromCurrency!=null  && toCurrency!=null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false)
  }

  return (
    <div class="bg-gray-100 h-screen">
      <div class="bg-indigo-500 w-full p-1" />
      <div class="max-w-lg mx-auto">
        <div class="flex justify-center pt-44 text-4xl font-medium">
          Currency Converter
        </div>
        <div class="justify-center py-12">
          <div class="flex justify-center p-3">
            <CurrencyRow
              currencyOptions={currencyOptions}
              selectedCurrency={fromCurrency}
              onChangeCurrency={(e) => setFromCurrency(e.target.value)}
              onChangeAmount={handleFromAmountChange}
              amount={fromAmount}
            />
          </div>

          <div class="flex justify-center p-3">
            <CurrencyRow
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={(e) => setToCurrency(e.target.value)}
              onChangeAmount={handleToAmountChange}
              amount={toAmount}
            />
          </div>
        </div>
      </div>
      <div class="fixed -bottom-0 bg-indigo-500 w-full p-2 text-center text-white font-mono text-sm">
        Made with 👻 by Agrata Patel |&nbsp;
        <a
          href="https://github.com/agratapatel/Currency-Converter"
          class="underline"
        >
          Github Source Code
        </a>
      </div>
    </div>
  );
}

export default App;
