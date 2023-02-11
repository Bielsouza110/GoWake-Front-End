import Carousel from 'react-bootstrap/Carousel';


function DemoCarouse() {

    return (
        <div >
            <Carousel fade id="bg1">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345767/demo_image2.jpg"
                        width="20%"
                        height="5%"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://wowslider.com/sliders/demo-93/data1/images/sunset.jpg"
                        width="20%"
                        height="20%"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://demos.creative-tim.com/marketplace/material-kit-pro/assets/img/bg2.jpg"
                        width="20%"
                        height="20%"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>

    );
}

export default DemoCarouse;