/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Autocomplete, Box, Button, InputAdornment, TextField } from "@mui/material"
import { useEffect, useState } from "react"

interface IProps {
    setStocks: React.Dispatch<React.SetStateAction<Stock[]>>
    stocks: Stock[]
}

const Test = ({ setStocks, stocks }: IProps) => {
    const [options, setOptions] = useState([])
    const [stockInput, setStockInput] = useState('')
    const [amountInput, setAmountInput] = useState<string>('')
    const [targetPercentage, setTargetPercentage] = useState('')
    const [targetPercentageError, setTargetPercentageError] = useState(false)
    const handleTargetPercentageChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTargetPercentage(e.target.value)
        const totalPercentage = stocks.reduce((pre, cur) => pre + +cur.targetPercentage, +e.target.value)
        if (totalPercentage > 100) {
            setTargetPercentageError(true)
        } else {
            setTargetPercentageError(false)
        }
    }

    useEffect(() => {
        (async () => getOptions())()
        const savedStocks = JSON.parse(localStorage.getItem("stocks") as string)
        setStocks(savedStocks)
    }, []);

    async function getOptions() {
        try {
            const response = await fetch(`https://api-v2.intrinio.com/companies?has_stock_prices=true&api_key=OmMwMzkxNmViMGNkYzk5Yzk4ODBhZmFmM2U1NWUzM2Mw`)
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const r = await response.json();
            console.log('the companies:', r.companies);
            setOptions(r.companies);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = () => {
        setStockInput('')
        setAmountInput('')
        setTargetPercentage('')
        setStocks([...stocks, { name: stockInput, amount: amountInput, targetPercentage }])
    }

    return (
        <Box mt="10px" height="70px" display="flex" justifyContent="center">
            <Autocomplete
                sx={{ width: '250px' }}
                onInputChange={(e, v) => setStockInput(v.toUpperCase())}
                options={options}
                getOptionLabel={(option: any) => option ? option.ticker : ''}
                inputValue={stockInput}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Enter a stock ticker here"
                    />
                )}
            />
            <TextField
                type="number"
                label="Enter dollar amount"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                onChange={(e) => setAmountInput(e.target.value)}
                value={amountInput}
            />
            <TextField
                error={targetPercentageError}
                helperText={targetPercentageError ? 'Amount exceeds 100%' : ''}
                type="number"
                label="Enter target percentage"
                onChange={(e) => handleTargetPercentageChange(e)}
                value={targetPercentage}
            />
            <Button disabled={targetPercentageError} onClick={handleClick} style={{ maxHeight: '55px', backgroundColor: 'rgb(128,128,242)' }} variant="contained">
                Add
            </Button>
        </Box>
    )
}

export default Test