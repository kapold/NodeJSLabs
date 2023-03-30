const delay = async () => {
  return new Promise((res, rej) => setTimeout(res, 2000));
};

class DB {
  constructor() {
    this.table = [
      { id: 1, firstName: "Максим", lastName: "Крисанов" },
      { id: 2, firstName: "Антон", lastName: "Адамович" },
      { id: 3, firstName: "Иван", lastName: "Машук" },
    ];
  }

  async select() {
    await delay();
    return this.table;
  }

  async insert(row) {
    await delay();
    const maxId = this.table.reduce((max, current) => {
      return current.id > max ? current.id : max;
    }, 0);

    const newRow = { id: maxId + 1, ...row };

    this.table.push(newRow);

    return newRow;
  }

  async update(id, row) {
    await delay();
    const index = this.table.findIndex((item) => item.id === id);

    if (index >= 0) {
      const updatedRow = { ...this.table[index], ...row };

      this.table[index] = updatedRow;

      return updatedRow;
    }
    return null;
  }

  async delete(id) {
    await delay();
    const index = this.table.findIndex((item) => item.id === id);
    if (index >= 0) {
      const deletedRow = this.table.splice(index, 1)[0];
      return deletedRow;
    }
    return null;
  }
}

module.exports = new DB();
