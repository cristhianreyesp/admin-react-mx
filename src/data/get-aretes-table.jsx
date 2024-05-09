import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";

import { EyeIcon } from "@heroicons/react/24/solid";
import { CustomPagination } from "@/widgets/pagination"; // Asegúrate de tener la ruta correcta al archivo pagination.jsx

export function GetAreteTable() {
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
                                    Detalle
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-b border-blue-gray-50 py-3 px-6">.....</td>
                            <td className="border-b border-blue-gray-50 py-3 px-6">.....</td>
                            <td className="border-b border-blue-gray-50 py-3 px-6">
                                <Tooltip content="Mostrar Detalle">
                                    <IconButton variant="text">
                                        <EyeIcon className="h-6 w-6" />
                                    </IconButton>
                                </Tooltip>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </CardBody>

        </>
    );
}