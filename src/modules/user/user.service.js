const boom = require("@hapi/boom");
const { connectionDB } = require("../../database/connection");


class UserService {
  async findAll() {
    try {
      const query = "SELECT * FROM USUARIO;";
      const connection = await connectionDB();

      const response = await connection.execute(query);
      await connection.close();

      return response.rows;
    } catch (error) {
      throw boom.internal();
    }
  }

  async findOne(id) {
    const query = `SELECT * FROM USUARIO WHERE USUARIO_ID=${id};`;
    const connection = await connectionDB();

    const response = await connection.execute(query);
    if (response.rows.length === 0)
      throw boom.notFound("Usuario no encontrado");

    return response.rows;
  }

  async findByUsername(username) {
    const query = `SELECT * FROM USUARIO WHERE USUARIO='${username}';`;
    const connection = await connectionDB();

    const response = await connection.execute(query);
    if (response.rows.length === 0)
      throw boom.notFound("Usuario no encontrado");

    return response.rows;
  }

  async create(data) {
    const users = await this.findAll();
    const id =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

    const user = { id, ...data };
    const query = `INSERT INTO USUARIO (USUARIO_ID, NOMBRE, USUARIO, CONTRASENA) VALUES (${user.id}, '${user.name}', '${user.username}', '${user.password}')`;

    const connection = await connectionDB();

    await connection.execute(query);
    await connection.close();

    return {
      message: "usuario creado",
      user,
    };
  }

  async update(id, changes) {
    const existingUser = await this.findOne(id);
    const updatedUser = {
      ...existingUser[0],
      ...changes,
    };

    const query = `UPDATE USUARIO SET NOMBRE = '${updatedUser.name}', USUARIO = '${updatedUser.username}' WHERE USUARIO_ID = ${id}`;

    const connection = await connectionDB();

    await connection.execute(query);
    await connection.close();
    return {
      message: `Usuario con id: ${id} fue actualizado con éxito`,
      user: updatedUser,
    };
  }

  async delete(id) {
    try {
      await this.findOne(id);

      const query = `DELETE FROM USUARIO WHERE USUARIO_ID = ${id}`;
      const connection = await connectionDB();

      await connection.execute(query);
      await connection.close();

      return {
        message: `Usuario con id: ${id} fue eliminado con éxito`,
      };
    } catch (error) {
      throw boom.internal();
    }
  }
}

module.exports = { UserService };
