import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@material-tailwind/react";
import PropTypes from 'prop-types'; // Importa PropTypes para definir las propiedades

function CattleDetailsModal({ isOpen, onClose, cattle }) {
    return (
        <Modal size="lg" active={isOpen} toggler={onClose}>
            <ModalHeader toggler={onClose}>Detalles del Ganado</ModalHeader>
            <ModalBody>
                {/* Aquí puedes mostrar los detalles del ganado */}
                <p><strong>Arete Siniga:</strong> {cattle.aretesiniga}</p>
                <p><strong>Dueño:</strong> {cattle.dueno}</p>
                <p><strong>Fecha de Nacimiento:</strong> {cattle.fechanac}</p>
                <p><strong>Tipo:</strong> {cattle.tipo}</p>
                <p><strong>Sexo:</strong> {cattle.sexo}</p>
                {/* Agrega más detalles según sea necesario */}
            </ModalBody>
            <ModalFooter>
                <Button color="blue" onClick={onClose}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    );
}

CattleDetailsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    cattle: PropTypes.object.isRequired,
};

export default CattleDetailsModal;
