DROP DATABASE IF EXISTS lakers_db;
CREATE DATABASE lakers_db;

\c lakers_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role(
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL ,-- this is a unique column which means that the title of the role must be unique
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL

    
);

CREATE TABLE employee(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER, -- this is a self-referencing foreign key
  FOREIGN KEY(role_id) 
  REFERENCES role(id), -- this is a foreign key of role table
  FOREIGN KEY(manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL

  


);

