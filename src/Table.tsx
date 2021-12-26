import { Box, Button, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { Edit as EditIcon } from '@mui/icons-material';
import { update } from "ramda"
import { Dispatch, SetStateAction, useState } from "react"

interface IProps {
    stocks: Stock[]
    setStocks: Dispatch<SetStateAction<Stock[]>>
}

const StockTable = ({ stocks, setStocks }: IProps) => {
    // const [targetPercentError, setTargetPercentError] = useState<Record<string, boolean>>()
    const totalAmount = stocks.reduce((pre, cur) => pre + +cur.amount, 0)
    const calcPercentage = (amount: number, totalAmount: number) => Math.round((amount / totalAmount) * 100)

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, stock: Stock, index: number) => {
        const newStocks = update(index, { ...stock, amount: e.target.value }, stocks)
        setStocks(newStocks)
    }

    const handlePercentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, stock: Stock, index: number) => {
        const newStocks = update(index, { ...stock, targetPercentage: e.target.value }, stocks)
        setStocks(newStocks)
    }

    const removeStock = (index: number) => {
        const newStockArray = stocks.filter((stock, i) => i !== index)
        setStocks(newStockArray)
    }

    const handleSave = () => {
        localStorage.clear()
        localStorage.setItem("stocks", JSON.stringify(stocks))
    }

    return (
        <Box sx={{ maxWidth: '50vw', margin: 'auto', marginTop: '15px' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f0f8ff' }}>
                            <TableCell>Stock</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Target Percentage</TableCell>
                            <TableCell>Actual Percentage</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stocks.map((stock, index) => (
                            <TableRow>
                                <TableCell>{stock.name}</TableCell>
                                <TableCell>
                                    <TextField
                                        variant="standard"
                                        onChange={(e) => handleAmountChange(e, stock, index)}
                                        value={stock.amount}
                                        InputProps={{ disableUnderline: true, endAdornment: <InputAdornment position="end"><EditIcon /></InputAdornment> }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        variant="standard"
                                        onChange={(e) => handlePercentChange(e, stock, index)}
                                        value={stock.targetPercentage}
                                        InputProps={{ disableUnderline: true, endAdornment: <InputAdornment position="end"><EditIcon /></InputAdornment> }}
                                    />
                                </TableCell>
                                <TableCell>{calcPercentage(+stock.amount, totalAmount) ?? ''}</TableCell>
                                <TableCell><Button onClick={() => removeStock(index)}>Remove</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button sx={{ mt: '10px', float: 'right' }} variant="contained" onClick={handleSave}>Save</Button>
        </Box>

    )
}

export default StockTable