function formatDate(date: Date): string {
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString(); // Bulan di JavaScript dimulai dari 0
  const year = date.getFullYear().toString();

  // Tambahkan 0 di depan jika hari atau bulan kurang dari 10
  day = day.length < 2 ? "0" + day : day;
  month = month.length < 2 ? "0" + month : month;

  return `${day}/${month}/${year}`;
}

export default formatDate;
