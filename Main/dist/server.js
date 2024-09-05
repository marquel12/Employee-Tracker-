import inquirer from 'inquirer'; // Import the inquirer library for prompting the user
// import { QueryResult } from 'pg';  // Import the QueryResult type from 'pg' for type-checking the result of a query
import { pool, connectToDb } from './connection.js'; // Import the pool and connectToDb functions from the connection module
await connectToDb();
const questions = () => {
    inquirer
        .prompt([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit",
            ],
        },
    ])
        .then((answers) => {
        if (answers.menu === "View all departments") {
            viewAllDepartments();
        }
        else if (answers.menu === "View all roles") {
            viewAllRoles();
        }
        else if (answers.menu === "View all employees") {
            viewAllEmployees();
        }
        else if (answers.menu === "Add a department") {
            addDepartment();
            // } else if (answers.menu === 'Add a role') {
            //     addRole();
            // } else if (answers.menu === 'Add an employee') {
            //     addEmployee();
            // } else if (answers.menu === 'Update an employee role') {
            //     updateEmployeeRole();
        }
        else {
            console.log("Goodbye!");
            questions();
        }
    });
    const viewAllDepartments = () => {
        const sql = "SELECT * FROM department";
        pool.query(sql, (err, result) => {
            if (err) {
                console.log("Did not select departments");
                return;
            }
            console.table(result.rows);
            questions();
        });
    };
    const viewAllRoles = () => {
        const sql = "SELECT * FROM role";
        pool.query(sql, (err, result) => {
            if (err) {
                console.log("Did not select roles");
                return;
            }
            console.table(result.rows);
            questions();
        });
    };
    const viewAllEmployees = () => {
        const sql = "SELECT * FROM employee";
        pool.query(sql, (err, result) => {
            if (err) {
                console.log("Did not select employees");
                return;
            }
            console.table(result.rows);
            questions();
        });
    };
    const addDepartment = () => {
        inquirer
            .prompt({
            type: "input",
            name: "newDepartment",
            message: "Enter the department name:",
        })
            .then((answers) => {
            const sql = "INSERT INTO departments (name) VALUES ($1)";
            const params = [answers.newDepartment];
            pool.query(sql, params, (err, _result) => {
                if (err) {
                    console.log("Did not add department");
                    return;
                }
                console.log("Department added successfully");
                questions();
            });
        });
    };
};
questions();
//   if(answers.menu === 'View all roles') {
//   const sql = `SELECT * FROM roles`;
//   pool.query(sql, (err, result) => {
//       if (err) {
//           res.status(500).json({ error: err.message });
//           return;
//       }
//       const { rows } = result;
//       res.json({
//           message: 'success',
//           data: rows,
//       });
//       promptUser(); // Call the function again to display the menu
//   });
//   if(answers.menu === 'View all employees') {
//   const sql = `SELECT * FROM employees`;
//   pool.query(sql, (err, result) => {
//       if (err) {
//           res.status(500).json({ error: err.message });
//           return;
//       }
//       const { rows } = result;
//       res.json({
//           message: 'success',
//           data: rows,
//       });
//       promptUser();
//   });
//   };
//   if(answers.menu === 'Add a department') {
//   const answers = await inquirer.prompt(
//       {
//           type: 'input',
//           name: 'newDepartment',
//           message: {message:'Enter the department name:'},
//       },
//   );
//   const sql = `INSERT INTO departments (newDepartment)
//   VALUES ($1)`; 
//   const params = [answers.newDepartment];
//   pool.query(sql, params, (err, _result) => {
//       if (err) {
//           res.status(400).json({ error: err.message });
//           return;
//       }
//       res.json({
//           message: 'success',
//           data: body,
//       });
//   });
//   };
// app.post('/api/new-movie', ({ body }, res) => {
//     const sql = `INSERT INTO movies (movie_name)
//     VALUES ($1)`;
//     const params = [body.movie_name];
//     pool.query(sql, params, (err, _result) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: body,
//         });
//     });
// });
// // Read all movies
// app.get('/api/movies', (_req, res) => {
//     const sql = `SELECT id, movie_name AS title FROM movies`;
//     pool.query(sql, (err, result) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         const { rows } = result;
//         res.json({
//             message: 'success',
//             data: rows,
//         });
//     });
// });
// // Delete a movie
// app.delete('/api/movie/:id', (req, res) => {
//     const sql = `DELETE FROM movies WHERE id = $1`;
//     const params = [req.params.id];
//     pool.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//         }
//         else if (!result.rowCount) {
//             res.json({
//                 message: 'Movie not found',
//             });
//         }
//         else {
//             res.json({
//                 message: 'deleted',
//                 changes: result.rowCount,
//                 id: req.params.id,
//             });
//         }
//     });
// });
// // Read list of all reviews and associated movie name using LEFT JOIN
// app.get('/api/movie-reviews', (_req, res) => {
//     const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//     pool.query(sql, (err, result) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         const { rows } = result;
//         res.json({
//             message: 'success',
//             data: rows,
//         });
//     });
// });
// // BONUS: Update review
// app.put('/api/review/:id', (req, res) => {
//     const sql = `UPDATE reviews SET review = $1 WHERE id = $2`;
//     const params = [req.body.review, req.params.id];
//     pool.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//         }
//         else if (!result.rowCount) {
//             res.json({
//                 message: 'Review not found',
//             });
//         }
//         else {
//             res.json({
//                 message: 'success',
//                 data: req.body,
//                 changes: result.rowCount,
//             });
//         }
//     });
// });
// Default response for any other request (Not Found)
//   app.use((_req, res) => {
//       res.status(404).end();
//   });
//   app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//   }
//   );
