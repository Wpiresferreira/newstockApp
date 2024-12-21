import { sql } from '@vercel/postgres'
       
export async function getPrograms(req, res) {
  try {
    const programs = await sql`
      SELECT * 
      FROM bvc_programs
      `;
      if(programs){
          res.status(200).json(programs.rows);
      }
      else {
          res.status(404).send(JSON.stringify({message: 'Error fetching programs'}));
      }
  } catch (error) {
      res.status(500).send({message: 'Error fetching programs'});
  }
}


export async function addProgram (req, res) {        
    const {programcode, programname, duration, term, startdate, enddate, domesticfee, internationalfee, description} = req.body;
    const user = req.user    
    try{
        if(!user.isadmin){
            res.status(404).json({message: 'You have no privileges to see this page'});
            return
        }

        const result = await sql`
          INSERT INTO bvc_programs (programcode, programname, duration, term, startdate, enddate, domesticfee, internationalfee, description)
          VALUES (${programcode}, ${programname}, ${duration}, ${term}, ${startdate}, ${enddate}, ${domesticfee}, ${internationalfee}, ${description})
          `;
        if(result){
            res.status(201).json({message: 'Program added sucessfully'});
        }
        else {
            res.status(404).json({message: 'Error adding program'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(JSON.stringify({message: 'Error adding program'}));
    }
};


export async function editProgram (req, res) {        
    const {programcode, programname, duration, term, startdate, enddate, domesticfee, internationalfee, description} = req.body;
    const user = req.user 
    console.log(req.body)
    
    try {
 
        if(!user.isadmin){
            res.status(404).json({message: 'You have no privileges to see this page'});
            return
        }
        const result = await sql`
            UPDATE bvc_programs
                SET programname = ${programname},
                duration = ${duration},
                term = ${term},
                startdate = ${startdate},
                enddate = ${enddate},
                domesticfee = ${domesticfee},
                internationalfee = ${internationalfee},
                description = ${description}
            WHERE programcode = ${programcode}
           `;
        if(result.rowCount == 1){
            res.status(201).json({message: 'Program updated sucessfully'});
        }
        else {
            res.status(404).json({message: 'Error updating program'});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error updating program'});
    }
};


export async function deleteProgram (req, res) {        
    const {programcode} = req.body;
    const user = req.user;
    console.log(programcode)

    try {
        if(!user.isadmin){
            res.status(404).json({message: 'You have no privileges to see this page'});
            return
        }
        const result = await sql`
            DELETE FROM bvc_programs
            WHERE programcode = ${programcode}
           `;
           console.log(result)
        if(result.rowCount == 1){
            res.status(201).json({message: 'Program deleted sucessfully'});
        }
        else {
            res.status(404).json({message: 'Error deleting program'});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error deleting program'});
    }
};