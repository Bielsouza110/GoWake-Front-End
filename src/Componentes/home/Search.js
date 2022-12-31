import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {BsSearch} from "react-icons/bs";

function Search(){

    return (
        <div>
            <h4 id="tCards">Find by organisation</h4>
            <Form id="searh">
                <InputGroup >
                    <InputGroup.Text id="subscribeForm"><BsSearch/></InputGroup.Text>
                    <Form.Control
                        placeholder="Enter organisation name"
                    />
                </InputGroup>
            </Form>
            <ul className="list-group" id="searh">
                <li className="list-group-item">
                    <img src="https://st4.depositphotos.com/18672748/22408/v/450/depositphotos_224082266-stock-illustration-wakeboarding-icon-trendy-flat-vector.jpg"
                         width="3%"
                         alt=""/>
                     A.S.D Strikeskateevents</li>
                <li className="list-group-item">
                    <img src="https://st4.depositphotos.com/18672748/22408/v/450/depositphotos_224082266-stock-illustration-wakeboarding-icon-trendy-flat-vector.jpg"
                         width="3%"
                         alt=""/>
                    Batukaras Surf Club</li>
                <li className="list-group-item">
                    <img src="https://st4.depositphotos.com/18672748/22408/v/450/depositphotos_224082266-stock-illustration-wakeboarding-icon-trendy-flat-vector.jpg"
                         width="3%"
                         alt=""/>
                    Currumbin Alley Boardriders</li>
                <li className="list-group-item">
                    <img src="https://st4.depositphotos.com/18672748/22408/v/450/depositphotos_224082266-stock-illustration-wakeboarding-icon-trendy-flat-vector.jpg"
                         width="3%"
                         alt=""/>
                    Dunes Club Classic</li>
                <li className="list-group-item">
                    <img src="https://st4.depositphotos.com/18672748/22408/v/450/depositphotos_224082266-stock-illustration-wakeboarding-icon-trendy-flat-vector.jpg"
                         width="3%"
                         alt=""/>
                    Federação de Stand Up Paddle do Rio de Janeiro - FESUPRJ</li>
            </ul>
        </div>

    );

}

export default Search;