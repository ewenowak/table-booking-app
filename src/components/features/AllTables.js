import { ListGroup, Button } from "react-bootstrap";
import { getAllTables } from "../../redux/tablesReducer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllTables = () => {
    const tables = useSelector(getAllTables);
    return (
        <ListGroup variant="flush">
        {tables.map( table =>
            <ListGroup.Item key={table.id} className="d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-center">
                    <h3>Table: {table.id}</h3>
                    <span className='mx-1'></span>
                    <span><b>Status:</b> {table.status}</span>
                </div>
                <Button as={Link} to={"/table/" + table.id}>Show more</Button>
            </ListGroup.Item>
        )}
        </ListGroup>
    );
}
export default AllTables;