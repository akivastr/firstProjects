import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { update } from "ramda"
import { ChangeEventHandler, Dispatch, SetStateAction } from "react"

interface IProps {
    stocks: Stock[]
    setStocks: Dispatch<SetStateAction<Stock[]>>
}

const StockTable = ({ stocks, setStocks }: IProps) => {
    const totalAmount = stocks.reduce((pre, cur) => pre + +cur.amount, 0)
    const calcPercentage = (amount: number, totalAmount: number) => Math.round((amount / totalAmount) * 100)
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, stock: Stock, index: number) => {
        const newStocks = update(index, { ...stock, amount: e.target.value }, stocks)
        setStocks(newStocks)
    }
    return (
        <TableContainer sx={{ maxWidth: '50vw', margin: 'auto', marginTop: '15px' }} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow sx={{ bgcolor: '#f0f8ff' }}>
                        <TableCell>Stock</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Target Percentage</TableCell>
                        <TableCell>Actual Percentage</TableCell>
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
                                    InputProps={{ disableUnderline: true }}
                                />
                            </TableCell>
                            <TableCell>{stock.targetPercentage}</TableCell>
                            <TableCell>{calcPercentage(+stock.amount, totalAmount)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default StockTable