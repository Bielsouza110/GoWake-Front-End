import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import {Link} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import Typography from "@mui/material/Typography";

function Cards() {
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
                Main Competitions
            </Typography>
            <CardGroup>
                <Card style={{ borderRadius: "8px", overflow: "hidden"}}>

                {/*    <Card.Img href="/event" className="img-fluid" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSClMv4eadf7VRe52b2_ScM99_kLMatUj1RzSWnUjqrKFQbISxrXWlFcbwGpWZREn48tZU&usqp=CAU"/>
*/}
                    <Card.Body>
                        <a id="card" href="/event">
                        <Card.Title>Circuit Hale'iwa Open <span style={{backgroundColor: 'green'}} className="dot"/></Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in
                            to additional content. This content is a little bit longer.
                        </Card.Text>
                        </a>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
                <Card style={{ borderRadius: "8px", overflow: "hidden"}}>
              {/*      <Card.Img variant="top" src="https://cdn.algarvefun.com/wp-content/uploads/2020/01/10191152/wakebording-in-arma%C3%A7%C3%A3o-de-pera.jpg"/>
                   */} <Card.Body>
                        <Card.Title>Circuito Wake Contest <span style={{backgroundColor: 'green'}} className="dot"/></Card.Title>
                        <Card.Text>
                            This card has supporting text below as a natural lead-in to
                            additional content.{' '}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 10 mins ago</small>
                    </Card.Footer>
                </Card>
                <Card style={{ borderRadius: "8px", overflow: "hidden"}}>
                  {/*  <Card.Img variant="top" src="https://nagacp.com.br/wp-content/uploads/2015/04/30877804378_172ec7003f_o_1-1024x683.jpg"/>
                    */}<Card.Body>
                        <Card.Title>Pian Wake <span style={{backgroundColor: 'orange'}} className="dot"/></Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in
                            to additional content. This card has even longer content than the
                            first to show that equal height action.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 30 mins ago</small>
                    </Card.Footer>
                </Card>
                <Card style={{ borderRadius: "8px", overflow: "hidden"}}>
                   {/* <Card.Img variant="top" src="https://www.webconsultas.com/sites/default/files/styles/wch_image_schema/public/articulos/wakeboard_equilibrio.jpg"/>
                    */}<Card.Body>
                        <Card.Title>Pian wake <span style={{backgroundColor: 'gray'}} className="dot"/></Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in
                            to additional content. This card has even longer content than the
                            first to show that equal height action.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 1 day ago</small>
                    </Card.Footer>
                </Card>
            </CardGroup>
        </div>
    );
}

export default Cards;