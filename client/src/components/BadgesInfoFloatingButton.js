import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import firstRound from '../images/firstRound.png'
import secondRound from '../images/secondRound.png'
import thirdRound from '../images/thirdRound.png'
import mostStrokes from '../images/mostStrokes.png'
import fastestTime from '../images/fastestTime.png'

const BadgesInfoFloatingButton = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button id="badgesModeActionBtn" type="button"
                className="float2-btn" onClick={handleShow}>
                <FontAwesomeIcon icon={faTrophy} />
                &nbsp;Earn Badges
            </button>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Badges Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th width="160" >Badge</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img src={firstRound} className='badgeImg' />
                                </td>
                                <td>Play 1 round to earn this badge</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={secondRound} className='badgeImg' />
                                </td>
                                <td>Play 2 rounds to earn this badge</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={thirdRound} className='badgeImg' />
                                </td>
                                <td>Play 3 rounds to earn this badge</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={mostStrokes} className='badgeImg' />
                                </td>
                                <td>Get 100+ strokes for a round to earn this badge</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={fastestTime} className='badgeImg' />
                                </td>
                                <td>Take 20 minutes or less to finish a round to earn this badge</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BadgesInfoFloatingButton;