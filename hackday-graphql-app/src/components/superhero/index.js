import React from "react";
import { GET_SUPERHEROES, DELETE_SUPERHERO } from "../../clients/superheroclient";
import {TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper, Button, TextField, IconButton, Typography, Collapse, Box, Grid} from '@mui/material'
import {tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import CreateHeroForm from "./create";
import UpdateHeroForm from "./update";
import {useQuery, useMutation} from '@apollo/client';
import {KeyboardArrowUp, KeyboardArrowDown} from '@mui/icons-material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const Row = ({row, handleOpenUpdate, handleDelete}) => {
    const [expand, setExpand] = React.useState(false);
    return(
        <>
            <StyledTableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <StyledTableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setExpand(!expand)}
                >
                    {expand ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                    {row.name}
                </StyledTableCell>
                <StyledTableCell>{row.description.length > 100 ? row.description.substr(0,100)+"..." : row.description}</StyledTableCell>
                <StyledTableCell>
                    <Button variant="outlined" onClick={()=>handleOpenUpdate(row)}>Edit</Button>
                    <Button variant="outlined" color="error" onClick={()=>handleDelete(row.id)}>Delete</Button>
                </StyledTableCell>
            </StyledTableRow>
            <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={expand} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                    Skill
                    </Typography>
                    <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.superpowers.map((i) => (
                        <TableRow key={i.id}>
                            <TableCell component="th" scope="row">
                            {i.name}
                            </TableCell>
                            <TableCell>{i.description}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>

                    <Typography variant="h6" gutterBottom component="div">
                    Movie
                    </Typography>
                    <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.movies.map((i) => (
                        <TableRow key={i.id}>
                            <TableCell component="th" scope="row">
                            {i.title}
                            </TableCell>
                            <TableCell>{i.description}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </Box>
                </Collapse>
            </TableCell>
            </TableRow>
        </>
    )
}

export default function SuperheroApp(){
    const [state, setState] = React.useState({
        superheroes: [],
        open: false,
        openUpdate: false,
        selected: undefined,
        expand: false,
        where: ""
    });
    const {loading, error, data, refetch} = useQuery(GET_SUPERHEROES);
    const [deleteSuperhero] = useMutation(DELETE_SUPERHERO);;
    
    const handleClose = () =>{
        setState({...state, open:false});
    }
    const handleOpen = () =>{
        setState({...state, open:true});
    }

    const handleCloseUpdate = () =>{
        setState({...state, openUpdate:false});
    }
    const handleOpenUpdate = (item) =>{
        setState({...state, openUpdate:true, selected: item});
    }
    const handleSaved = (model) =>{
        setState({...state, superheroes: state.superheroes.concat(model)})
    }
    const handleUpdateSaved = (model) =>{
        setState({...state, superheroes: state.superheroes.map(sh => sh.id == model.id ? model : sh)});
    }
    
    React.useEffect(()=>{
        data && setState({...state, superheroes: data.superheroes});
    },[data]);

    const handleDelete = (superheroId) =>{
        if(window.confirm("Are you sure?")){
            deleteSuperhero({ variables: {superheroId}});
            setState({...state, superheroes: state.superheroes.filter(sh => sh.id != superheroId)})
        }
    }
    const handleSearch = () =>{
        if(state.where !== "")
            refetch({where: {name: {eq: state.where}}});
        else
            refetch();
    }
    const handleClear = () =>{
        setState({...state, where: ""})
        refetch({where: {name: {contains: ""}}});
    }
    return (
        <>
        <Grid container>
            <Grid item xs={6}><Button variant="contained" onClick={handleOpen}>Add</Button></Grid>
            <Grid item xs={6}>
                <TextField name="where" label="Keyword" size="small" onChange={(e) => setState({...state, where: e.target.value})} value={state.where}/>
                <Button variant="outlined" onClick={handleSearch}>Search</Button>
                <Button variant="outlined" onClick={handleClear} color="error">Clear</Button>
            </Grid>
        </Grid>
        
        <p> </p>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <StyledTableCell />
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {state.superheroes && state.superheroes.map((row) => (
                <Row row={row} handleOpenUpdate={handleOpenUpdate} handleDelete={handleDelete}/>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        <CreateHeroForm open={state.open} onClose={handleClose} onSaved={handleSaved} />
        {state.selected && <UpdateHeroForm open={state.openUpdate} onClose={handleCloseUpdate} onSaved={handleUpdateSaved} heromodel={state.selected} />}
        </>
    );
}