
import { Component } from 'react'
import Loader from 'react-loader-spinner'
import CurrencyInput from '../CurrencyInput'

import Header from'../Header'


import {
  AppContainer, Heading,
  ConverterContainer,
  Card, Select, CurrencyHeading, SelectContainer,
  Input,Result,LoaderContainer,FailureContainer,
  FailureImage,FailureHeading,FailureDescription
} from './styledComponents'


const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CurrenctConverter extends Component {
  state = { currencyOptions: [], fromAmount: 0, toAmount1: 0,toAmount2:0, fromCurrency: '', toCurrency1: '', toCurrency2: '',currencyNames: {} ,apiStatus: apiStatusConstants.initial,}

  componentDidMount() {
    this.getCurrencyData()
  }

  getCurrencyData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const response = await fetch('https://api.frankfurter.app/currencies')
    const data = await response.json()
  
    if (response.ok){
     
      this.setState({ currencyOptions: Object.keys(data), fromCurrency: Object.keys(data)[0], 
        toCurrency1: Object.keys(data)[0], toCurrency2: Object.keys(data)[0], currencyNames: data, apiStatus: apiStatusConstants.success, })
    }else{
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
    
  }

  setFromCurrency = event => {
    this.setState({ fromCurrency: event.target.value }, this.getCurrencyConversion)
  }

  setToCurrency1 = event => {
    console.log(event.target.value)
    this.setState({ toCurrency1: event.target.value }, this.getCurrencyConversion)
  }

  setToCurrency2 = event => {
    console.log(event.target.value)
    this.setState({ toCurrency2: event.target.value }, this.getCurrencyConversion)
  }

  setFromAmount = event => {
    this.setState({ fromAmount: event.target.value }, this.getCurrencyConversion)
  }

  getCurrencyConversion = async () => {
    const { fromCurrency, fromAmount, toCurrency1, toCurrency2} = this.state
    if (parseInt(fromAmount) === 0) {
      this.setState({ toAmount1: 0 ,toAmount2: 0 })
    } else if (fromAmount === '') {
      this.setState({ toAmount1: 0 ,toAmount2: 0 })
    } else if (fromCurrency === toCurrency1 && fromCurrency===toCurrency2) {
      alert("All currencies selected are same. Change any one currencies to get result.")
      this.setState({fromAmount:0, toAmount1: 0 ,toAmount2: 0 })
    } else {
      const respone = await fetch(`https://api.frankfurter.app/latest?amount=${fromAmount}&from=${fromCurrency}&to=${toCurrency1},${toCurrency2}`)
      const data = await respone.json()
      this.setState({ toAmount1: Object.values(data.rates)[0] ,toAmount2:Object.values(data.rates)[1]})
      console.log(Object.values(data.rates)[0])
    }

  }

  renderCurrencyConverterSuccessView=()=>{

    const { currencyOptions, fromAmount, toAmount1,toAmount2 ,fromCurrency, toCurrency1,toCurrency2, currencyNames } = this.state

    return (
      <>
       <Header/>
      <AppContainer >
       
        <Heading>Currency Converter</Heading>
        <ConverterContainer >
          <Card >
            <SelectContainer >
              <CurrencyHeading>From Currency : </CurrencyHeading>
              <Select onChange={this.setFromCurrency}>
                {
                  currencyOptions.map(currency => (<CurrencyInput key={currency} currency={currency} />))
                }
              </Select>

            </SelectContainer>
            <h2>Enter Amount in {currencyNames[`${fromCurrency}`]} : </h2>
            <Input type="number" autoComplete="off" value={fromAmount} onChange={this.setFromAmount} />
            <Result>{fromAmount} {fromCurrency} </Result>
          
          </Card>
          <Card>
          <SelectContainer>
              <CurrencyHeading>To Currency 1: </CurrencyHeading>
              <Select onChange={this.setToCurrency1}>
                {
                  currencyOptions.map(currency => (<CurrencyInput key={currency} currency={currency} />))
                }
              </Select>

            </SelectContainer>
           
            <h2>Output 1 in {currencyNames[`${toCurrency1}`]} : </h2>
            <Input  disabled value={toAmount1} type="text" />
            <Result> {toAmount1} {toCurrency1}</Result>
            
          </Card>
          <Card>

          <SelectContainer>
              <CurrencyHeading>To Currency 2: </CurrencyHeading>
              <Select onChange={this.setToCurrency2}>
                {
                  currencyOptions.map(currency => (<CurrencyInput key={currency} currency={currency} />))
                }
              </Select>

            </SelectContainer>
          <h2>Output 2 in {currencyNames[`${toCurrency2}`]} : </h2>
            
           
            
            <Input  disabled value={toAmount2} type="text" />
            <Result> {toAmount2} {toCurrency2}</Result>
          </Card>
        
        </ConverterContainer>
      </AppContainer>
      </>
    )

  }


  renderFailureView = () => (
    <FailureContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
       
      />
      <FailureHeading>
        Oops! Something Went Wrong
      </FailureHeading>
      <FailureDescription>
        We are having some trouble processing your request. Please try again.
      </FailureDescription>
    </FailureContainer>
  )


  renderLoadingView = () => (
    <LoaderContainer>
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </LoaderContainer>
  )


  renderCurrencyConverter = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCurrencyConverterSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }


  render() {

    return(
      this.renderCurrencyConverter()
    )
    
  }

}
export default CurrenctConverter