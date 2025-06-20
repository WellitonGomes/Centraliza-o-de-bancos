function getYesterdayDate() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Formatar para "YYYY-MM-DD"
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');  // mês começa de 0
    const day = String(yesterday.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

module.exports = { getYesterdayDate };
