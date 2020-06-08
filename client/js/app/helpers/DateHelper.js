class DateHelper {
  constructor() {
    throw new Error('Esta classe não pode ser instanciada');
  }

  static dateToString(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  static stringToDate(string) {
    const pattern = /\d{4}-\d{2}-\d{2}/;
    
    if (!pattern.test(string)) {
      throw new Error('Deve estar no formato yyyy-mm-dd');
    };

    return new Date(...string.split('-').map((item, index) => item - index % 2));
  }

}