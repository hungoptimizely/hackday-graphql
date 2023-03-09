import React from "react";
import {Dialog, DialogTitle, DialogContent, Button, DialogActions, TextField} from "@mui/material"
import { UPDATE_SUPERHERO } from "../../clients/superheroclient";
import {useMutation} from '@apollo/client'

export default function UpdateHeroForm({open, onClose, onSaved, heromodel}){
    const [updateSuperhero, {data, loading, error}] = useMutation(UPDATE_SUPERHERO);
    const [model, setModel] = React.useState(heromodel);
    console.log(heromodel);
    const handleChange = (e) =>{
        if(e.target.name === "height")
            setModel({...model, [e.target.name]: parseFloat(e.target.value)});
        else
            setModel({...model, [e.target.name]:e.target.value});
    }
    const handlePowerChange = (e, id) =>{
        setModel({...model, superpowers: model.superpowers.map(sp => sp.id == id ? {...sp, [e.target.name]:e.target.value} : sp)});
    }
    const handleMovieChange = (e, id) =>{
        setModel({...model, movies: model.movies.map(m => m.id == id ? {...m, [e.target.name]:e.target.value} : m)});
    }
    
    async function handleSave () {
        console.log(JSON.stringify(model));
        updateSuperhero({ variables: {superheroUpdate: model}});
        onClose();
    }
    React.useEffect(()=>{
        if(data) {
            onSaved(data.updateSuperhero);
        }
    },[data]);
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add</DialogTitle>
            <DialogContent>
                {loading && <p>Submitting...</p>}
                {error && <p>Submission error! ${error.message}</p>}
                
                <p>Hero</p>
                <TextField
                    name="name"
                    label="Name"
                    value={model.name}
                    onChange={handleChange}
                />
                <TextField
                    name="description"
                    label="Description"
                    value={model.description}
                    onChange={handleChange}
                />
                <TextField
                    name="height"
                    label="Height"
                    value={model.height}
                    onChange={handleChange}
                    type="number"
                />
                <p>Power</p>
                {model.superpowers.map((i)=>(
                    <>
                    <TextField
                        name="name"
                        label="Name"
                        value={i.name}
                        onChange={(e)=>handlePowerChange(e, i.id)}
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={i.description}
                        onChange={(e)=>handlePowerChange(e, i.id)}
                    />
                    </>
                ))}
                
                <p>Movie</p>
                {model.movies.map((i)=>(
                    <>
                    <TextField
                        name="title"
                        label="Title"
                        value={i.title}
                        onChange={(e)=>handleMovieChange(e, i.id)}
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={i.description}
                        onChange={(e)=>handleMovieChange(e, i.id)}
                    />
                    </>
                ))}
                
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}