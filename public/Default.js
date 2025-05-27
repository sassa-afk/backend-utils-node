class Default {
  dateFormat() {
    const data = new Date();
    const op = {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const dataFormatada = new Intl.DateTimeFormat("pt-BR", op).format(data);

    return dataFormatada;
  }
}

module.exports = Default;
