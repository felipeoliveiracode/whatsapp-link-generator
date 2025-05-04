import { useState } from "react";
import { gerarLinkWhatsApp } from "./utils/whatsapp";
import { Copy } from "lucide-react";
import { Toaster, toast } from "sonner";
import Input from 'react-phone-number-input/input'
import { isValidPhoneNumber } from "libphonenumber-js";

function App() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");

  const gerarLink = () => {

    if (!isValidPhoneNumber(phone || '')) {
      toast.error("Número de telefone inválido!");
      return;
    }

    const url = gerarLinkWhatsApp(phone, message);

    setLink(url);
    toast.success("Link gerado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Toaster position="top-left" richColors />

      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-600">
          Gerador de Link para WhatsApp
        </h1>

        <label className="block mb-2 font-medium">Número com DDD e país:</label>
        <Input
          className="w-full border rounded p-2 mb-4"
          placeholder="Ex: +55 11 99999 9999"
          value={phone}
          onChange={setPhone}
          aria-label="Número de telefone"
          type="tel"
        />

        <label className="block mb-2 font-medium">{`Mensagem (opcional):`}</label>
        <textarea
          placeholder="Digite a mensagem..."
          className="w-full border rounded p-2 mb-4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={gerarLink}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full hover:cursor-pointer"
        >
          Gerar Link
        </button>

        {link && (
          <div className="mt-6 flex items-end gap-3">
            <div>
              <p className="mb-2 font-semibold">Seu link:</p>
              <a
                href={link}
                target="_blank"
                className="text-blue-600 underline break-all"
                rel="noopener noreferrer"
              >
                {link}
              </a>
            </div>

            <span title="Copiar link">
            <Copy
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("Link copiado para a área de transferência!");
              }}
              size={20}
              className="text-green-500 mb-0.5 cursor-pointer hover:text-green-600"
            />
            </span>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
