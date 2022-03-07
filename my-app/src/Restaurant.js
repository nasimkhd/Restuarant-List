/*********************************************************************************
 * WEB422 – Assignment 3
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Nasim Khodapanah Student ID: 131929200  Date: _15th February________
 *
 *
 ********************************************************************************/
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardGroup } from "react-bootstrap";
import moment from "moment";

function Restaurant() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fast-garden-96600.herokuapp.com/api/restaurants/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.hasOwnProperty("_id")) {
          setRestaurant(data);
        } else {
          setRestaurant(null);
        }
        setLoading(false);
      });
  }, [id]);

  function restaurants() {
    if (loading) {
      return (
        <div>
          <Card>
            <Card.Body>
              <Card.Text>Loading Restaurants...</Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    } else {
      return (
        <div>
          <Card>
            <Card.Header>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Subtitle>
                {restaurant.address.building + " " + restaurant.address.street}
              </Card.Subtitle>
            </Card.Header>
          </Card>
          <br />
          <MapContainer
            style={{ height: "400px" }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
            ></Marker>
          </MapContainer>
          <br />
          <h1>Ratings</h1>

          <CardGroup>
            {restaurant.grades.map((rest, i) => {
              return (
                <Card key={`${i}`}>
                  <Card.Body>
                    <Card.Title>Grade: {rest.grade}</Card.Title>
                    <Card.Text>
                      Completed: {moment(rest.date).format("L")}
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </CardGroup>
        </div>
      );
    }
  }

  return restaurants();
}

export default Restaurant;
