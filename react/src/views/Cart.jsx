import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'

function Cart() {

  let product = JSON.parse(localStorage.getItem('carrito'))

 
  return (
    <div className="container my-2">
      <div className="row">
        <div className="col-4">
          <ListGroup as="ol" numbered>
            {
              product.map(u => (
                <ListGroup.Item key={u.id} as='li' className="d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto overflow-hidden">
                    <div className="fw-bold">{u.name} - {u.category}</div>
                        {u.description}
                  </div>
                  <div className="ms-2 me-auto overflow-hidden">
                    <div data-price={u.price} className="fw-bold">${u.price}</div>
                  </div>
                    <Badge data-amount={u.ammount} bg="primary" pill>
                      {u.ammount}
                    </Badge>
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-12">
              <div className="fw-bold">
                
              </div>
            </div>
          </div>
        </div>
      </div>
          
    </div>
  )
}

export default Cart