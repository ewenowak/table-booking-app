import { Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTableById } from "../../redux/tablesReducer";


const Table = () => {
    const { id } = useParams();
    const tableData = useSelector(state => getTableById(state, parseInt(id)));
    
    return (
        <>
        <h1>Table {tableData.id} </h1>
       
       </>
    )
  }


export default Table;