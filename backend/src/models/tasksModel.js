const connection = require('./connection');

const getAll = async () => {       //getAll retorna todas as tasks presentes no Banco de Dados
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

const createTask = async (task) => {
    const { title } = task;
    const dateUTC = new Date(Date.now()).toUTCString();

    const querry = 'INSERT INTO tasks (title, status, created_at) VALUES (?, ?, ?)';

    const [createdTask] = await connection.execute(querry, [title, 'pendente', dateUTC]);
    return {insertID: createdTask.insertId};
}

const deleteTask = async (id) => {  
    const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
};

const updateTask = async (id, task) => {  
    const { title, status } = task;
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
    const [updatedTask] = await connection.execute(query, [title, status, id]);
    return updatedTask;
};

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
};