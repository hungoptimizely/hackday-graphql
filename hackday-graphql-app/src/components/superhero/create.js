import React from "react";
import {Dialog, DialogTitle, DialogContent, Button, DialogActions, TextField} from "@mui/material"
import { ADD_SUPERHERO } from "../../clients/superheroclient";
import {useMutation} from '@apollo/client'

export default function CreateHeroForm({open, onClose, onSaved}){
    const [addSuperhero, {data, loading, error}] = useMutation(ADD_SUPERHERO);
    const [model, setModel] = React.useState({
        name: "",
        description: "",
        height: 0,
        superpowers:[],
        movies:[]
    });
    const [power, setPower] = React.useState({
        name: "",
        description: ""
    });
    const [movie, setMovie] = React.useState({
        title: "",
        description: "",
        instructor: "",
        releaseDate: (new Date()).toDateString()
    });
    const handleChange = (e) =>{
        if(e.target.name === "height")
            setModel({...model, [e.target.name]: parseFloat(e.target.value)});
        else
            setModel({...model, [e.target.name]:e.target.value});
    }
    const handlePowerChange = (e) =>{
        setPower({...power, [e.target.name]:e.target.value});
    }
    const handleMovieChange = (e) =>{
        setMovie({...movie, [e.target.name]:e.target.value});
    }
    const addPower = () =>{
        setModel({...model, superpowers: model.superpowers.concat(power)});
        setPower({name:"", description:""});
    }
    const addMovie = () =>{
        setModel({...model, movies: model.movies.concat(movie)});
        setMovie({title:"", description:""});
    }
    async function handleSave () {
        console.log(JSON.stringify(model));
        addSuperhero({ variables: {superheroAdd: model}});
        onClose();
    }
    React.useEffect(()=>{
        if(data) {
            onSaved(data.addSuperhero);
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
                <ul>
                    {model.superpowers.map((i)=>(
                        <li>{i.name}</li>
                    ))}
                </ul>
                <TextField
                    name="name"
                    label="Name"
                    value={power.name}
                    onChange={handlePowerChange}
                />
                <TextField
                    name="description"
                    label="Description"
                    value={power.description}
                    onChange={handlePowerChange}
                />
                <Button onClick={addPower}>Add</Button>
                <p>Movie</p>
                <ul>
                    {model.movies.map((i)=>(
                        <li>{i.title}</li>
                    ))}
                </ul>
                <TextField
                    name="title"
                    label="Title"
                    value={movie.title}
                    onChange={handleMovieChange}
                />
                <TextField
                    name="description"
                    label="Description"
                    value={movie.description}
                    onChange={handleMovieChange}
                />
                <Button onClick={addMovie}>Add</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}