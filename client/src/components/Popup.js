

/* export default function Form() {
    return (
        <div>

        </div>
    )
} */

import React, {useState} from 'react';
import Modal from 'react-modal';
import TableDatePicker from './Form';
import TableDatePicker1 from './Form';
import TableDatePicker2 from './Form';
import Form from './Form';

function ModalInFunctionalComponent (){

    const [modalIsOpen,setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }

    return(
        <>
            <button onClick={setModalIsOpenToTrue}>Click to Open Modal</button>

            <Modal isOpen={modalIsOpen}>
                <button onClick={setModalIsOpenToFalse}>x</button>
                <Form/>
            </Modal>
        </>
    )
}
export default ModalInFunctionalComponent;