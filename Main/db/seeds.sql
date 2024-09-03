INSERT INTO department (id,name)
VALUES ('Athletics'),
       ('Trainers and Performance'),
       ('Media'),
       ('Sales'),
       ('Finance');
     
       
      

INSERT INTO role (title, salary, department_id)
VALUES 
        ('Super Star Athlete', 50000000, 1),
        ('All star Athlete', 10000000, 1),
        ('Role Player', 5000000, 1),
        ('Rookie Athlete', 1000000, 1),
        ('Head Coach', 15000000, 1),
        ('Assistant Coach',2000000 , 1),
        ('General Manager', 10000000, 1),
        ('Head Athletic Trainer', 90000, 2),
        ('Assistant Athletic Trainer', 80000, 2),
        ('Massage Therapist', 60000, 2),
        ('Journalist', 60000, 3),
        ('Content Creator', 50000, 3),
        ('Salesperson', 60000, 4),
        ('Sales Manager', 70000, 4),
        ('Accountant', 90000, 5),
        ('Financial Analyst', 80000, 5);




INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
        ('Lebron', 'James', 1, 5), -- this is a super star and his manager is the head coach 
        ('Anthony', 'Davis', 2, 5),
        ('Austin', 'Reaves', 3, 5), -- thpsql -U postgresis is a role player and his manager is head coach
        ('Rui', 'Hachimura', 3, 5),
        ('Gabe', 'Vincent', 3, 5),
        ('Blake', 'Hinson', 4, 5),
        ('JJ', 'Redick', 5, 7), -- this is the head coach and his manager is the general manager and his name is Magic Johnson 
        ('Scott', 'Brooks',6,5 ), 
        ('Magic', 'Johnson',7,null),
        ('John', 'Smith',8,null ),
        ('Will', 'Smith',9,8), -- this is assistant athletic coach and his manager is the head athletic coach which is John Smith 
        ('Sara', 'Hudson', 10, 8), 
        ('Stephen','Smith',11,null),
        ('Mike', 'Hill',12,null),
        ('Justin', 'Baker',13, 14), -- this is a salesperson and his manager is the sales manager
        ('Katie', 'Fields',14,null),-- this is the sales manager and does not have a manager
        ('Tom', 'Hanks',15,null),
        ('Jack','Black',16,null);




       
       
