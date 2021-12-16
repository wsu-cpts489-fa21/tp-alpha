import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


function AddTeeModal(props) {
    const [teeName, setTeeName] = useState('')
    const [teeGolfYard, setTeeGolfYard] = useState('')
    const [teeRunYard, setTeeRunYard] = useState('')
    const [teeNumHoles, setTeeNumHoles] = useState('')
    const [teeTimeParMultiplier, setTeeTimeParMultiplier] = useState(70)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const teeNameHandler = (event) => {
        setTeeName(event.target.value)
    }

    const teeGolfYardHandler = (event) => {
        setTeeGolfYard(event.target.value)
    }

    const teeRunYardHandler = (event) => {
        setTeeRunYard(event.target.value)
    }

    const teeNumHolesHandler = (event) => {
        setTeeNumHoles(event.target.value)
    }

    const teeTimeParMultiplierHandler = (event) => {
        setTeeTimeParMultiplier(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const teeData = {
            name: teeName,
            golfingYardage: teeGolfYard,
            runningYardage: teeRunYard,
            numHoles: teeNumHoles,
            timeParMultiplier: teeTimeParMultiplier,
            timePar: teeTimeParMultiplier * teeRunYard
        }
        console.log(teeData)
        props.addTee(teeData);
        setShow(false)
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Tee
            </Button>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Add a tee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3 centered">
                        <label htmlFor="teeName" className="form-label">Name
                            <input id="teeName" name="name"
                                className="form-control centered" type="text"
                                aria-describedby="teeNameDescr"
                                size="20" maxLength="20" onChange={teeNameHandler} required />
                        </label>
                        <div id="teeNameDescr" className="form-text">
                            Enter the Tee color
                        </div>
                    </div>
                    <div className="mb-3 centered">
                        <label htmlFor="teeGolfYard" className="form-label">Golfing Yardage
                            <input id="teeGolfYard" name="golfYard"
                                className="form-control centered" type="number"
                                aria-describedby="teeGolfYardDescr"
                                min="0" step="5"
                                onChange={teeGolfYardHandler} required />
                        </label>
                        <div id="teeGolfYardDescr" className="form-text">
                            Enter the tee golfing yardage
                        </div>
                    </div>
                    <div className="mb-3 centered">
                        <label htmlFor="teeRunYard" className="form-label">Running Yardage
                            <input id="teeRunYard" name="runYard"
                                className="form-control centered" type="number"
                                aria-describedby="teeRunYardDescr"
                                min="0" step="5"
                                onChange={teeRunYardHandler} required />
                        </label>
                        <div id="teeRunYardDescr" className="form-text">
                            Enter the tee running yardage
                        </div>
                    </div>
                    <div className="mb-3 centered">
                        <label htmlFor="teeNumHoles" className="form-label">Number of Holes
                            <input id="teeNumHoles" name="numHoles"
                                className="form-control centered" type="number"
                                aria-describedby="teeNumHolesDescr"
                                min="0" step="1"
                                onChange={teeNumHolesHandler} required />
                        </label>
                        <div id="teeNumHolesDescr" className="form-text">
                            Enter the number of holes
                        </div>
                    </div>
                    <div className="mb-3 centered">
                        <label htmlFor="teeParMultiplier" className="form-label">Time Par Multiplier
                            <input id="teeParMultiplier" name="parMultiplier"
                                className="form-control centered" type="number"
                                aria-describedby="teeParMultiplierDescr"
                                min="70" step="1"
                                defaultValue={teeTimeParMultiplier}
                                onChange={teeTimeParMultiplierHandler} />
                        </label>
                        <div id="teeParMultiplierDescr" className="form-text">
                            Change the par multiplier (optional)
                        </div>
                    </div>
                    <div className="mb-3 centered">
                        <label htmlFor="teeTimePars">Time pars
                            <input id='timePars' name="timePars" className="form-control centered" type="number"
                                size="6" value={teeTimeParMultiplier * teeRunYard} readOnly={true} />
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Add Tee
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddTeeModal