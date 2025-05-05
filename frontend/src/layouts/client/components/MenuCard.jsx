import React from 'react';
import { Card } from 'react-bootstrap';

export function MenuCard({object, setSelectedObject}) {
  return (
    <Card onClick={()=> setSelectedObject(object)}>
      <Card.Img variant="top" src={object.image} alt="..." />
      <Card.Body>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}