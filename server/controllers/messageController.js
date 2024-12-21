import { sql } from '@vercel/postgres'
       
export async function getMessages (req, res) {
    try {
        if(!req.user.isadmin){
            res.status(404).json({message: 'You have no privileges to see this page'});
            return
        }
        const messages = await sql`
            SELECT messageid, bvc_messages.userid, first_name, last_name, title, message, date, wasread
            FROM bvc_messages
            INNER JOIN bvc_users ON bvc_messages.userid = bvc_users.userid
            ORDER BY date DESC
            `;
        if(messages){
            res.status(200).json(messages.rows);
        }
        else {
            res.status(200).json({message: 'No Messages returned'});
        }
    } catch (error) {
    res.status(500).json({message: 'Error fetching messages'});
    }
}

export async function sendMessage (req, res) {  
    const userid = req.user.userid
    const {titlemessage, bodymessage} = req.body;

    try{ 
        const result = await sql`
         INSERT INTO bvc_messages (userid, title, message)
             VALUES (${userid}, ${titlemessage}, ${bodymessage})
           `;
                if(result.rowCount == 1){
                    res.status(201).json({message: 'Message sent sucessfully.'});
                }
                else {
                    res.status(404).json({message: 'Error sending message.'});
                }
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error sending message.'});
    }
};

export async function deleteMessage (req, res) {        
    const {messageid} = req.body;

    try {    
        const result = await sql`
         DELETE FROM bvc_messages
         WHERE messageid = ${messageid}
         `;
                if(result.rowCount == 1){
                    res.status(201).json({message: 'Message deleted sucessfully.'});
                }
                else {
                    res.status(404).send(JSON.stringify({message: 'Error deleting message.'}));
                }
    } catch (error) {
        console.error(error)
        res.status(500).send(JSON.stringify({message: 'Error deleting message.'}));
    }
};
       
export async function setMessageReadStatus (req, res) {
        const {messageid, wasread} = req.body;
        try {
            const result = await sql`
                UPDATE bvc_messages
                SET wasread = ${wasread}
                WHERE messageid = ${messageid}
                `;
                if(result.rowCount == 1){
                    res.status(201).json({message: 'Message status changed'});
                }
                else {
                    res.status(404).json({message: 'Error changing message status'});
                }
            } catch (error) {
                console.error(error);
                res.status(500).json('Error changing message status');
            }
};