import { useState} from 'react'
import axios from 'axios'

export default function CreateReservation({refresh}){

    const [date, setDate] = useState('');
    // const [timeslotId, setTimeslotId] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        try{
            const reservation = {date: date, 
            //timeslotId = parseInt(timeslotId)
            }

        await axios.post('https://localhost:7043/api/Reservation', reservation);
        }
        catch(error){
            console.log(date)
            console.log(error)
        }
        
        // window.location.reload() //lägg till confirmation screen
        refresh();
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='date'></label>
                <input type='text' id='date' value={date} onChange={(e) => setDate(e.target.value)} required/>
            </form>
        </>
    )
}