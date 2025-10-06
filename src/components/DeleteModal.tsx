import { Button } from "./ui/button";

import { X, Trash2 } from "lucide-react";

interface DeleteModalProps {
    setOpenModalCancel: (value: boolean) => void
}

export function DeleteModal({ setOpenModalCancel }: DeleteModalProps) {
    return (
        <div className="fixed inset-0 top-0 left-0 w-full z-50 bg-black/75 flex items-center justify-center">
            <div className="w-full max-w-[363px] bg-white px-4 py-6 rounded-lg">
                <button className="w-full flex justify-end cursor-pointer" onClick={() => setOpenModalCancel(false)}>
                    <X />
                </button>

                <div className="w-full flex flex-col items-center gap-6">
                    <div className="w-[85px] h-[85px] flex flex-col items-center justify-center bg-red1 rounded-full">
                        <Trash2 />
                    </div>

                    <h2 className="text-[25px] font-bold">Tem certeza?</h2>

                    <p className="text-[16px] text-center">Essa ação removerá a atividade selecionada.</p>
                </div>

                <div className="grid grid-flow-col grid-cols-2 gap-[19px] mt-[60px]">
                    <Button size="lg">Deletar</Button>
                    <Button size="lg" onClick={() => setOpenModalCancel(false)}>Cancelar</Button>
                </div>
            </div>
        </div>
    )
}