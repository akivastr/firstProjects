export default function TableInfo(props) {

    let name = props.price ? <td>{props.name}</td> : null;
    let sector = props.price ? <td>{props.sector}</td> : null;
    let price = props.price ? <td> {props.price}</td> : null;
    let time = props.price ? <td>{props.time}</td> : null;

    return (
        <>
            <tr>
                {name}
                {sector}
                {price}
                {time}
            </tr>
        </>
    )
}