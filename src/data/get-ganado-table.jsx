import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  CardBody,
  IconButton,
  Tooltip,
  Button,
  Card,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Checkbox,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";

import { EyeIcon, ClockIcon } from "@heroicons/react/24/solid";
import { CustomPagination } from "@/widgets/pagination"; // Asegúrate de tener la ruta correcta al archivo pagination.jsx


function GetGanadoTable() {
  const url = `${import.meta.env.VITE_API_URL}/jGanado/servletGanado?xAccion=extraeListadoGanado&xApiKey=${import.meta.env.VITE_API_KEY}`;
  const [cattles, setCattles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Define la cantidad de elementos por página
  const [selectedCattle, setSelectedCattle] = useState(null); // Estado para almacenar el ganado seleccionado
  const [dialogOpen, setDialogOpen] = useState(false);
  const [value, setValue] = React.useState("1"); // slect seleccion


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
        size="lg"
        open={dialogOpen}
        onClose={closeDialog}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Detalles del Ganado</DialogHeader>
        <DialogBody className="overflow-y-auto min-h-auto">
          {selectedCattle && (
            <>
              <Card className="mx-auto w-full max-w-[28rem]">
                <div className="flex items-center gap-6">
                  <div>
                    <Checkbox
                      label={
                        <Typography color="blue-gray" className="font-medium">
                          Arete Siniga:
                        </Typography>
                      }
                    />
                  </div>
                  <div>
                    <Checkbox
                      label={
                        <Typography color="blue-gray" className="font-medium">
                          Arete Azul:
                        </Typography>
                      }
                    />
                  </div>
                </div>
                <div className="my-2 flex items-center gap-3">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Buscar:
                  </Typography>
                  <div className="relative flex w-full max-w-[16.5rem]">
                    <Input
                      type="text"
                      label="Arete Codigo"
                      className="pr-16"
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                    <Button
                      size="sm"
                      color={"blue-gray"}
                      className="!absolute right-1 top-1 rounded"
                    >
                      Buscar
                    </Button>
                  </div>
                </div>
                <div className="my-2 flex items-center gap-16">
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mr-2 font-medium"
                    >
                      Id: 0000000{selectedCattle.id}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mr-2 font-medium"
                    >
                      Arete Siniga: {selectedCattle.aretesiniga}
                    </Typography>
                  </div>
                </div>
                <div className="my-2 flex items-center w-full max-w-[20rem]">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mr-2 font-medium"
                  >
                    Sexo:
                  </Typography>
                  <Select label="Seleciona Sexo">
                    <Option>Macho</Option>
                    <Option>Hembra</Option>
                  </Select>
                </div>
                <div className="my-2 flex items-center gap-16">
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mr-2 font-medium"
                    >
                      Dueño: {selectedCattle.dueno}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mr-2 font-medium"
                    >
                      Fecha Nacimiento: {selectedCattle.fechanac}
                    </Typography>
                  </div>
                </div>
                <div className="my-2 flex items-center w-full max-w-[20rem]">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mr-2 font-medium"
                  >
                    Tipo:
                  </Typography>
                  <Select label="Tipo"
                    value={value}
                    onChange={(val) => setValue(val)}>
                    <Option value='1'>{selectedCattle.tipo}</Option>
                    <Option value='2'>VAQ2</Option>
                  </Select>
                </div>
                <div className="my-2 flex items-center gap-16">
                  <div >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mr-2 font-medium"
                    >
                      Clave Fierro: {selectedCattle.clavefierro}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mr-2 font-medium"
                    >
                      Clave Rancho: {selectedCattle.claverancho}
                    </Typography>
                  </div>
                </div>
                <div className="mb-1 flex flex-col gap-6 w-full">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Observacion
                  </Typography>
                  <div className="w-96">
                    <Textarea label="" />
                  </div>
                </div>
              </Card>
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
