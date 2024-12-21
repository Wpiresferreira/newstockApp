import { sql } from '@vercel/postgres'
       
export async function getStudents (req, res) {
    try {
        
        const students = await sql`
        SELECT userid, first_name, last_name, email, phone, birthday, department, program, username
            FROM bvc_users
            WHERE isadmin = false
        `;
        if(students.rowCount>0){
            res.status(200).json(students.rows);
        }
        else {
            res.status(401).json({message: 'Error fetching students'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error fetching students'});
    }
};

export async function getEnrollments (req, res) {
    var studentid;
    const user = req.user;
    if(user.isadmin){
        studentid = req.body.studentid;
    }
    else{
        studentid = user.userid
    }

    try {
        const students = await sql`
        SELECT  bvc_registrations.userid
        , bvc_users.first_name
        , bvc_users.last_name
        , bvc_registrations.term_id
        , CONCAT(bvc_terms.term_season,' / ', bvc_terms.term_year) AS term_description
        , bvc_registrations.coursecode
        , bvc_courses.coursename
        , bvc_users.program
        , bvc_programs.programname
            FROM bvc_registrations
            INNER JOIN bvc_courses ON bvc_courses.coursecode = bvc_registrations.coursecode
            INNER JOIN bvc_terms ON bvc_terms.term_id = bvc_registrations.term_id
            INNER JOIN bvc_users ON bvc_users.userid = bvc_registrations.userid
            INNER JOIN bvc_programs ON bvc_users.program = bvc_programs.programcode
            WHERE bvc_registrations.userid = ${studentid}
        `;
        if(students.rowCount>=0){
            res.status(200).json(students.rows);
        }
        else {
            res.status(401).json({message: '400 Error fetching registrations'});
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({messaage: '500 Error fetching registrations'});
    }
};

export async function registerCourse (req, res) {        
    const {term_id, coursecode} = req.body;
    const user = req.user;
    
    try {
        if(user.isadmin){
            res.status(404).send(JSON.stringify({message: 'You have no privileges to see this page'}));
            return
        }
        const result = await sql`
            INSERT INTO bvc_registrations
                VALUES (${user.userid}, ${term_id}, ${coursecode})
           `;
           console.log(result.rowCount == 1)
                if(result.rowCount == 1){
                    res.status(201).json({message: 'Course registered sucessfully.'});
                }
                else {
                    res.status(404).json({message: 'Error registering course.'});
                }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error registering course.'});
    }
};


export async function dropCourse (req, res) {        
    const {coursecode} = req.body;
    const user = req.user;
    
    try {
        if(user.isadmin){
            res.status(404).send(JSON.stringify({message: 'You have no privileges to see this page'}));
            return
        }
        const result = await sql`
            DELETE FROM bvc_registrations
            WHERE coursecode = ${coursecode} AND userid = ${user.userid}
           `;
           console.log(result)
                if(result.rowCount == 1){
                    res.status(201).json({message: 'Course dropped sucessfully'});
                }
                else {
                    res.status(404).json({message: 'Error dropping course'});
                }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error dropping course'});
    }
};