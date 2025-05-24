import React, { useState } from 'react';
import { MessageCircle, Copy, ExternalLink, Phone, Check, AlertCircle } from 'lucide-react';

export default function App() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Função para gerar link do WhatsApp (substituindo a importação)
  const gerarLinkWhatsApp = (phone, message) => {
    const telefoneLimpo = phone.trim().replace(/\D/g, "");
    const mensagemCodificada = encodeURIComponent(message.trim());
    return `https://wa.me/${telefoneLimpo}?text=${mensagemCodificada}`;
  };

  // Validação simples de telefone (substituindo libphonenumber-js)
  const isValidPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return false;
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  };

  // Sistema de toast simples (substituindo Sonner)
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const gerarLink = () => {
    if (!isValidPhoneNumber(phone || '')) {
      showToast("Número de telefone inválido!", 'error');
      return;
    }

    const url = gerarLinkWhatsApp(phone, message);
    setLink(url);
    showToast("Link gerado com sucesso!", 'success');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast("Link copiado para a área de transferência!", 'success');
    } catch (err) {
      console.error('Erro ao copiar:', err);
      showToast("Erro ao copiar o link!", 'error');
    }
  };

  const openLink = () => {
    window.open(link, '_blank');
  };

  // Formatação do telefone (substituindo react-phone-number-input)
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;

    if (cleaned.length >= 2) {
      formatted = `+${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
    }
    if (cleaned.length >= 4) {
      formatted = `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4)}`;
    }
    if (cleaned.length >= 9) {
      formatted = `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
    }

    return formatted;
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value); // Sem formatação durante digitação
  };

  const handlePhoneBlur = (e) => {
    const cleaned = e.target.value.replace(/\D/g, '');
    if (cleaned.length >= 10) {
      setPhone(formatPhoneNumber(e.target.value));
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">

      {/* Toast personalizado */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${toast.type === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
          }`}>
          {toast.type === 'success' ? (
            <Check className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card principal */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl mb-4 shadow-lg">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Gerador de Link
            </h1>
            <p className="text-gray-300 text-sm">
              Crie links diretos para WhatsApp
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Campo telefone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                Número com DDD e país
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  placeholder="Ex: +55 11 99999-9999"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Campo mensagem */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                Mensagem (opcional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>

            {/* Botão gerar */}
            <button
              onClick={gerarLink}
              disabled={!phone.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              Gerar Link
            </button>
          </div>

          {/* Link gerado */}
          {link && (
            <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-200">Link gerado:</h3>
              </div>

              <div className="bg-black/20 rounded-lg p-3 mb-4">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-300 hover:text-blue-200 break-all font-mono transition-colors duration-200"
                >
                  {link}
                </a>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar
                    </>
                  )}
                </button>

                <button
                  onClick={openLink}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Abrir
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs">
            Feito com ❤️ para facilitar sua comunicação
          </p>
          <p className="text-gray-400 text-xs">
            <a href="https://github.com/felipeoliveiracode" target='_blank'>Felipe Oliveira</a>
          </p>
        </div>
      </div>
    </div>
  );
}