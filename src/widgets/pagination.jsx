import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function CustomPagination({ currentPage, totalPages, onPageChange }) {
    const prev = () => {
        if (currentPage === 1) return;
        onPageChange(currentPage - 1);
    };

    const next = () => {
        if (currentPage === totalPages) return;
        onPageChange(currentPage + 1);
    };

    const renderPageButtons = () => {
        const buttons = [];
        const maxButtonsToShow = 5; // Define cuántos botones de página mostrar
        const startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <IconButton
                    key={i}
                    color={currentPage === i ? "blue" : "gray"}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </IconButton>
            );
        }
        return buttons;
    };

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={currentPage === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Anterior
            </Button>
            <div className="flex items-center gap-2">
                {renderPageButtons()}
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={currentPage === totalPages}
            >
                Siguiente <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}
