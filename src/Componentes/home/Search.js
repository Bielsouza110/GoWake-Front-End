import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {BsSearch} from "react-icons/bs";
import Typography from "@mui/material/Typography";

function Search(){

    return (
        <div>
            <Typography
                variant="h6"
                noWrap
                id="tCards"
                sx={{
                    mr: 2,
                    display: {xs: 'flex', md: 'flex'},
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.0rem',
                    color: '#808080',
                    textDecoration: 'none',
                    alignItems: 'center'
                }}
            >
                Find by organisation
            </Typography>
            <Form id="searh1">
                <InputGroup >
                    <InputGroup.Text id="subscribeForm"><BsSearch/></InputGroup.Text>
                    <Form.Control
                        placeholder="Enter organisation name"
                    />
                </InputGroup>
            </Form>
            <ul className="list-group" id="searh2">
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
                    Federação de Stand Up Paddle</li>
            </ul>
        </div>

    );

}

export default Search;