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
  Input,
  Checkbox,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";

import { EyeIcon, ClockIcon } from "@heroicons/react/24/solid";
import { CustomPagination } from "@/widgets/pagination"; // Asegúrate de tener la ruta correcta al archivo pagination.jsx
import { mostrarAlertaExito, mostrarAlertaError } from "@/widgets/showAlertas"

function GetGanadoTable() {
  const urlLista = `${import.meta.env.VITE_API_URL}?xAccion=extraeListadoGanado&xApiKey=${import.meta.env.VITE_API_KEY}`;
  const urlActualizar = `${import.meta.env.VITE_API_URL}`

  const [cattles, setCattles] = useState([]);
  const [id, setId] = useState('');
  const [sexo, setSexo] = useState('');
  const [aretesiniga, setAretesiniga] = useState('');
  const [dueno, setDueno] = useState('');
  const [fechanac, setFechanac] = useState('');
  const [resena, setResena] = useState('');
  const [tipo, setTipo] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [clavefierro, setClavefierro] = useState('');
  const [claverancho, setClaverancho] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Define la cantidad de elementos por página
  const [selectedCattle, setSelectedCattle] = useState(null); // Estado para almacenar el ganado seleccionado
  const [dialogOpen, setDialogOpen] = useState(false);
  //const [value, setValue] = React.useState(sexo); // slect seleccion

  useEffect(() => {
    getCattles();
  }, []);

  const getCattles = async () => {
    try {
      const response = await axios.get(urlLista);
      setCattles(response.data.data);
    } catch (error) {
      console.error("Error fetching cattle data:", error);
    }
  };

  const showCattleDetails = (op, id = '', sexo = '', aretesiniga = '', dueno = '', fechanac = '', resena = '', tipo = '', observaciones = '', clavefierro = '', claverancho = '') => {
    setId(id);
    setSexo(sexo);
    setAretesiniga(aretesiniga);
    setDueno(dueno);
    setFechanac(fechanac);
    setResena(resena);
    setObservaciones(observaciones);
    setTipo(tipo);
    setClavefierro(clavefierro);
    setClaverancho(claverancho);
    setDialogOpen(true);
    setOperation(op);

    if (op === 1) {
      setTitle('Registrar Ganado');
    } else if (op === 2) {
      setTitle('Editar Ganado');
    }

  };
  const closeDialog = () => {
    setSelectedCattle(null);
    setDialogOpen(false); // Cerrar el diálogo al cerrar los detalles
  };
  const validar = () => {
    if (aretesiniga.trim() === '') {
      console.error("arte vacio:", error);
    } else if (sexo.trim() === '') {
      console.error("sexo vacio:", error);
    } else {
      const parametros = {
        xIdAnimal: id,
        xSexo: sexo,
        xAreteSiniga: aretesiniga,
        xDueno: dueno,
        xFechaNac: fechanac,
        xTipo: tipo,
        xObservaciones: observaciones,
        xCveFierro: clavefierro,
        xCveRancho: claverancho
      };

      enviarSolicitud(parametros);
    }
  }
  const enviarSolicitud = async (parametros) => {
    const url = `${urlActualizar}?xApiKey=7577f6b591ba5f7cea120bfcccad2dbde13347ae879b1ef890e8420718632b17c5539fe08733a6de24cfd418f493bb586c81&xAccion=actualizaOtrosDatos`;
    try {
      const respuesta = await axios.post(url, null, { params: parametros });
      if (respuesta.data) {
        const codigo = respuesta.data.codigo;
        const mensaje = respuesta.data.mensaje;
        if (codigo === 0) {
          mostrarAlertaExito('Actualizados exitosamente');
          closeDialog();
          getCattles();
        } else {
          mostrarAlertaError(mensaje);
        }
      } else {
        console.error("Respuesta inesperada del servidor:", respuesta.data);
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

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
            {currentCattles.map((cattle, id) => (
              <tr key={cattle.id}>
                <td className="border-b border-blue-gray-50 py-3 px-6">{cattle.aretesiniga}</td>
                <td className="border-b border-blue-gray-50 py-3 px-6">{cattle.dueno}</td>
                <td className="border-b border-blue-gray-50 py-3 px-6">{cattle.fechanac}</td>
                <td className="border-b border-blue-gray-50 py-3 px-6">{cattle.tipo}</td>
                <td className="border-b border-blue-gray-50 py-3 px-6">{cattle.sexo}</td>
                <td className="border-b border-blue-gray-50 py-3 px-6">
                  <Tooltip content="Mostrar Detalle">
                    <IconButton variant="text" onClick={() => showCattleDetails(2, cattle.id, cattle.sexo, cattle.aretesiniga, cattle.dueno, cattle.fechanac, cattle.resena, cattle.tipo, cattle.observaciones, cattle.clavefierro, cattle.claverancho)}>
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
          totalPages={Math.ceil(cattles.length / perPage)}
          onPageChange={setCurrentPage}
        /></div>
      <Dialog
        size="lg"
        open={dialogOpen}
        onClose={closeDialog}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>{title}</DialogHeader>
        <DialogBody className="overflow-y-auto min-h-auto">
          <>
            <input type="hidden" id="id"></input>
            <div className="flex justify-center mx-2">
              <div className="w-full">
                {/* Fila 1 */}
                <div className="flex justify-between mb-4">
                  <div className="flex flex-col items-start w-1/3 mr-4">
                    <Typography color="blue-gray" className="font-medium flex items-center mb-4">
                      Arete Siniga: <Checkbox checked />
                    </Typography>
                  </div>
                  <div className="flex flex-col items-start w-1/3 mr-4">
                    <Typography color="blue-gray" className="font-medium flex items-center mb-4">
                      Arete Azul: <Checkbox />
                    </Typography>
                  </div>
                  <div className="flex flex-col items-start w-1/3">
                    <Input type="text" id="aretesiniga" label="Arete" value={aretesiniga}
                      onChange={(e) => setAretesiniga(e.target.value)} />
                  </div>
                </div>
                {/* Fila 2 */}
                <div className="flex justify-between mb-4">
                  <div className="flex flex-col items-start w-1/3 mr-4">
                    <Input type="text" id="dueno" label="Dueño" value={dueno}
                      onChange={(e) => setDueno(e.target.value)} />
                  </div>
                  <div className="flex flex-col items-start w-1/3 mr-4">
                    <Input type="text" id="fechanac" label="Fecha Nac..." value={fechanac}
                      onChange={(e) => setFechanac(e.target.value)} />
                  </div>
                  {/*<div className="flex flex-col items-start w-1/3">
                    <Input type="text" id="sexo" label="Sexo" value={sexo}
                      onChange={(e) => setSexo(e.target.value)} />
      </div>*/}
                  <div className="flex flex-col items-start w-1/3">
                    <Select
                      label="Select Sexo"
                      value={sexo}
                      onChange={(e) => setFechanac(e.target.value)}
                    >
                      <Option value="1">Macho</Option>
                      <Option value="2">Hermbra</Option>
                      <Option value="3">N/A</Option>
                    </Select>
                  </div>

                </div>
                {/* Fila 3 */}
                <div className="flex justify-between mb-4">
                  <div className="flex flex-col items-start w-1/3 mr-4">
                    <Input type="text" id="tipo" label="Tipo" value={tipo}
                      onChange={(e) => setTipo(e.target.value)} />
                  </div>
                  <div className="flex flex-col items-start w-1/3 mr-4">
                    <Input type="text" id="clavefierro" label="Clave Fierro" value={clavefierro}
                      onChange={(e) => setClavefierro(e.target.value)} />
                  </div>
                  <div className="flex flex-col items-start w-1/3">
                    <Input type="text" id="claverancho" label="Clave Rancho" value={claverancho}
                      onChange={(e) => setClaverancho(e.target.value)} />
                  </div>
                </div>
                {/* Fila 4 */}
                <div className="flex justify-between items-start mt-2">
                  <div className="flex flex-col w-2/3 mr-4">
                    <Textarea id="observaciones" label="Observaciones" rows="2" className="w-full"
                      onChange={(e) => setObservaciones(e.target.value)} />
                  </div>
                  <div className="flex flex-col items-start w-1/3">
                    <label className="cursor-pointer">
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e)} />
                      <Button variant="gradient" size="lg" color="amber" className="flex items-center gap-20">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-10 w-10"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                          />
                        </svg>
                        Subir Imagen
                      </Button>
                    </label>
                  </div>
                </div>
                {/* Fila 5 */}
                <div className="flex justify-between mb-4">
                  <div className="d-grid col-6 mx-auto">
                    <Button color='green' onClick={() => validar()}>
                      <i className="fa-solid fa-floppy-disk"></i></Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        </DialogBody>

        <DialogFooter>
          <Button color="red" onClick={closeDialog}>
            <span>Cancelar</span>
          </Button>
        </DialogFooter>
      </Dialog >
    </>
  );
}

export default GetGanadoTable;
