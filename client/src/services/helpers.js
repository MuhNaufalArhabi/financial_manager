export function getDate(date) {
  return new Date(date).getDate();
}

export function getMonth(date) {
  return ("0" + (new Date(date).getMonth() + 1)).slice(-2);
}

export function getYear(date) {
  return new Date(date).getFullYear();
}
export function getDay(date) {
  const day = new Date(date).getDay();
  switch (day) {
    case 0:
      return "Minggu";
      break;
    case 1:
      return "Senin";
      break;
    case 2:
      return "Selasa";
      break;
    case 3:
      return "Rabu";
      break;
    case 4:
      return "Kamis";
      break;
    case 5:
      return "Jumat";
      break;
    case 6:
      return "Sabtu";
      break;

    default:
      break;
  }
}
export function totalNumberPlus(nums) {
  let plus = null;
  nums.map((el) => {
    if (el.status === "income") {
      plus += el.saldo;
    }
  });
  if (!plus) {
    return plus;
  }
  return "+" + formatNumber(plus);
}
export function totalNumberMinus(nums) {
  let minus = null;
  nums.map((el) => {
    if (el.status === "spending") {
      minus += el.saldo;
    }
  });
  if (!minus) {
    return minus;
  }
  return "-" + formatNumber(minus);
}

export function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

export function sliceName(name) {
    if(name.includes('Add')){
        return name.slice(4)
    }
    return name
}

export function formatDate(date) {
  return new Date(`'${date}'`)
    .toLocaleDateString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");
}

export function sortingCategory(categories, status) {
  const result = [];
  categories.forEach((el) => {
    if (status === 0 && el.status === "spending") {
      result.push(el);
    }
    if (status === 1 && el.status === "income") {
      result.push(el);
    }
  });
  return result;
}

export function formatDateRekap(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("id-ID", options);
}
