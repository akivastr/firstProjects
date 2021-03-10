import React from 'react';

export default function StockInfo(props) {
    let priceInfo = props.price ? <div><h3><span id="price">Price:{props.price}</span>  | Last Updated:{props.time}</h3></div> : null
    return (
        <>
            <h2>{props.name}</h2>
            <div>{props.description}</div>
            {priceInfo}
        </>
    )
}