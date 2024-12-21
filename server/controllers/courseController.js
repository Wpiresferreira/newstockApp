import { sql } from '@vercel/postgres'
       
export async function getCourses (req, res) {
    try {
        const courses = await sql`
        SELECT * 
        FROM bvc_courses
        WHERE programcode = ${req.params.programcode}
        `;
        if(courses){
            res.status(200).json(courses.rows);
        }
    else {
        res.status(404).json({message: 'Error fetching courses'});
    }
  } catch (error) {
    res.status(500).json({message: 'Error fetching courses'});
  }
  
};

export async function getTerms (req, res) {
  try {
      const courses = await sql`
      SELECT * 
      FROM bvc_terms
      `;
      if(courses){
          res.status(200).json(courses.rows);
      }
  else {
      res.status(404).json({message: 'Error fetching courses'});
  }
} catch (error) {
  res.status(500).json({message: 'Error fetching courses'});
}

};



export async function addCourse (req, res) {        
  const { programcode,coursecode,coursename,credits,term, availability,prerequissites,corequisites} = req.body;
  const user = req.user;
  
  try {
    if(!user.isadmin){
      res.status(404).json({message: 'You have no privileges to see this page'});
      return
    }
    if(!programcode || !coursecode || !coursename || !credits || !term || !availability){
      res.status(404).json({message: 'Fill all required fields.'});
      return
    }
    const result = await sql`
      INSERT INTO bvc_courses (programcode,coursecode,coursename,credits, term, availability,prerequissites,corequisites)
        VALUES (${programcode}, ${coursecode}, ${coursename}, ${credits}, ${term}, ${availability}, ${prerequissites}, ${corequisites})
      `;
      if(result){
        res.status(201).json({message: 'Course added sucessfully'});
      }
      else {
        res.status(404).json({message: 'Error adding course'});
      }
  } catch (error) {
    res.status(500).json({message: 'Error adding course'});
  }
}


export async function editCourse (req, res) {        
  const {programcode,coursecode,coursename,credits, term, availability,prerequissites,corequisites} = req.body;
  const user = req.user;
  try {
      if(!user.isadmin){
        res.status(404).json({message: 'You have no privileges to see this page'});
        return
      }
      const result = await sql`
        UPDATE bvc_courses
          SET programcode = ${programcode},
          coursename= ${coursename},
          credits = ${credits},
          term= ${term},
          availability = ${availability},
          prerequissites = ${prerequissites},
          corequisites = ${corequisites}
          WHERE coursecode = ${coursecode}
        `;
        if(result.rowCount==1){
          res.status(201).json({message: 'Course updated sucessfully'});
        }
        else {
          res.status(404).json({message: 'Error updating course'});
        }
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Error updating course'});
  }
};



export async function deleteCourse (req, res) {        
  const {coursecode} = req.body;
  const user = req.user;
  try {
      if(!user.isadmin){
          res.status(404).json({message: 'You have no privileges to see this page'});
          return
      }
      const result = await sql`
          DELETE FROM bvc_courses
          WHERE coursecode = ${coursecode}
          `;
              if(result.rowCount==1){
                  res.status(201).json({message: 'Course deleted sucessfully'});
              }
              else {
                  res.status(404).json({message: 'Error deleting course'});
              }
          } catch (error) {
              console.log(error)
              res.status(500).json({message: 'Error deleting course'});
          }
};