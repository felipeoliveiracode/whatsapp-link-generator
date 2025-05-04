export function gerarLinkWhatsApp(phone, message) {
    // Remove espaços e símbolos do número
    const telefoneLimpo = phone.trim().replace(/\D/g, "");
    const mensagemCodificada = encodeURIComponent(message.trim());
    return `https://wa.me/${telefoneLimpo}?text=${mensagemCodificada}`;
}