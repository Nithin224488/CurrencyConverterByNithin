import {Option} from './styledComponents'


const CurrencyInput = props => {
    const { currency } = props

    return (
        <Option value={currency} >{currency}</Option>)

}
export default CurrencyInput