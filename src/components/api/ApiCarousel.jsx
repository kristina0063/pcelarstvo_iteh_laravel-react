import React, { useEffect, useState } from "react";
import { Carousel, Card } from "react-bootstrap";
import axiosClient from "../../axios/axios-client";

const ApiCarousel = () => {
    const [zanimljivosti,setZanimljivosti] = useState([]);
  useEffect(() => {

    const fetchzanimljivosti = async () =>{
        const response = await axiosClient.get("zanimljivosti");
        setZanimljivosti(response.data);
        console.log(zanimljivosti);
    }

    fetchzanimljivosti();
  }, []);

  return (
    <div className="w-100 d-flex justify-content-center my-4">
      <Carousel interval={3000} style={{ maxWidth: "400px", width: "100%" }}>
        {zanimljivosti.map((z, index) => (
          <Carousel.Item key={index}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>{z.author}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                   {z.quote}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ApiCarousel;
