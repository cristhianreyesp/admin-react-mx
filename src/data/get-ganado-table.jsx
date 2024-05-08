import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  CardBody,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { EyeIcon } from "@heroicons/react/24/solid";
import { CustomPagination } from "@/widgets/pagination"; // Asegúrate de tener la ruta correcta al archivo pagination.jsx


function GetGanadoTable() {
  const url = "http://79.143.190.196:8080/jGanado/servletGanado?xAccion=extraeListadoGanado&xApiKey=7577f6b591ba5f7cea120bfcccad2dbde13347ae879b1ef890e8420718632b17c5539fe08733a6de24cfd418f493bb586c81";
  const [cattles, setCattles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5); // Define la cantidad de elementos por página
  const [selectedCattle, setSelectedCattle] = useState(null); // Estado para almacenar el ganado seleccionado
  const [dialogOpen, setDialogOpen] = useState(false);


  useEffect(() => {
    getCattles();
  }, []);

  const getCattles = async () => {
    try {
      const response = await axios.get(url);
      setCattles(response.data.data);
    } catch (error) {
      console.error("Error fetching cattle data:", error);
    }
  };

  const showCattleDetails = (cattle) => {
    setSelectedCattle(cattle);
    setDialogOpen(true); // Abrir el diálogo al mostrar detalles
  };

  const closeDialog = () => {
    setSelectedCattle(null);
    setDialogOpen(false); // Cerrar el diálogo al cerrar los detalles
  };

  // Calcula el índice inicial y final de los elementos que se mostrarán en la página actual
  const indexOfLastCattle = currentPage * perPage;
  const indexOfFirstCattle = indexOfLastCattle - perPage;
  const currentCattles = cattles.slice(indexOfFirstCattle, indexOfLastCattle);

  return (
    <>

      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-aut">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Arete Siniga
                </Typography>
              </th>
              <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Dueno
                </Typography>
              </th>
              <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Fecha Nacimiento
                </Typography>
              </th>
              <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Tipo
                </Typography>
              </th>
              <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Sexo
                </Typography>
              </th>
              <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Detalle
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCattles.map((cattle) => (
              <tr key={cattle.id}>
                <td className="border-b border-blue-gray-50 py-3 px-6">{cattle.aretesiniga}</td>
                <td className="border-b border-blue-gray-50 py-3 px-6">{cattle.dueno}</td>
                <td className="border-b border-blue-gray-50 py-3 px-6">{cattle.fechanac}</td>
                <td className="border-b border-blue-gray-50 py-3 px-6">{cattle.tipo}</td>
                <td className="border-b border-blue-gray-50 py-3 px-6">{cattle.sexo}</td>
                <td className="border-b border-blue-gray-50 py-3 px-6">
                  <Tooltip content="Mostrar Detalle">
                    <IconButton variant="text" onClick={() => showCattleDetails(cattle)}>
                      <EyeIcon className="h-6 w-6" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <div className="flex items-center justify-center mt-3 mb-3">
        <CustomPagination
          currentPage={currentPage}
          totalPages={Math.ceil(cattles.length / perPage)} // Calcula el total de páginas
          onPageChange={setCurrentPage}
        /></div>
      {/* Diálogo para mostrar detalles del ganado */}
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Detalles del Ganado</DialogHeader>
        <DialogBody>
          {selectedCattle && (
            <>
              <Typography variant="body">{`Arete Siniga: ${selectedCattle.aretesiniga}`}</Typography>
              <Typography variant="body">{`Dueño: ${selectedCattle.dueno}`}</Typography>
              <Typography variant="body">{`Fecha de Nacimiento: ${selectedCattle.fechanac}`}</Typography>
              <Typography variant="body">{`Tipo: ${selectedCattle.tipo}`}</Typography>
              <Typography variant="body">{`Sexo: ${selectedCattle.sexo}`}</Typography>
            </>
          )}
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={closeDialog}>
            <span>Cancelar</span>
          </Button>
          {/* Aquí podrías agregar acciones adicionales si es necesario */}
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default GetGanadoTable;
