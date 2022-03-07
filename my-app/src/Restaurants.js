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

import { useLocation } from "react-router-dom";
import queryString from "query-string";
import React, { useState, useEffect } from "react";
import { Card, Table, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Restaurants(props) {
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  let query = queryString.parse(useLocation().search);
  let location = query.borough;
  const navigate = useNavigate();

  useEffect(() => {
    let url;
    if (location) {
      url = `https://fast-garden-96600.herokuapp.com/api/restaurants/?page=${page}&perPage=${perPage}&borough=${location}`;
    } else {
      url = `https://fast-garden-96600.herokuapp.com/api/restaurants/?page=${page}&perPage=${perPage}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
      });
  }, [page, location]);

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    setPage(page + 1);
  }

  if (!restaurants) {
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
    if (restaurants.length > 0) {
      return (
        <div>
          <Card>
            <Card.Body>
              <Card.Title>Restaurant List</Card.Title>
              <Card.Text>
                Full list of restaurants. Optionally sorted by borough
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cuisine</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((value) => (
                <tr
                  key={value._id}
                  onClick={() => {
                    navigate(`/Restaurant/${value._id}`);
                  }}
                >
                  <td>{value.name}</td>
                  <td>
                    {value.address.building} {value.address.street}
                  </td>
                  <td>{value.borough}</td>
                  <td>{value.cuisine}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev onClick={() => previousPage()} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={() => nextPage()} />
          </Pagination>
        </div>
      );
    } else {
      return (
        <div>
          <Card>
            <Card.Body>
              <Card.Text>No Restaurants Found</Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    }
  }
}

export default Restaurants;
