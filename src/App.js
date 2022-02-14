import './App.css'
import CurrencyComponent from './components/CurrencyComponent'
import money from './img/money.png'
import { useEffect, useState } from 'react'

function App() {
  const [currencyChoice, setCurrencyChoice] = useState([])

  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('THB')

  const [amount, setAmount] = useState(1)
  const [exchangeRate, setExchangeRate] = useState(0)

  const [checkFormCurrency, setCheckFormCurrency] = useState(true)

  let formAmount, toAmount

  if (checkFormCurrency) {
    formAmount = amount
    toAmount = (amount * exchangeRate).toFixed(2)
  } else {
    toAmount = amount
    formAmount = (amount / exchangeRate).toFixed(2)
  }

  useEffect(() => {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyChoice([...Object.keys(data.rates)])
        setExchangeRate(data.rates[toCurrency])
      })
  }, [fromCurrency, toCurrency])

  const amountFromCurrency = (e) => {
    setAmount(e.target.value)
    setCheckFormCurrency(true)
  }

  const amountToCurrency = (e) => {
    setAmount(e.target.value)
    setCheckFormCurrency(false)
  }

  return (
    <div>
      <img src={money} alt='money-coverter' className='money-img' />
      <h1>Currency Coverter (API)</h1>
      <div className='container'>
        <CurrencyComponent
          currencyChoice={currencyChoice}
          selectCurrency={fromCurrency}
          changeCurrency={(e) => setFromCurrency(e.target.value)}
          amount={formAmount}
          onChangeAmount={amountFromCurrency}
        />
        <div className='equal'> = </div>
        <CurrencyComponent
          currencyChoice={currencyChoice}
          selectCurrency={toCurrency}
          changeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={amountToCurrency}
        />
      </div>
    </div>
  )
}

export default App
