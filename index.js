const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [{
        id: 1,
        name: 'Herry'
    },
    {
        id: 2,
        name: 'Andi'
    },
    {
        id: 3,
        name: 'Dudi'
    }
];

app.get('/', (req, res) => {
    res.send('Hellow world!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});


// method GET
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The courses with the given ID was not fount');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };
    // const result = Joi.validate(req.body, schema);
    // if (result.error) {
    //     //    bed request (400)
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }
    const {
        error
    } = validateCourse(req.body); //result error
    if (error)
        return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('The courses with the given ID was not fount');

    // validate
    // const result = validateCourse(req.body);
    const {
        error
    } = validateCourse(req.body); //result error
    if (error)
        return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('The courses with the given ID was not fount');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});




// port variable global
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));